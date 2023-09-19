import type { Post } from '@prisma/client';

import Markdown from '@/shared/components/markdown';

import Comments from './components/comments';
import PostHeader from './components/post-header';

type Props = {
  post: Post;
};

export default function PostDetail({ post }: Props) {
  return (
    <div className="flex w-full flex-col">
      <PostHeader post={post} />

      <Markdown content={post.content || ''} />

      <Comments postId={post.id} />
    </div>
  );
}
