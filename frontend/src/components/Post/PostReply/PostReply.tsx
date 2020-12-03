import React from "react";
import "./PostReply.scss";
import dynamic from "next/dynamic";
import ReplyType from "types/ReplyType";

const PostReplyHandleContainer = dynamic(
  () => import("containers/Post/PostReplyHandleContainer")
);

interface PostReplyProps {
  replies: ReplyType[];
  admin: boolean;
  userId: number;
  login: boolean;
  modifyReply: (replyIdx: number, content: string) => Promise<void>;
  deleteReply: (replyIdx: number) => void;
}

const PostReply = ({
  replies,
  admin,
  userId,
  login,
  modifyReply,
  deleteReply
}: PostReplyProps) => {
  return (
    <>
      <div className="post-reply">
        {replies.map((reply: ReplyType, index: number) => {
          return (
            <PostReplyHandleContainer
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
