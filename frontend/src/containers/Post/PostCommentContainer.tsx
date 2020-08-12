import React, { KeyboardEvent, useCallback, useEffect, useState } from "react";
import PostCommentItem from "../../components/Post/PostComment/PostCommentItem";

interface PostCommentContainerProps {
  comment: CommentType;
  admin: boolean;
  getReplies: (comment_idx: number) => Promise<RepliesResponse>;
  userId: number;
  modifyComment: (comment_idx: number, content: string) => Promise<void>;
  deleteComment: (comment_idx: number) => Promise<void>;
  login: boolean;
  createReply: (
    comment_idx: number,
    content: string,
    is_private?: boolean | undefined
  ) => Promise<void>;
  modifyReply: (reply_idx: number, content: string) => Promise<void>;
  deleteReply: (reply_idx: number) => Promise<void>;
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

const PostCommentContainer = ({
  comment,
  admin,
  getReplies,
  userId,
  modifyComment,
  deleteComment,
  login,
  createReply,
  modifyReply,
  deleteReply
}: PostCommentContainerProps) => {
  const [modify, setModify] = useState<boolean>(false);
  const [modifyInput, setModifyInput] = useState<string>(comment.content);
  const [reply, setReply] = useState<boolean>(false);
  const [replyInput, setReplyInput] = useState<string>("");
  const [isPrivate, setIsPrivate] = useState<boolean>(comment.is_private);

  const cancelModify = useCallback(() => {
    setModify(false);
    setModifyInput(comment.content);
  }, [comment]);

  const cancelReply = useCallback(() => {
    setReply(false);
    setReplyInput("");
  }, []);

  const setIsPrivateCallback = useCallback(
    (status: boolean) => {
      if (comment.is_private) {
        setIsPrivate(true);
      } else {
        setIsPrivate(status);
      }
    },
    [comment]
  );

  return (
    <>
      <PostCommentItem
        reply={reply}
        cancelReply={cancelReply}
        setReply={setReply}
        replyInput={replyInput}
        setReplyInput={setReplyInput}
        isPrivate={isPrivate}
        setIsPrivateCallback={setIsPrivateCallback}
        createReply={createReply}
        modifyReply={modifyReply}
        deleteReply={deleteReply}
        login={login}
        modify={modify}
        setModify={setModify}
        modifyInput={modifyInput}
        setModifyInput={setModifyInput}
        cancelModify={cancelModify}
        deleteComment={deleteComment}
        modifyComment={modifyComment}
        userId={userId}
        getReplies={getReplies}
        comment={comment}
        admin={admin}
      />
    </>
  );
};

export default PostCommentContainer;
