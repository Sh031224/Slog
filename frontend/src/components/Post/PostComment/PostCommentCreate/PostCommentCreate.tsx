import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  KeyboardEvent
} from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { IoIosUnlock, IoIosLock } from "react-icons/io";
import "./PostCommentCreate.scss";

interface PostCommentCreateProps {
  commentCreate: () => void;
  commentInput: string;
  setCommentInput: Dispatch<SetStateAction<string>>;
  login: boolean;
  setIsPrivate: Dispatch<SetStateAction<boolean>>;
  isPrivate: boolean;
  commentEnter: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const PostCommentCreate = ({
  commentCreate,
  commentInput,
  setCommentInput,
  login,
  isPrivate,
  setIsPrivate,
  commentEnter
}: PostCommentCreateProps) => {
  return (
    <>
      <div className="post-commnet-create">
        <div className="post-comment-create-text">
          {isPrivate ? (
            <IoIosLock
              onClick={() => setIsPrivate(false)}
              className="post-comment-create-text-lock"
            />
          ) : (
            <IoIosUnlock
              onClick={() => setIsPrivate(true)}
              className="post-comment-create-text-unlock"
            />
          )}
          <input
            className="post-comment-create-text-input"
            type="text"
            value={commentInput}
            placeholder="댓글을 입력해주세요."
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCommentInput(e.target.value)
            }
            onKeyPress={commentEnter}
          />
          <FaTelegramPlane
            onClick={commentCreate}
            className="post-comment-create-text-submit"
          />
        </div>
      </div>
    </>
  );
};

export default PostCommentCreate;
