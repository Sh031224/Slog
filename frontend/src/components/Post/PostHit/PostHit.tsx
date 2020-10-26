import dynamic from "next/dynamic";
import React from "react";
import "./PostHit.scss";

const PostHitItem = dynamic(() => import("./PostHitItem"));

interface PostHitProps {
  hitPosts: PostType[];
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

const PostHit = ({ hitPosts }: PostHitProps) => {
  return (
    <div className="post-hit">
      <div className="post-hit-box">
        <h3>이 블로그의 인기 글</h3>
        {hitPosts.map((post: PostType, index: number) => {
          return <PostHitItem key={index} post={post} />;
        })}
      </div>
    </div>
  );
};

export default PostHit;
