import React from "react";
import "./PostCommentItem.scss";
import profile from "../../../../assets/images/profile.png";

interface PostCommentItemProps {
  comment: CommentType;
  userName: string;
  admin: boolean;
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

const PostCommentItem = ({
  comment,
  userName,
  admin
}: PostCommentItemProps) => {
  return (
    <div className="post-comment-item">
      <img className="post-comment-item-img" src={profile} alt="profile" />
      <div className="post-comment-item-box">
        <div className="post-comment-item-box-title">
          {comment.fk_user_name}
        </div>
        <span className="post-comment-item-box-content">{comment.content}</span>
      </div>
    </div>
  );
};

export default PostCommentItem;
