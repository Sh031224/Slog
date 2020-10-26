import dynamic from "next/dynamic";
import React, { Dispatch, MutableRefObject, SetStateAction } from "react";
import "./Main.scss";

const MainCategory = dynamic(() => import("./MainCategory"));
const MainPosts = dynamic(() => import("./MainPosts"));
const MainCreate = dynamic(() => import("./MainCreate"));

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
  lastCardEl: React.MutableRefObject<HTMLDivElement | null>;
  createPost: () => void;
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

interface CategoryType {
  idx: number;
  name: string;
  post_count: number;
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
