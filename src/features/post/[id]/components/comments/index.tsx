import { Suspense } from 'react';

import CommentList from './comment-list';
import CommentSkeletons from './comment-skeletons';

type Props = {
  postId: number;
};

export default async function Comments(props: Props) {
  return (
    <section
      className="mt-4 flex flex-col border-t pt-8"
      aria-label="comment section"
    >
      <Suspense fallback={<CommentSkeletons />}>
        <CommentList {...props} />
      </Suspense>
    </section>
  );
}
