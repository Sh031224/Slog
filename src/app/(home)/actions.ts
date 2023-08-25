import type { Prisma } from '@prisma/client';
import type { DefaultArgs } from '@prisma/client/runtime/library';
import { unstable_cache } from 'next/cache';

import { prisma } from '@/lib/database';
import { buildTags } from '@/lib/utils';
import { POSTS_TAG } from '@/shared/tags';

const LIMIT = 18 as const;

export type FetchPostsParams = {
  page?: number;
  categoryId?: number;
  isTemp?: boolean;
};

export async function fetchPosts({
  categoryId,
  page = 1,
  isTemp = false
}: FetchPostsParams) {
  'use server';
  const query: Prisma.PostFindManyArgs<DefaultArgs> = {
    where: {
      categoryId,
      isTemp
    },
    orderBy: {
      createdAt: 'desc'
    },
    skip: (page - 1) * LIMIT,
    take: LIMIT
  };

  if (categoryId === undefined) {
    delete query.where?.categoryId;
  }

  const [posts, count] = await unstable_cache(
    () =>
      prisma.$transaction([
        prisma.post.findMany(query),
        prisma.post.count({ where: query.where })
      ]),
    buildTags(POSTS_TAG, JSON.stringify({ categoryId, page, isTemp, LIMIT })),
    { tags: buildTags(POSTS_TAG) }
  )();

  return {
    posts,
    count
  };
}
