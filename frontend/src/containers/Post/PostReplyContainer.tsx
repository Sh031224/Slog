import dynamic from "next/dynamic";
import React, { useCallback, useEffect, useState } from "react";
import CommentType from "types/CommentType";
import ReplyType from "types/ReplyType";
import { GetRepliesResponse } from "types/Response";

const PostReply = dynamic(() => import("components/Post/PostReply"));

interface PostReplyContainerProps {
  comment: CommentType;
  commentIdx: number;
  admin: boolean;
  userId: number;
  login: boolean;
  getReplies: (commentIdx: number) => Promise<GetRepliesResponse>;
  modifyReply: (replyIdx: number, content: string) => Promise<void>;
  deleteReply: (reply_idx: number) => void;
}

const PostReplyContainer = ({
  getReplies,
  admin,
  userId,
  commentIdx,
  login,
  modifyReply,
  deleteReply,
  comment
}: PostReplyContainerProps) => {
  const [replies, setReplies] = useState<ReplyType[]>([]);

  const getRepliesCallback = useCallback(() => {
    getReplies(commentIdx).then((res: GetRepliesResponse) => {
      setReplies(res.data.replies);
    });
  }, [comment, commentIdx]);

  useEffect(() => {
    getRepliesCallback();
  }, [getRepliesCallback]);

  return (
    <>
      <PostReply
        modifyReply={modifyReply}
        deleteReply={deleteReply}
        replies={replies}
        admin={admin}
        userId={userId}
        login={login}
      />
    </>
  );
};

export default PostReplyContainer;
