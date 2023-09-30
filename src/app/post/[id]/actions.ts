'use server';
import dayjs from 'dayjs';
import { revalidateTag, unstable_cache } from 'next/cache';

import type { CreateCommentParams } from '@/features/post/[id]/types';
import { prisma } from '@/lib/database';
import encrypt from '@/lib/encrypt';
import { buildKey } from '@/lib/utils';
import { DYNAMIC_CACHE_TAGS } from '@/shared/constants';

export async function fetchPostDetail(id: number) {
  return unstable_cache(
    () =>
      prisma.post.findUnique({
        where: {
          id
        }
      }),
    buildKey('FETCH_POST_DETAIL', id.toString()),
    {
      tags: buildKey(DYNAMIC_CACHE_TAGS.post(id))
    }
  )();
}

export async function createPostView(postId: number, ip: string) {
  const tagArguments = DYNAMIC_CACHE_TAGS.postView(postId, ip);

  const encryptedIp = await encrypt(ip);

  const latestView = await unstable_cache(
    () =>
      prisma.postView.findMany({
        where: { postId, ip: encryptedIp },
        orderBy: {
          id: 'desc'
        },
        take: 1
      }),
    buildKey('FETCH_POST_VIEW', JSON.stringify({ postId, ip })),
    {
      tags: buildKey(tagArguments),
      revalidate: 7200
    }
  )();

  if (
    !latestView.length ||
    (latestView[0] && dayjs().diff(dayjs(latestView[0].createdAt), 'hours') > 2)
  ) {
    await prisma.$transaction([
      prisma.postView.create({
        data: {
          ip: encryptedIp,
          postId
        }
      })
    ]);

    revalidateTag(tagArguments);
  }
}

export async function fetchComments(postId: number) {
  const findQuery = {
    where: {
      postId
    },
    select: {
      id: true,
      isPrivate: true,
      content: true,
      Reply: {
        select: {
          id: true,
          isPrivate: true,
          content: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              name: true,
              image: true,
              isAdmin: true
            }
          }
        }
      },
      user: {
        select: {
          id: true,
          name: true,
          image: true,
          isAdmin: true
        }
      },
      createdAt: true,
      updatedAt: true
    }
  } as const;

  return unstable_cache(
    () =>
      prisma.$transaction([
        prisma.comment.findMany(findQuery),
        prisma.comment.count({ where: { postId } }),
        prisma.reply.count({ where: { postId } })
      ]),
    buildKey('FETCH_COMMENTS', postId.toString()),
    {
      tags: buildKey(DYNAMIC_CACHE_TAGS.comments(postId))
    }
  )();
}

export async function createComment(
  params: CreateCommentParams,
  userId?: string
) {
  if (!userId) {
    return;
  }

  await prisma.comment.create({
    data: {
      ...params,
      userId
    }
  });

  revalidateTag(DYNAMIC_CACHE_TAGS.comments(params.postId));
}
