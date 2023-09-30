import { createComment, fetchComments } from '@/app/post/[id]/actions';
import { auth } from '@/lib/auth';

import CommentForm from './comment-form';

type Props = {
  postId: number;
};

export default async function CommentList({ postId }: Props) {
  const user = (await auth())?.user;
  const [comments, commentCount, replyCount] = await fetchComments(postId);

  const totalCount = commentCount + replyCount;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-base leading-7">{totalCount} Comments</p>

      <CommentForm postId={postId} user={user} createComment={createComment} />

      {comments.map(comment => (
        <>{comment.content}</>
      ))}
    </div>
  );
}
