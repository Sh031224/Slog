import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import "./PostCommentItem.scss";
import profile from "../../../../assets/images/profile.png";
import TimeCounting from "time-counting";
import { GoPencil } from "react-icons/go";
import { FaTelegramPlane } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import {
  IoIosLock,
  IoIosUnlock,
  IoMdCheckmarkCircleOutline
} from "react-icons/io";
import { GetRepliesResponse } from "types/Response";
import CommentType from "types/CommentType";
import PostReplyContainer from "containers/Post/PostReplyContainer";

interface PostCommentItemProps {
  comment: CommentType;
  admin: boolean;
  getReplies: (commentIdx: number) => Promise<GetRepliesResponse>;
  userId: number;
  modifyComment: (commentIdx: number, content: string) => Promise<void>;
  deleteComment: (commentIdx: number) => void;
  modify: boolean;
  setModify: Dispatch<SetStateAction<boolean>>;
  modifyInput: string;
  setModifyInput: Dispatch<SetStateAction<string>>;
  cancelModify: () => void;
  login: boolean;
  reply: boolean;
  setReply: Dispatch<SetStateAction<boolean>>;
  replyInput: string;
  setReplyInput: Dispatch<SetStateAction<string>>;
  cancelReply: () => void;
  createReply: (
    commentIdx: number,
    content: string,
    isPrivate?: boolean | undefined
  ) => Promise<void>;
  modifyReply: (replyIdx: number, content: string) => Promise<void>;
  isPrivate: boolean;
  setIsPrivateCallback: (status: boolean) => void;
  deleteReply: (replyIdx: number) => void;
}

const PostCommentItem = ({
  comment,
  admin,
  getReplies,
  userId,
  modifyComment,
  deleteComment,
  cancelModify,
  modify,
  setModify,
  setModifyInput,
  modifyInput,
  login,
  reply,
  setReply,
  cancelReply,
  replyInput,
  setReplyInput,
  createReply,
  modifyReply,
  deleteReply,
  isPrivate,
  setIsPrivateCallback
}: PostCommentItemProps) => {
  return (
    <div className="post-comment-item">
      <img className="post-comment-item-img" src={profile} alt="profile" />
      {!comment.fk_user_name ? (
        <div className="post-comment-item-box-private">
          <div className="post-comment-item-box-private-title">
            {comment.content}
            <span className="post-comment-item-box-time">
              {TimeCounting(comment.created_at, { lang: "ko" })}
            </span>
            {comment.created_at !== comment.updated_at && (
              <span className="post-comment-item-box-update">{"(수정됨)"}</span>
            )}
          </div>
          {comment.reply_count !== 0 && (
            <PostReplyContainer
              login={login}
              userId={userId}
              commentIdx={comment.idx}
              admin={admin}
              getReplies={getReplies}
              comment={comment}
              modifyReply={modifyReply}
              deleteReply={deleteReply}
            />
          )}
        </div>
      ) : (
        <>
          {modify ? (
            <div className="post-comment-item-input">
              <div className="post-comment-item-input-box">
                <input
                  autoFocus
                  type="text"
                  maxLength={255}
                  value={modifyInput}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setModifyInput(e.target.value)
                  }
                  onKeyDown={async (
                    e: React.KeyboardEvent<HTMLInputElement>
                  ) => {
                    if (e.key === "Escape") {
                      setModify(false);
                    } else if (e.key === "Enter") {
                      await modifyComment(comment.idx, modifyInput);
                      cancelModify();
                    }
                  }}
                  placeholder="내용을 입력해주세요."
                />
                <MdCancel
                  onClick={() => cancelModify()}
                  className="post-comment-item-input-box-cancel"
                />
                <GoPencil
                  onClick={() => {
                    modifyComment(comment.idx, modifyInput);
                    cancelModify();
                  }}
                  className="post-comment-item-input-box-submit"
                />
              </div>
              {comment.reply_count !== 0 && (
                <PostReplyContainer
                  comment={comment}
                  modifyReply={modifyReply}
                  deleteReply={deleteReply}
                  userId={userId}
                  commentIdx={comment.idx}
                  admin={admin}
                  getReplies={getReplies}
                  login={login}
                />
              )}
            </div>
          ) : (
            <div className="post-comment-item-box">
              <div className="post-comment-item-box-title">
                {comment.fk_user_name}
                {comment.fk_user_is_admin && (
                  <IoMdCheckmarkCircleOutline className="post-comment-item-box-title-admin" />
                )}
                {comment.is_private && (
                  <IoIosLock className="post-comment-item-box-title-lock" />
                )}
                <span className="post-comment-item-box-time">
                  {TimeCounting(comment.created_at, { lang: "ko" })}
                </span>
                {comment.created_at !== comment.updated_at && (
                  <span className="post-comment-item-box-update">
                    {"(수정됨)"}
                  </span>
                )}
              </div>
              <span className="post-comment-item-box-content">
                {comment.content}
              </span>
              <div className="post-comment-item-box-util">
                <span
                  className="post-comment-item-box-util-reply"
                  onClick={() => setReply(true)}
                >
                  답글
                </span>
                {comment.fk_user_idx === userId && login && (
                  <span
                    className="post-comment-item-box-util-modify"
                    onClick={() => setModify(true)}
                  >
                    수정
                  </span>
                )}
                {(comment.fk_user_idx === userId || admin) && login && (
                  <span
                    className="post-comment-item-box-util-delete"
                    onClick={() => deleteComment(comment.idx)}
                  >
                    삭제
                  </span>
                )}
              </div>
              {reply && (
                <div className="post-comment-item-input post-comment-item-input-mg">
                  <div className="post-comment-item-input-box">
                    <input
                      autoFocus
                      maxLength={255}
                      value={replyInput}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setReplyInput(e.target.value)
                      }
                      onKeyDown={async (
                        e: React.KeyboardEvent<HTMLInputElement>
                      ) => {
                        if (e.key === "Escape") {
                          setReply(false);
                        } else if (e.key === "Enter") {
                          await createReply(comment.idx, replyInput, isPrivate);
                          cancelReply();
                        }
                      }}
                      placeholder="내용을 입력해주세요."
                    />
                    <MdCancel
                      onClick={() => cancelReply()}
                      className="post-comment-item-input-box-cancel post-comment-item-input-box-cancel-right"
                    />
                    {isPrivate ? (
                      <IoIosLock
                        onClick={() => setIsPrivateCallback(false)}
                        className="post-comment-item-input-box-lock"
                      />
                    ) : (
                      <IoIosUnlock
                        onClick={() => setIsPrivateCallback(true)}
                        className="post-comment-item-input-box-unlock"
                      />
                    )}
                    <FaTelegramPlane
                      onClick={async () => {
                        await createReply(comment.idx, replyInput);
                        cancelReply();
                      }}
                      className="post-comment-item-input-box-submit"
                    />
                  </div>
                </div>
              )}
              {comment.reply_count !== 0 && (
                <PostReplyContainer
                  comment={comment}
                  modifyReply={modifyReply}
                  deleteReply={deleteReply}
                  userId={userId}
                  commentIdx={comment.idx}
                  admin={admin}
                  getReplies={getReplies}
                  login={login}
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostCommentItem;
