import React from "react";
import "./PostHit.scss";

interface PostHitProps {
  hit_posts: PostType[];
  post_idx: number;
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

const PostHit = ({ hit_posts, post_idx }: PostHitProps) => {
  return (
    <div className="post-hit">
      <div className="post-hit-box">
        <h3>이 블로그의 인기 글</h3>
        <div className="post-hit-list"></div>
      </div>
    </div>
  );
};

export default PostHit;
