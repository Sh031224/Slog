import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import PostReply from "../../components/Post/PostReply";

interface PostReplyContainerProps {
  comment_idx: number;
  admin: boolean;
  userId: number;
  login: boolean;
  getReplies: (comment_idx: number) => Promise<RepliesResponse>;
  refresh: number;
  setRefresh: Dispatch<SetStateAction<number>>;
}

interface RepliesResponse {
  status: number;
  message: string;
  data: {
    replies: ReplyType[];
  };
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
  comment_idx,
  login,
  refresh,
  setRefresh
}: PostReplyContainerProps) => {
  const [replies, setReplies] = useState<ReplyType[]>([]);

  useEffect(() => {
    getReplies(comment_idx).then((res: RepliesResponse) => {
      setReplies(res.data.replies);
    });
  }, [refresh]);

  return (
    <>
      <PostReply
        replies={replies}
        admin={admin}
        userId={userId}
        comment_idx={comment_idx}
        login={login}
      />
    </>
  );
};

export default PostReplyContainer;
