import React, { useEffect } from "react";

interface PostReplyContainerProps {
  idx: number;
  admin: boolean;
  userName: string;
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
  fk_user_idx: number | undefined;
  fk_user_name: string | undefined;
  fk_comment_idx: number;
  created_at: Date;
  updated_at: Date;
}

const PostReplyContainer = ({
  idx,
  getReplies,
  admin,
  userName
}: PostReplyContainerProps) => {
  useEffect(() => {
    console.log("1");
    getReplies(idx).then((res: RepliesResponse) => {
      console.log(res);
    });
  }, []);

  return (
    <>
      <div></div>
    </>
  );
};

export default PostReplyContainer;
