import type { Post } from '@prisma/client';

export type PostParams = {
  categoryId?: number;
  isTemp: boolean;
};

export type PostResponse = {
  posts: Post[];
  count: number;
};
