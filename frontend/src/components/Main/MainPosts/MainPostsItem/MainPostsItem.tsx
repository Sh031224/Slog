import React, { Dispatch } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { GoCommentDiscussion } from "react-icons/go";
import "./MainPostsItem.scss";
import TimeCalc from "../../../../util/lib/TimeCalc";
import TimeCounting from "time-counting";

interface MainPostsItemProps {
  post: PostType;
}

interface PostType {
  idx: number;
  title: string;
  view: number;
  comment_count: number;
  thumbnail?: string;
  description?: string;
  created_at: Date;
}

const MainPostsItem = ({ post }: MainPostsItemProps) => {
  return (
    <div className="main-posts-item">
      {post.thumbnail && (
        <Link className="main-posts-item-thumbnail" to={`/post/${post.idx}`}>
          <img
            className="main-posts-item-thumbnail-img"
            src={post.thumbnail}
            alt={post.title}
          />
        </Link>
      )}
      <div className="main-posts-item-content">
        <Link to={`/post/${post.idx}`}>
          <h4 className="main-posts-item-content-title">{post.title}</h4>
          <div
            className={
              "main-posts-item-content-description" +
              (post.thumbnail
                ? " main-posts-item-content-description-thumbnail"
                : "")
            }
          >
            {post.description}
          </div>
        </Link>
        <div className="main-posts-item-content-subinfo">
          <span title={TimeCalc.getTime(post.created_at)}>
            {TimeCounting(post.created_at, { lang: "ko" })}
          </span>
        </div>
      </div>
      <div className="main-posts-item-info">
        <AiOutlineEye className="main-posts-item-info-icon" />
        <span className="main-posts-item-info-count">{post.view}</span>
        <GoCommentDiscussion className="main-posts-item-info-icon" />
        <span className="main-posts-item-info-count">{post.comment_count}</span>
      </div>
    </div>
  );
};

export default MainPostsItem;
