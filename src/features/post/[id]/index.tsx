import type { Post } from '@prisma/client';
import { Suspense } from 'react';

import Markdown from '@/shared/components/markdown';

import Comments from './components/comments';
import CommentSkeletons from './components/comments/comment-skeletons';
import PostHeader from './components/post-header';

type Props = {
  post: Post;
};

export default function PostDetail({ post }: Props) {
  return (
    <div className="flex w-full flex-col">
      <PostHeader post={post} />

      <Markdown content={post.content || ''} />

      <section
        className="mt-4 flex flex-col border-t pt-8"
        aria-label="comment section"
      >
        <Suspense fallback={<CommentSkeletons />}>
          <Comments postId={post.id} />
        </Suspense>
      </section>
    </div>
  );
}
