import dynamic from "next/dynamic";
import React, { useCallback, useEffect, useState } from "react";

const PostReply = dynamic(() => import("components/Post/PostReply"));

interface PostReplyContainerProps {
  comment: CommentType;
  commentIdx: number;
  admin: boolean;
  userId: number;
  login: boolean;
  getReplies: (commentIdx: number) => Promise<RepliesResponse>;
  modifyReply: (replyIdx: number, content: string) => Promise<void>;
  deleteReply: (reply_idx: number) => void;
  adminId: number;
}

interface RepliesResponse {
  status: number;
  message: string;
  data: {
    replies: ReplyType[];
  };
}

interface CommentType {
  idx: number;
  content: string;
  is_private: boolean;
  fk_user_idx: number | undefined;
  fk_user_name: string | undefined;
  fk_post_idx: number;
  created_at: Date;
  updated_at: Date;
  reply_count: number;
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

const PostReplyContainer = ({
  getReplies,
  admin,
  userId,
  commentIdx,
  login,
  modifyReply,
  deleteReply,
  comment,
  adminId
}: PostReplyContainerProps) => {
  const [replies, setReplies] = useState<ReplyType[]>([]);

  const getRepliesCallback = useCallback(() => {
    getReplies(commentIdx).then((res: RepliesResponse) => {
      setReplies(res.data.replies);
    });
  }, [comment, commentIdx]);

  useEffect(() => {
    getRepliesCallback();
  }, [getRepliesCallback]);

  return (
    <>
      <PostReply
        adminId={adminId}
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
