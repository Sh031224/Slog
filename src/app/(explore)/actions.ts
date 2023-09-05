import type { Prisma } from '@prisma/client';
import type { DefaultArgs } from '@prisma/client/runtime/library';
import { unstable_cache } from 'next/cache';

import { prisma } from '@/lib/database';
import { buildKey } from '@/lib/utils';
import { TAGS } from '@/shared/constants';

const LIMIT = 18 as const;

export type FetchPostsParams = {
  page?: number;
  categoryId?: number;
  search?: string;
};

export async function fetchPosts({
  categoryId,
  page = 1,
  search
}: FetchPostsParams) {
  'use server';
  const searchValue = search
    ?.toString()
    .split(' ')
    .map(v => `\'+*${v.replace(/[><()~*:"&|@+-]/g, '')}*\'`)
    .join(' ');

  const query: Prisma.PostFindManyArgs<DefaultArgs> = {
    where: {
      categoryId,
      isTemp: false,
      OR: [
        {
          title: {
            search: searchValue
          }
        },
        { description: { search: searchValue } }
      ]
    },
    orderBy: {
      createdAt: 'desc'
    },
    skip: (page - 1) * LIMIT,
    take: LIMIT
  };

  if (search === undefined) {
    delete query.where?.OR;
  }

  if (categoryId === undefined) {
    delete query.where?.categoryId;
  }

  const tags = buildKey(TAGS.categories);

  const [posts, count] = await unstable_cache(
    () =>
      prisma.$transaction([
        prisma.post.findMany(query),
        prisma.post.count({ where: query.where })
      ]),
    buildKey(...tags, JSON.stringify({ categoryId, page, LIMIT, search })),
    { tags: tags }
  )();

  return {
    posts,
    count
  };
}
