import {
  createComment,
  createReply,
  deleteComment,
  deleteReply,
  fetchComments,
  updateComment,
  updateReply
} from '@/app/post/[id]/actions';
import { auth } from '@/lib/auth';

import CommentList from './comment-list';

type Props = {
  postId: number;
};

export default async function Comments({ postId }: Props) {
  const user = (await auth())?.user;
  const [comments, commentCount, replyCount] = await fetchComments(postId);

  const totalCount = commentCount + replyCount;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-base leading-7">{totalCount} Comments</p>

      <CommentList user={user} postId={postId} comments={comments} />
    </div>
  );
}
