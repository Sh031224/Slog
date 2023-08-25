import type { Post } from '@prisma/client';
import { create } from 'zustand';

import type { PostParams, PostResponse } from '../types';

type PostStore = {
  list: Post[];
  page: number;

  params: PostParams;
  init: (params: PostParams) => void;
  next: (response: PostResponse) => void;
};

export const usePostStore = create<PostStore>(set => ({
  list: [],
  page: 1,
  params: {
    isTemp: false
  },
  init: params =>
    set(state => {
      if (JSON.stringify(params) !== JSON.stringify(state.params)) {
        return { page: 1, list: [], params };
      }

      return {};
    }),
  next: response =>
    set(state => ({
      page: state.page + 1,
      list: [...state.list, ...response.posts]
    }))
}));
