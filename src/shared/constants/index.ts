import type { FetchPostsParams } from '@/features/(explore)/types';

export const CACHE_TAGS = {
  categories: 'CATEGORIES',
  allPosts: 'ALL_POSTS'
} as const;

export const DYNAMIC_CACHE_TAGS = {
  posts: (params: FetchPostsParams) => 'POSTS' + JSON.stringify(params),
  post: (id: number) => 'POST' + id,
  postView: (postId: number) => 'POST_VIEW' + postId
} as const;

export const CACHE_KEYS = {
  categories: 'FETCH_CATEGORIES'
} as const;

export const DYNAMIC_CACHE_KEYS = {
  posts: (params: FetchPostsParams) => 'POSTS' + JSON.stringify(params),
  post: (id: number) => 'POST' + id,
  postView: (postId: number) => 'POST_VIEW' + postId
} as const;

type CacheFn = string | ((params: any) => string);

type CacheGroup = {
  [key: string]: CacheGroup | CacheFn;
};

const cacheGroup: CacheGroup = {
  POST: {
    POST_DETAIL: {
      DETAIL: (id: number) => id.toString()
    }
  },
  CATEGORIES: 'CATEGORIES'
};
function parseCacheGroup(obj: CacheGroup, parentKey: Array<any> = []) {
  const keys = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const currentKey = parentKey ? [...parentKey, key] : [key];
      const value = obj[key];

      if (typeof value === 'object') {
        keys.push(...parseCacheGroup(value, currentKey));
      } else if (typeof value === 'function') {
        keys.push();
      } else {
        keys.push([...currentKey, value]);
      }
    }
  }

  return keys;
}

export function revalidateCacheGroup(group: CacheGroup) {}
