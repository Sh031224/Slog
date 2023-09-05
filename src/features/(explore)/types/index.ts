import type { Post } from '@prisma/client';

export type FetchPostsParams = {
  page?: number;
  categoryId?: number;
  search?: string;
};

export type FetchPostsResponse = {
  posts: Post[];
  count: number;
};
