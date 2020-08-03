import React, {
  ChangeEvent,
  Dispatch,
  KeyboardEventHandler,
  SetStateAction
} from "react";
import "./PostCommentItem.scss";
import profile from "../../../../assets/images/profile.png";
import PostReplyContainer from "../../../../containers/Post/PostReplyContainer";
import { GoPencil } from "react-icons/go";
import { MdCancel } from "react-icons/md";

interface PostCommentItemProps {
  comment: CommentType;
  userName: string;
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
  userName,
  admin,
  getReplies,
  userId,
  modifyComment,
  deleteComment,
  cancelModify,
  modify,
  setModify,
  setModifyInput,
  modifyInput
}: PostCommentItemProps) => {
  return (
    <div className="post-comment-item">
      <img className="post-comment-item-img" src={profile} alt="profile" />
      {!comment.fk_user_name ? (
        <div className="post-comment-item-box-private">
          <div className="post-comment-item-box-private-title">
            {comment.content}
          </div>
        </div>
      ) : (
        <>
          {modify ? (
            <div className="post-comment-item-input">
              <div className="post-comment-item-input-box">
                <input
                  type="text"
                  maxLength={255}
                  value={modifyInput}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setModifyInput(e.target.value)
                  }
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") {
                      modifyComment(comment.idx, modifyInput);
                    }
                  }}
                  placeholder="내용을 입력해주세요."
                />
                <MdCancel
                  onClick={() => cancelModify()}
                  className="post-comment-item-input-box-cancel"
                />
                <GoPencil
                  onClick={() => modifyComment(comment.idx, modifyInput)}
                  className="post-comment-item-input-box-submit"
                />
              </div>
            </div>
          ) : (
            <div className="post-comment-item-box">
              <div className="post-comment-item-box-title">
                {comment.fk_user_name}
              </div>
              <span className="post-comment-item-box-content">
                {comment.content}
              </span>
              <div className="post-comment-item-box-util">
                <span className="post-comment-item-box-util-reply">답글</span>
                {comment.fk_user_idx === userId && (
                  <span
                    className="post-comment-item-box-util-modify"
                    onClick={() => setModify(true)}
                  >
                    수정
                  </span>
                )}
                {(comment.fk_user_idx === userId || admin) && (
                  <span
                    className="post-comment-item-box-util-delete"
                    onClick={() => deleteComment(comment.idx)}
                  >
                    삭제
                  </span>
                )}
              </div>
            </div>
          )}
        </>
      )}
      {comment.reply_count !== 0 && (
        <PostReplyContainer
          idx={comment.idx}
          admin={admin}
          userName={userName}
          getReplies={getReplies}
        />
      )}
    </div>
  );
};

export default PostCommentItem;
