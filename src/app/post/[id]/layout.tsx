import { Suspense } from 'react';

import Comments from '@/features/post/[id]/components/comments';
import CommentSkeletons from '@/features/post/[id]/components/comments/comment-skeletons';

type Props = {
  children: React.ReactNode;
  params: {
    id: string;
  };
};

export default function PostLayout({ children, params: { id } }: Props) {
  return (
    <article className="flex w-full justify-center pb-6 pt-12 max-md:pt-6">
      <div className="flex w-full max-w-4xl flex-col">
        {children}

        <section
          className="mt-4 flex flex-col border-t pt-8"
          aria-label="comment section"
        >
          <Suspense fallback={<CommentSkeletons />}>
            <Comments postId={Number(id)} />
          </Suspense>
        </section>
      </div>
    </article>
  );
}
