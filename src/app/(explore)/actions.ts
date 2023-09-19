import type { Prisma } from '@prisma/client';
import type { DefaultArgs } from '@prisma/client/runtime/library';
import { unstable_cache } from 'next/cache';

import type { FetchPostsParams } from '@/features/(explore)/types';
import { prisma } from '@/lib/database';
import { buildCacheTags, buildKey } from '@/lib/utils';
import { CACHE_KEYS, DYNAMIC_CACHE_TAGS, TAGS } from '@/shared/constants';

export async function fetchCategories() {
  'use server';
  const tags = buildKey(TAGS.categories);

  return unstable_cache(
    () =>
      prisma.category.findMany({
        orderBy: { orderNumber: 'asc' }
      }),
    tags,
    {
      tags
    }
  )();
}

const LIMIT = 18 as const;

export async function fetchPosts(params: FetchPostsParams) {
  'use server';
  const { categoryId, page = 1, search } = params;

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
    select: {
      id: true,
      title: true,
      description: true,
      thumbnail: true,
      type: true,
      updatedAt: true,
      createdAt: true,
      categoryId: true,
      url: true
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

  const tags = buildKey(TAGS.allPosts);

  const [posts, count] = await unstable_cache(
    () =>
      prisma.$transaction([
        prisma.post.findMany(query),
        prisma.post.count({ where: query.where })
      ]),
    buildKey(...tags, JSON.stringify({ categoryId, page, LIMIT, search })),
    { tags: buildCacheTags(DYNAMIC_CACHE_TAGS.posts(params), []) }
  )();

  return {
    posts,
    count
  };
}
