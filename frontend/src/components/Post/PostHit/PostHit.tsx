import dynamic from "next/dynamic";
import React from "react";
import { PostType } from "types/PostType";
import "./PostHit.scss";

const PostHitItem = dynamic(() => import("./PostHitItem"));

interface PostHitProps {
  hitPosts: PostType[];
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
