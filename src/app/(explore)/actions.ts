'use server';
import type { Prisma } from '@prisma/client';
import type { DefaultArgs } from '@prisma/client/runtime/library';
import { unstable_cache } from 'next/cache';

import type { FetchPostsParams } from '@/features/(explore)/types';
import { prisma } from '@/lib/database';
import { buildKey } from '@/lib/utils';
import { CACHE_TAGS } from '@/shared/constants';

export async function fetchCategories() {
  return unstable_cache(
    () =>
      prisma.category.findMany({
        orderBy: { orderNumber: 'asc' }
      }),
    ['FETCH_CATEGORIES'],
    {
      tags: buildKey(CACHE_TAGS.categories)
    }
  )();
}

export async function fetchPosts(params: FetchPostsParams) {
  const { categoryId, page = 1, search, limit = 18 } = params;

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
      ...(params.order === 'view'
        ? {
            PostView: {
              _count: 'desc'
            }
          }
        : { createdAt: 'desc' })
    },
    skip: (page - 1) * limit,
    take: limit
  };

  if (search === undefined) {
    delete query.where?.OR;
  }

  if (categoryId === undefined) {
    delete query.where?.categoryId;
  }

  const [posts, count] = await unstable_cache(
    () =>
      prisma.$transaction([
        prisma.post.findMany(query),
        prisma.post.count({ where: query.where })
      ]),

    buildKey(
      'FETCH_POSTS',
      JSON.stringify({ categoryId, page, limit, search })
    ),
    { tags: buildKey(CACHE_TAGS.posts) }
  )();

  return {
    posts,
    count
  };
}
