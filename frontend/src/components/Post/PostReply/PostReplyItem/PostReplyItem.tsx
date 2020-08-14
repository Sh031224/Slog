import React, { ChangeEvent } from "react";
import "./PostReplyItem.scss";
import { GoPencil } from "react-icons/go";
import { MdCancel } from "react-icons/md";
import profile from "../../../../assets/images/profile.png";
import TimeCounting from "time-counting";
import { IoIosLock, IoMdCheckmarkCircleOutline } from "react-icons/io";

interface PostReplyItemProps {
  userId: number;
  admin: boolean;
  reply: ReplyType;
  login: boolean;
  cancelModify: () => void;
  modify: boolean;
  setModify: React.Dispatch<React.SetStateAction<boolean>>;
  modifyInput: string;
  setModifyInput: React.Dispatch<React.SetStateAction<string>>;
  modifyReply: (reply_idx: number, content: string) => Promise<void>;
  deleteReply: (reply_idx: number) => void;
  adminId: number;
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

const PostReplyItem = ({
  userId,
  reply,
  admin,
  login,
  cancelModify,
  modify,
  setModify,
  setModifyInput,
  modifyInput,
  modifyReply,
  deleteReply,
  adminId
}: PostReplyItemProps) => {
  return (
    <div className="post-reply-item">
      <img className="post-reply-item-img" src={profile} alt="profile" />
      {!reply.fk_user_name ? (
        <div className="post-reply-item-box-private">
          <div className="post-reply-item-box-private-title">
            {reply.content}
            <span className="post-reply-item-box-time">
              {TimeCounting(reply.created_at, { lang: "ko" })}
            </span>
            {reply.created_at !== reply.updated_at && (
              <span className="post-reply-item-box-update">{"(수정됨)"}</span>
            )}
          </div>
        </div>
      ) : (
        <>
          {modify ? (
            <div className="post-reply-item-input">
              <div className="post-reply-item-input-box">
                <input
                  type="text"
                  maxLength={255}
                  value={modifyInput}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setModifyInput(e.target.value)
                  }
                  onKeyDown={async (
                    e: React.KeyboardEvent<HTMLInputElement>
                  ) => {
                    if (e.key === "Enter") {
                      await modifyReply(reply.idx, modifyInput);
                      cancelModify();
                    }
                  }}
                  placeholder="내용을 입력해주세요."
                />
                <MdCancel
                  onClick={() => cancelModify()}
                  className="post-reply-item-input-box-cancel"
                />
                <GoPencil
                  onClick={async () => {
                    await modifyReply(reply.idx, modifyInput);
                    cancelModify();
                  }}
                  className="post-reply-item-input-box-submit"
                />
              </div>
            </div>
          ) : (
            <div className="post-reply-item-box">
              <div className="post-reply-item-box-title">
                {reply.fk_user_name}
                {reply.fk_user_idx === adminId && (
                  <IoMdCheckmarkCircleOutline className="post-comment-item-box-title-admin" />
                )}
                {reply.is_private && (
                  <IoIosLock className="post-reply-item-box-title-lock" />
                )}
                <span className="post-comment-item-box-time">
                  {TimeCounting(reply.created_at, { lang: "ko" })}
                </span>
                {reply.created_at !== reply.updated_at && (
                  <span className="post-reply-item-box-update">
                    {"(수정됨)"}
                  </span>
                )}
              </div>
              <span className="post-reply-item-box-content">
                {reply.content}
              </span>
              <div className="post-reply-item-box-util">
                {reply.fk_user_idx === userId && login && (
                  <span
                    className="post-reply-item-box-util-modify"
                    onClick={() => setModify(true)}
                  >
                    수정
                  </span>
                )}
                {(reply.fk_user_idx === userId || admin) && login && (
                  <span
                    onClick={() => deleteReply(reply.idx)}
                    className="post-reply-item-box-util-delete"
                  >
                    삭제
                  </span>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostReplyItem;
