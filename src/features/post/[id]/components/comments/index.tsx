import { Suspense } from 'react';

import { auth } from '@/lib/auth';

import CommentForm from './comment-form';
import CommentList from './comment-list';
import CommentSkeletons from './comment-skeletons';

type Props = {
  postId: number;
};

export default async function Comments(props: Props) {
  const user = (await auth())?.user;

  return (
    <section
      className="mt-4 flex flex-col border-t pt-8"
      aria-label="comment section"
    >
      <CommentForm user={user} />

      <Suspense fallback={<CommentSkeletons />}>
        <CommentList {...props} />
      </Suspense>
    </section>
  );
}
