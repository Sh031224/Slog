import React, { ChangeEvent } from "react";
import "./PostReplyItem.scss";
import { GoPencil } from "react-icons/go";
import { MdCancel } from "react-icons/md";
import profile from "../../../../assets/images/profile.png";
import TimeCounting from "time-counting";
import { IoIosLock } from "react-icons/io";

interface PostReplyItemProps {
  comment_idx: number;
  userId: number;
  admin: boolean;
  reply: ReplyType;
  login: boolean;
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
  comment_idx,
  userId,
  reply,
  admin,
  login
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
          {/* {modify ? (
            <div className="post-reply-item-input">
              <div className="post-reply-item-input-box">
                <input
                  type="text"
                  maxLength={255}
                  value={modifyInput}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setModifyInput(e.target.value)
                  }
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") {
                      modifyComment(reply.idx, modifyInput);
                    }
                  }}
                  placeholder="내용을 입력해주세요."
                />
                <MdCancel
                  onClick={() => cancelModify()}
                  className="post-reply-item-input-box-cancel"
                />
                <GoPencil
                  onClick={() => modifyComment(reply.idx, modifyInput)}
                  className="post-reply-item-input-box-submit"
                />
              </div>
            </div>
          ) : ( */}
          <div className="post-reply-item-box">
            <div className="post-reply-item-box-title">
              {reply.fk_user_name}
              {reply.is_private && (
                <IoIosLock className="post-reply-item-box-title-lock" />
              )}
              <span className="post-comment-item-box-time">
                {TimeCounting(reply.created_at, { lang: "ko" })}
              </span>
              {reply.created_at !== reply.updated_at && (
                <span className="post-reply-item-box-update">{"(수정됨)"}</span>
              )}
            </div>
            <span className="post-reply-item-box-content">{reply.content}</span>
            <div className="post-reply-item-box-util">
              {reply.fk_user_idx === userId && login && (
                <span
                  className="post-reply-item-box-util-modify"
                  // onClick={() => setModify(true)}
                >
                  수정
                </span>
              )}
              {(reply.fk_user_idx === userId || admin) && login && (
                <span className="post-reply-item-box-util-delete">삭제</span>
              )}
            </div>
          </div>
          {/* )} */}
        </>
      )}
    </div>
  );
};

export default PostReplyItem;
