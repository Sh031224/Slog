import React from "react";
import PostReplyHandleContainer from "../../../containers/Post/PostReplyHandleContainer";
import "./PostReply.scss";

interface PostReplyProps {
  replies: ReplyType[];
  admin: boolean;
  userId: number;
  login: boolean;
  modifyReply: (replyIdx: number, content: string) => Promise<void>;
  deleteReply: (replyIdx: number) => void;
  adminId: number;
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
  login,
  modifyReply,
  deleteReply,
  adminId
}: PostReplyProps) => {
  return (
    <>
      <div className="post-reply">
        {replies.map((reply: ReplyType, index: number) => {
          return (
            <PostReplyHandleContainer
              adminId={adminId}
              key={index}
              modifyReply={modifyReply}
              deleteReply={deleteReply}
              reply={reply}
              admin={admin}
              userId={userId}
              login={login}
            />
          );
        })}
      </div>
    </>
  );
};

export default PostReply;
