import React, { Dispatch } from "react";
import { Link } from "react-router-dom";
import "./MainPostsItem.scss";

interface MainPostsItemProps {
  post: PostType;
  page: number;
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

const MainPostsItem = ({ post, page, setPage }: MainPostsItemProps) => {
  return (
    <div className="main-posts-item">
      <div className="main-posts-item-content">
        <Link to={`/post/${post.idx}`}>
          <h4 className="main-posts-item-content-title">{post.title}</h4>
          <div className="main-posts-item-content-description">
            {post.description}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MainPostsItem;
