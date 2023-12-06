import { notFound } from 'next/navigation';

import { fetchComments } from '@/app/post/[id]/actions';
import { auth } from '@/lib/auth';

import CommentList from './comment-list';

type Props = {
  postId: number;
};

export default async function Comments({ postId }: Props) {
  if (Number.isNaN(postId)) {
    notFound();
  }

  const user = (await auth())?.user;
  const [comments, totalCount] = await fetchComments(postId, user);

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xl font-medium leading-7">{totalCount} Comments</h3>

      <CommentList user={user} postId={postId} comments={comments} />
    </div>
  );
}
