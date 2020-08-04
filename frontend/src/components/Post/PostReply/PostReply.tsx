import React from "react";
import "./PostReply.scss";
import PostReplyItem from "./PostReplyItem";

interface PostReplyProps {
  replies: ReplyType[];
  admin: boolean;
  userId: number;
  comment_idx: number;
  login: boolean;
}

interface ReplyType {
  idx: number;
  content: string;
  is_private: boolean;
  fk_user_idx: number | undefined;
  fk_user_name: string | undefined;
  fk_comment_idx: number;
  created_at: Date;
  updated_at: Date;
}

const PostReply = ({
  replies,
  admin,
  userId,
  comment_idx,
  login
}: PostReplyProps) => {
  return (
    <>
      <div className="post-reply">
        {replies.map((reply: ReplyType, index: number) => {
          return (
            <PostReplyItem
              key={index}
              reply={reply}
              admin={admin}
              userId={userId}
              login={login}
              comment_idx={comment_idx}
            />
          );
        })}
      </div>
    </>
  );
};

export default PostReply;
