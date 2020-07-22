import React from "react";
import { NavLink } from "react-router-dom";
import TimeCalc from "../../../../util/lib/TimeCalc";
import "./PostHitItem.scss";

interface PostHitItemProps {
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

const PostHitItem = ({ post }: PostHitItemProps) => {
  return (
    <div className="post-hit-item">
      <NavLink
        to={`/post/${post.idx}`}
        activeClassName={"post-hit-item-active"}
      >
        <div className="post-hit-item-title">{post.title}</div>
      </NavLink>
      <div className="post-hit-item-date">{TimeCalc.calc(post.created_at)}</div>
    </div>
  );
};

export default PostHitItem;
