import type { Comment } from '@prisma/client';

import { auth } from '@/lib/auth';
import { Skeleton } from '@/shared/components/ui/skeleton';

import CommentForm from './comment-form';

type Props = {
  postId: number;
};

export default async function Comments({ postId }: Props) {
  const user = (await auth())?.user;

  return (
    <section
      className="mt-4 flex flex-col border-t pt-8"
      aria-label="comment section"
    >
      <CommentForm user={user} />

      <Skeleton />
    </section>
  );
}
