import React, { Dispatch, MutableRefObject, SetStateAction } from "react";
import { CategoryType, PostType } from "types/PostType";
import "./Main.scss";
import MainCategory from "./MainCategory";
import MainCreate from "./MainCreate";
import MainPosts from "./MainPosts";

interface MainProps {
  categoryList: CategoryType[];
  totalPost: number;
  arrowToggleEl: MutableRefObject<any>;
  categoryRowEl: MutableRefObject<any>;
  setCategoryEdit: Dispatch<SetStateAction<boolean>>;
  admin: boolean;
  posts: PostType[];
  getPostLength: () => number;
  notfound: boolean;
  loading: boolean;
  lastCardEl: (node?: Element) => void;
  createPost: () => void;
}

const Main = ({
  posts,
  categoryList,
  totalPost,
  arrowToggleEl,
  categoryRowEl,
  setCategoryEdit,
  admin,
  notfound,
  loading,
  lastCardEl,
  createPost
}: MainProps) => {
  return (
    <div className="main">
      {admin && <MainCreate createPost={createPost} />}
      <div className="main-container">
        <MainPosts
          lastCardEl={lastCardEl}
          posts={posts}
          loading={loading}
          notfound={notfound}
        />
        <MainCategory
          categoryRowEl={categoryRowEl}
          arrowToggleEl={arrowToggleEl}
          categoryList={categoryList}
          totalPost={totalPost}
          setCategoryEdit={setCategoryEdit}
          admin={admin}
        />
      </div>
    </div>
  );
};

export default Main;
