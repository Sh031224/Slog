import React from "react";
import "./PostComment.scss";

interface PostCommentProps {
  comments: CommentType[];
  count: number;
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

const PostComment = ({ comments, count }: PostCommentProps) => {
  return (
    <div className="post-comment">
      <div className="post-comment-count">{comments.length}개의 댓글</div>
    </div>
  );
};

export default PostComment;
