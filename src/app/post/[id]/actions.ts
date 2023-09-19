import dayjs from 'dayjs';
import { revalidateTag, unstable_cache } from 'next/cache';

import { prisma } from '@/lib/database';
import encrypt from '@/lib/encrypt';
import { buildKey } from '@/lib/utils';
import { TAGS } from '@/shared/constants';

export async function fetchPostDetail(id: number | string) {
  return unstable_cache(
    () =>
      prisma.post.findUnique({
        where: {
          id: Number(id)
        }
      }),
    buildKey(TAGS.post, id.toString()),
    {
      tags: buildKey(TAGS.post + id)
    }
  )();
}

export async function createPostView(postId: number, ip: string) {
  'use server';
  const tagArguments = TAGS.postView + postId.toString() + ip;

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
    buildKey(tagArguments),
    {
      tags: buildKey(tagArguments),
      revalidate: 10800
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
  return unstable_cache(
    () =>
      prisma.comment.findUnique({
        where: {
          id: postId
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
      }),
    buildKey(TAGS.post, postId),
    {
      tags: buildKey(TAGS.post + id)
    }
  )();
}
