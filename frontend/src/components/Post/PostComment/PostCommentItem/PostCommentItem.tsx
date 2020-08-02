import React from "react";
import "./PostCommentItem.scss";
import profile from "../../../../assets/images/profile.png";
import PostReplyContainer from "../../../../containers/Post/PostReplyContainer";

interface PostCommentItemProps {
  comment: CommentType;
  userName: string;
  admin: boolean;
  getReplies: (comment_idx: number) => Promise<RepliesResponse>;
}

interface RepliesResponse {
  status: number;
  message: string;
  data: {
    replies: ReplyType;
  };
}

interface ReplyType {
  idx: number;
  content: string;
  is_private: boolean;
  fk_user_idx: string | undefined;
  fk_user_name: string | undefined;
  fk_comment_idx: number;
  created_at: Date;
  updated_at: Date;
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
  admin,
  getReplies
}: PostCommentItemProps) => {
  return (
    <div className="post-comment-item">
      <img className="post-comment-item-img" src={profile} alt="profile" />
      {!comment.fk_user_name ? (
        <div className="post-comment-item-box-private">
          <div className="post-comment-item-box-private-title">
            {comment.content}
          </div>
        </div>
      ) : (
        <div className="post-comment-item-box">
          <div className="post-comment-item-box-title">
            {comment.fk_user_name}
          </div>
          <span className="post-comment-item-box-content">
            {comment.content}
          </span>
        </div>
      )}
      {comment.reply_count !== 0 && (
        <PostReplyContainer
          idx={comment.idx}
          admin={admin}
          userName={userName}
          getReplies={getReplies}
        />
      )}
    </div>
  );
};

export default PostCommentItem;
