import type { Post } from '@prisma/client';
import { create } from 'zustand';

import type { FetchPostsParams, FetchPostsResponse } from '../types';

type PostStore = {
  list: Post[];
  page: number;
  params: FetchPostsParams;
  init: (params: FetchPostsParams) => void;
  next: (response: FetchPostsResponse) => void;
};

export const usePostStore = create<PostStore>(set => ({
  list: [],
  page: 1,
  params: {
    categoryId: undefined,
    search: undefined
  },
  init: params => {
    let isInitialized = false;

    set(state => {
      if (JSON.stringify(params) !== JSON.stringify(state.params)) {
        isInitialized = true;
        return { page: 1, list: [], params };
      }

      return {};
    });

    return isInitialized;
  },
  next: response =>
    set(state => ({
        page: state.page + 1,
        list: [...state.list, ...response.posts]
    }))
}));
