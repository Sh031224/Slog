import React from "react";
import "./PostHeader.scss";
import TimeCalc from "../../../util/lib/TimeCalc";
import TimeCounting from "time-counting";
import { FiMoreHorizontal, FiEdit3, FiDelete } from "react-icons/fi";

interface PostHeaderProps {
  thumbnail: string | null;
  title: string;
  created_at: Date;
  updated_at: Date;
  handler: boolean;
  setHandler: React.Dispatch<React.SetStateAction<boolean>>;
  admin: boolean;
  deletePostAlert: () => void;
  editPost: () => void;
}

const PostHeader = ({
  title,
  created_at,
  updated_at,
  thumbnail,
  admin,
  handler,
  setHandler,
  deletePostAlert,
  editPost
}: PostHeaderProps) => {
  return (
    <div className="post-header">
      <div className="post-header-container">
        {admin && (
          <>
            <div className="post-header-container-handle">
              <FiMoreHorizontal
                className="post-header-container-handle-btn"
                onClick={() => setHandler(!handler)}
              />
              {handler && (
                <div className="post-header-container-handle-box">
                  <div onClick={() => editPost()}>
                    글 수정하기
                    <FiEdit3 />
                  </div>
                  <div onClick={() => deletePostAlert()}>
                    글 삭제하기
                    <FiDelete />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
        <h1
          className="post-header-container-title"
          onClick={() => setHandler(false)}
        >
          {title}
        </h1>
        <span
          className="post-header-container-date"
          onClick={() => setHandler(false)}
        >
          <span
            title={TimeCalc.getTime(created_at)}
            className="post-header-container-date-time"
          >
            {TimeCounting(created_at, { lang: "ko" })}
          </span>
          {TimeCalc.checkModify(created_at, updated_at) && (
            <>
              <span className="post-header-container-comma">·</span>
              <span>수정됨</span>
            </>
          )}
        </span>
      </div>
      {thumbnail !== null && (
        <img
          className="post-header-thumbnail"
          src={thumbnail}
          alt="post_thumbnail"
        />
      )}
    </div>
  );
};

export default PostHeader;
