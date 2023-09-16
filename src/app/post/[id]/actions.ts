import dayjs from 'dayjs';
import { revalidateTag, unstable_cache } from 'next/cache';

import { prisma } from '@/lib/database';
import encrypt from '@/lib/encrypt';
import { buildKey } from '@/lib/utils';
import { TAGS } from '@/shared/constants';

export async function incrementPostView(postId: number, ip: string) {
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
