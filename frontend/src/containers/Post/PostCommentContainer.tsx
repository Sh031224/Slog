import React, { KeyboardEvent, useCallback, useState } from "react";
import PostCommentItem from "../../components/Post/PostComment/PostCommentItem";

interface PostCommentContainerProps {
  comment: CommentType;
  admin: boolean;
  getReplies: (comment_idx: number) => Promise<RepliesResponse>;
  userId: number;
  modifyComment: (comment_idx: number, content: string) => Promise<void>;
  deleteComment: (comment_idx: number) => Promise<void>;
  login: boolean;
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
  login
}: PostCommentContainerProps) => {
  const [modify, setModify] = useState<boolean>(false);
  const [modifyInput, setModifyInput] = useState<string>(comment.content);

  const cancelModify = useCallback(() => {
    setModify(false);
    setModifyInput(comment.content);
  }, [comment]);

  return (
    <>
      <PostCommentItem
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
