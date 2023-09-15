import type { Post } from '@prisma/client';

import Markdown from '@/shared/components/markdown';

import PostHeader from './post-header';

type Props = {
  post: Post;
};

export default function PostContent({ post }: Props) {
  return (
    <>
      <PostHeader post={post} />

      <Markdown content={post.content || ''} />
    </>
  );
}
