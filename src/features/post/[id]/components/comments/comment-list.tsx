'use client';
import type { User } from '@prisma/client';

import {
  createComment,
  createReply,
  deleteComment,
  deleteReply,
  updateComment,
  updateReply
} from '@/app/post/[id]/actions';

import CommentForm from './comment-form';
import CommentItem from './comment-item';
import type { CommentType } from '../../types';

type Props = {
  user?: Pick<User, 'name' | 'id' | 'image' | 'isAdmin'>;
  postId: number;
  comments: CommentType[];
};

export default function CommentList({ user, postId, comments }: Props) {
  return (
    <>
      <CommentForm
        user={user}
        onSubmit={params => createComment({ ...params, postId }, user?.id)}
      />

      <div className="flex w-full flex-col gap-4">
        {comments.map(comment => (
          <div className="flex flex-col border-t pb-2 pt-6" key={comment.id}>
            <CommentItem
              comment={comment}
              user={user}
              postId={postId}
              deleteAction={deleteComment}
              createAction={params =>
                createReply(
                  { ...params, postId, commentId: comment.id },
                  user?.id
                )
              }
              updateAction={params =>
                updateComment(comment.id, { ...params, postId })
              }
            />

            <div className="ml-14 flex flex-col gap-4">
              {comment.Reply.map(reply => (
                <div className="mt-4" key={reply.id}>
                  <CommentItem
                    comment={reply}
                    user={user}
                    postId={postId}
                    deleteAction={deleteReply}
                    updateAction={params =>
                      updateReply(reply.id, { ...params, postId })
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
