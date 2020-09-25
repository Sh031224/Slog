import dynamic from "next/dynamic";
import React, { Fragment } from "react";
import "./MainPosts.scss";

const MainPostsItem = dynamic(() => import("./MainPostsItem"));

interface MainPostsProps {
  posts: PostType[];
  loading: boolean;
  notfound: boolean;
  lastCardEl: React.MutableRefObject<HTMLDivElement | null>;
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

const MainPosts = ({
  posts,
  loading,
  notfound,
  lastCardEl
}: MainPostsProps) => {
  return (
    <div className="main-posts">
      <div className="main-posts-area">
        {notfound && !loading && (
          <div className="main-posts-404">게시글이 없어요. 🤭</div>
        )}
        {posts.map((post: PostType, index: number) => {
          return (
            <Fragment key={index}>
              {index !== posts.length - 1 ? (
                <MainPostsItem post={post} />
              ) : (
                <MainPostsItem lastCardEl={lastCardEl} post={post} />
              )}
            </Fragment>
          );
        })}
        {loading && (
          <div className="main-posts-loading">
            <div className="main-posts-loading-thumbnail">
              <div className="main-posts-loading-thumbnail-img" />
            </div>
            <div className="main-posts-loading-content">
              <div className="main-posts-loading-content-title" />
              <div className="main-posts-loading-content-description main-posts-loading-content-description-1" />
              <div className="main-posts-loading-content-description main-posts-loading-content-description-2" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPosts;
