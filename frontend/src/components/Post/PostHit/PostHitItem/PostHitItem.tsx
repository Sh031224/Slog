import React from "react";
// import { NavLink } from "react-router-dom";
import TimeCounting from "time-counting";
import "./PostHitItem.scss";

interface PostHitItemProps {
  post: PostType;
}

interface PostType {
  idx: number;
  title: string;
  view?: number;
  comment_count?: number;
  thumbnail?: string;
  description?: string;
  created_at: Date;
}

const PostHitItem = ({ post }: PostHitItemProps) => {
  return (
    <div className="post-hit-item">
      {/* <NavLink
        to={`/post/${post.idx}`}
        activeClassName={"post-hit-item-active"}
      >
        <div className="post-hit-item-title">{post.title}</div>
      </NavLink>
      <div className="post-hit-item-date">
        {TimeCounting(post.created_at, { lang: "ko" })}
      </div> */}
    </div>
  );
};

export default PostHitItem;
