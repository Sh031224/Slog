import { fetchComments } from '@/app/post/[id]/actions';

type Props = {
  postId: number;
};

export default async function CommentList({ postId }: Props) {
  const [comments, commentCount, replyCount] = await fetchComments(postId);

  const totalCount = commentCount + replyCount;

  return (
    <div className="flex flex-col gap-4">
      {totalCount}

      {comments.map(comment => (
        <>{comment.content}</>
      ))}
    </div>
  );
}
