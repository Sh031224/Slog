import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { IoIosUnlock, IoIosLock } from "react-icons/io";
import "./PostCommentCreate.scss";

interface PostCommentCreateProps {
  createComment: (
    post_idx: number,
    content: string,
    is_private?: boolean | undefined
  ) => Promise<void>;
  commentInput: string;
  setCommentInput: Dispatch<SetStateAction<string>>;
  login: boolean;
  isPrivate: React.MutableRefObject<boolean>;
}

const PostCommentCreate = ({
  createComment,
  commentInput,
  setCommentInput,
  login,
  isPrivate
}: PostCommentCreateProps) => {
  return (
    <>
      <div className="post-commnet-create">
        <div className="post-comment-create-text">
          {isPrivate.current ? (
            <IoIosLock className="post-comment-create-text-lock" />
          ) : (
            <IoIosUnlock className="post-comment-create-text-unlock" />
          )}
          <input
            className="post-comment-create-text-input"
            type="text"
            value={commentInput}
            placeholder="댓글을 입력해주세요."
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCommentInput(e.target.value)
            }
          />
          <FaTelegramPlane className="post-comment-create-text-submit" />
        </div>
      </div>
    </>
  );
};

export default PostCommentCreate;
