import { Suspense } from 'react';

import Comments from '@/features/post/[id]/components/comments';
import CommentSkeletons from '@/features/post/[id]/components/comments/comment-skeletons';
import PopularContents from '@/features/post/[id]/components/popular-contents';
import PopularSkeletons from '@/features/post/[id]/components/popular-contents/popular-skeletons';

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
          className="mt-6 flex flex-col border-t pb-4 pt-8"
          aria-label="popular content"
        >
          <h3 className="text-xl font-medium leading-7">
            Explore Popular Contents
          </h3>

          <div className="mt-6 grid w-full grid-cols-2 gap-4 max-sm:grid-cols-1">
            <Suspense fallback={<PopularSkeletons />}>
              <PopularContents />
            </Suspense>
          </div>
        </section>

        <section
          className="mt-6 flex flex-col pb-6 pt-8"
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
