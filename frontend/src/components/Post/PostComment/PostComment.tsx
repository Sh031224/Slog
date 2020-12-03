import dynamic from "next/dynamic";
import React from "react";
import CommentType from "types/CommentType";
import { GetRepliesResponse } from "types/Response";
import "./PostComment.scss";

const PostCommentContainer = dynamic(
  () => import("containers/Post/PostCommentContainer")
);
const PostCommentCreateContainer = dynamic(
  () => import("containers/Post/PostCommentCreateContainer")
);

interface PostCommentProps {
  comments: CommentType[];
  login: boolean;
  admin: boolean;
  createComment: (
    postIdx: number,
    content: string,
    isPrivate?: boolean | undefined
  ) => Promise<void>;
  postIdx: number;
  getReplies: (commentIdx: number) => Promise<GetRepliesResponse>;
  userId: number;
  modifyComment: (commentIdx: number, content: string) => Promise<void>;
  deleteComment: (commentIdx: number) => void;
  createReply: (
    commentIdx: number,
    content: string,
    isPrivate?: boolean | undefined
  ) => Promise<void>;
  modifyReply: (replyIdx: number, content: string) => Promise<void>;
  deleteReply: (replyIdx: number) => void;
  commentCount: number;
}

const PostComment = ({
  comments,
  login,
  admin,
  postIdx,
  createComment,
  getReplies,
  userId,
  modifyComment,
  deleteComment,
  createReply,
  modifyReply,
  deleteReply,
  commentCount
}: PostCommentProps) => {
  return (
    <div className="post-comment">
      <div className="post-comment-count">
        댓글 <b>{commentCount}</b>
      </div>
      <PostCommentCreateContainer
        postIdx={postIdx}
        createComment={createComment}
        login={login}
      />
      {comments.map((comment: CommentType) => {
        return (
          <PostCommentContainer
            createReply={createReply}
            modifyReply={modifyReply}
            deleteReply={deleteReply}
            login={login}
            deleteComment={deleteComment}
            modifyComment={modifyComment}
            userId={userId}
            getReplies={getReplies}
            key={comment.idx}
            comment={comment}
            admin={admin}
          />
        );
      })}
    </div>
  );
};

export default PostComment;
