import React, { Dispatch } from "react";
import "./PostComment.scss";

interface PostCommentProps {
  comments: CommentType[];
  count: number;
  userName: string;
  login: boolean;
  admin: boolean;
  commentInput: string;
  setCommentInput: Dispatch<React.SetStateAction<string>>;
}

interface CommentType {
  idx: number;
  content: string;
  is_private: boolean;
  fk_user_idx: string | undefined;
  fk_user_name: string | undefined;
  fk_post_idx: number;
  created_at: Date;
  updated_at: Date;
  reply_count: number;
}

const PostComment = ({
  comments,
  count,
  userName,
  login,
  admin,
  commentInput,
  setCommentInput
}: PostCommentProps) => {
  return (
    <div className="post-comment">
      <div className="post-comment-count">
        댓글 <b>{count}</b>
      </div>
      <div className="post-comment-input"></div>
    </div>
  );
};

export default PostComment;
