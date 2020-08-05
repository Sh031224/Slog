import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import "./PostCommentItem.scss";
import profile from "../../../../assets/images/profile.png";
import PostReplyContainer from "../../../../containers/Post/PostReplyContainer";
import TimeCounting from "time-counting";
import { GoPencil } from "react-icons/go";
import { MdCancel } from "react-icons/md";
import { IoIosLock, IoIosUnlock } from "react-icons/io";

interface PostCommentItemProps {
  comment: CommentType;
  admin: boolean;
  getReplies: (comment_idx: number) => Promise<RepliesResponse>;
  userId: number;
  modifyComment: (comment_idx: number, content: string) => Promise<void>;
  deleteComment: (comment_idx: number) => Promise<void>;
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
    comment_idx: number,
    content: string,
    is_private?: boolean | undefined
  ) => Promise<void>;
  modifyReply: (reply_idx: number, content: string) => Promise<void>;
  deleteReply: (reply_idx: number) => Promise<void>;
  isPrivate: boolean;
  setIsPrivateCallback: (status: boolean) => void;
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
  setIsPrivateCallback,
  refresh,
  setRefresh
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
              comment_idx={comment.idx}
              admin={admin}
              getReplies={getReplies}
              refresh={refresh}
              setRefresh={setRefresh}
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
                  refresh={refresh}
                  setRefresh={setRefresh}
                  userId={userId}
                  comment_idx={comment.idx}
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
                          setRefresh(refresh + 1);
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
                    <GoPencil
                      onClick={async () => {
                        await createReply(comment.idx, replyInput);
                        cancelReply();
                        setRefresh(refresh + 1);
                      }}
                      className="post-comment-item-input-box-submit"
                    />
                  </div>
                </div>
              )}
              {comment.reply_count !== 0 && (
                <PostReplyContainer
                  refresh={refresh}
                  setRefresh={setRefresh}
                  userId={userId}
                  comment_idx={comment.idx}
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
