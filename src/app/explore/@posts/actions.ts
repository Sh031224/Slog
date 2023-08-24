import type { Prisma } from '@prisma/client';
import type { DefaultArgs } from '@prisma/client/runtime/library';

import { prisma } from '@/lib/database';

const LIMIT = 20 as const;

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

  const [posts, count] = await prisma.$transaction([
    prisma.post.findMany(query),
    prisma.post.count({ where: query.where })
  ]);

  return {
    posts,
    count
  };
}
