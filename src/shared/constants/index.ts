export const CACHE_TAGS = {
  categories: 'CATEGORIES',
  posts: 'POSTS'
} as const;

export const DYNAMIC_CACHE_TAGS = {
  post: (id: number) => 'POST' + id,
  comments: (id: number) => 'POST' + id,
  postView: (postId: number, ip: string) => 'POST_VIEW' + postId + ip
} as const;
