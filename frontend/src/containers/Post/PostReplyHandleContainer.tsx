import PostReplyItem from "components/Post/PostReply/PostReplyItem";
import React, { useCallback, useState } from "react";
import ReplyType from "types/ReplyType";

interface PostReplyHandleContainerProps {
  userId: number;
  admin: boolean;
  reply: ReplyType;
  login: boolean;
  modifyReply: (replyIdx: number, content: string) => Promise<void>;
  deleteReply: (replyIdx: number) => void;
}

const PostReplyHandleContainer = ({
  userId,
  admin,
  reply,
  login,
  modifyReply,
  deleteReply
}: PostReplyHandleContainerProps) => {
  const [modify, setModify] = useState<boolean>(false);
  const [modifyInput, setModifyInput] = useState<string>(reply.content);

  const cancelModify = useCallback(() => {
    setModify(false);
    setModifyInput(reply.content);
  }, [reply]);

  return (
    <>
      <PostReplyItem
        setModifyInput={setModifyInput}
        modifyInput={modifyInput}
        modifyReply={modifyReply}
        deleteReply={deleteReply}
        modify={modify}
        setModify={setModify}
        cancelModify={cancelModify}
        reply={reply}
        admin={admin}
        userId={userId}
        login={login}
      />
    </>
  );
};

export default React.memo(PostReplyHandleContainer);
