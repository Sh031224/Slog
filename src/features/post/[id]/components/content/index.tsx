import type { Post } from '@prisma/client';

import Markdown from '@/shared/components/markdown';

import PostHeader from './post-header';

type Props = {
  data: Post;
};

export default function PostContent({ data }: Props) {
  return (
    <div className="flex flex-col">
      <PostHeader data={data} />

      <Markdown content={data.content || ''} />
    </div>
  );
}
