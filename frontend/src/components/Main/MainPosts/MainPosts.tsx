import React, { Dispatch } from "react";
import "./MainPosts.scss";
import MainPostsItem from "./MainPostsItem";

interface MainPostsProps {
  posts: PostType[];
  page: number;
  loading: boolean;
  setPage: Dispatch<React.SetStateAction<number>>;
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

const MainPosts = ({ posts, page, loading, setPage }: MainPostsProps) => {
  return (
    <div className="main-posts">
      <div className="main-posts-area">
        {posts.length <= 0 && (
          <div className="main-posts-404">게시글이 없어요. 🤭</div>
        )}
        {posts.map((post: PostType) => {
          return (
            <MainPostsItem
              post={post}
              setPage={setPage}
              page={page}
              key={post.idx}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MainPosts;
