import { notFound } from 'next/navigation';

import { fetchComments } from '@/app/post/[id]/actions';

import CommentList from './comment-list';

type Props = {
  postId: number;
};

export default async function Comments({ postId }: Props) {
  if (Number.isNaN(postId)) {
    notFound();
  }

  const [comments, totalCount, user] = await fetchComments(postId);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-base leading-7">{totalCount} Comments</p>

      <CommentList user={user} postId={postId} comments={comments} />
    </div>
  );
}
