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
      revalidate: 3600
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
  { postId, ...params }: CreateCommentParams,
  userId?: string
) {
  if (!userId) {
    return;
  }

  await prisma.comment.create({
    data: {
      ...params,
      postId,
      userId
    }
  });

  revalidateTag(DYNAMIC_CACHE_TAGS.comments(postId));
}

export async function createReply(
  { commentId, postId, ...params }: CreateCommentParams,
  userId?: string
) {
  if (!userId || !commentId) {
    return;
  }

  await prisma.reply.create({
    data: {
      ...params,
      commentId,
      postId,
      userId
    }
  });

  revalidateTag(DYNAMIC_CACHE_TAGS.comments(postId));
}

export async function updateComment(
  id: number,
  { postId, ...params }: CreateCommentParams
) {
  await prisma.comment.update({
    where: {
      id
    },
    data: params
  });

  revalidateTag(DYNAMIC_CACHE_TAGS.comments(postId));
}

export async function updateReply(
  id: number,
  { postId, ...params }: CreateCommentParams
) {
  await prisma.reply.update({
    where: {
      id
    },
    data: params
  });

  revalidateTag(DYNAMIC_CACHE_TAGS.comments(postId));
}

export async function deleteComment(commentId: number, postId: number) {
  await prisma.comment.delete({
    where: {
      id: commentId
    }
  });

  revalidateTag(DYNAMIC_CACHE_TAGS.comments(postId));
}

export async function deleteReply(replyId: number, postId: number) {
  await prisma.reply.delete({
    where: {
      id: replyId
    }
  });

  revalidateTag(DYNAMIC_CACHE_TAGS.comments(postId));
}
