import React, { Dispatch, MutableRefObject, SetStateAction } from "react";
import "./Main.scss";
import MainCategory from "./MainCategory";
import MainPostContainer from "../../containers/Main/MainPostContainer";

interface MainProps {
  categoryList: CategoryType[];
  total_post: number;
  arrowToggleEl: MutableRefObject<any>;
  categoryRowEl: MutableRefObject<any>;
  setCategoryEdit: Dispatch<SetStateAction<boolean>>;
  admin: boolean;
  posts: PostType[];
  handlePosts: (query: PostParmsType) => Promise<unknown>;
  initPosts: () => void;
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

interface PostParmsType {
  page: number;
  limit: number;
  order?: string;
  category?: number;
}

interface CategoryType {
  idx: number;
  name: string;
  post_count: number;
}

const Main = ({
  posts,
  handlePosts,
  initPosts,
  categoryList,
  total_post,
  arrowToggleEl,
  categoryRowEl,
  setCategoryEdit,
  admin
}: MainProps) => {
  return (
    <div className="main">
      <div className="main-container">
        <MainPostContainer
          posts={posts}
          handlePosts={handlePosts}
          initPosts={initPosts}
          categoryList={categoryList}
        />
        <MainCategory
          categoryRowEl={categoryRowEl}
          arrowToggleEl={arrowToggleEl}
          categoryList={categoryList}
          total_post={total_post}
          setCategoryEdit={setCategoryEdit}
          admin={admin}
        />
      </div>
    </div>
  );
};

export default Main;
