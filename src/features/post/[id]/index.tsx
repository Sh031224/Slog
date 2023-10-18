import type { Post } from '@prisma/client';
import { headers } from 'next/headers';

import { createPostView } from '@/app/post/[id]/actions';
import Markdown from '@/shared/components/markdown';

import PostHeader from './components/post-header';
import PostView from './components/post-view';

type Props = {
  post: Post;
};

export default function PostDetail({ post }: Props) {
  return (
    <>
      <PostView
        postId={post.id}
        ip={headers().get('x-forwarded-for') || ''}
        createPostView={createPostView}
      />

      <PostHeader post={post} />

      <Markdown content={post.content || ''} />
    </>
  );
}
