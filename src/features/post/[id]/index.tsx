import type { Post } from '@prisma/client';

import PostContent from './components/content';

type Props = {
  post: Post;
};

export default function PostDetail({ post }: Props) {
  return (
    <div className="flex w-full flex-col">
      <PostContent post={post} />
    </div>
  );
}
