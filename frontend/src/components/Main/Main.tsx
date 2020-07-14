import React from "react";
import "./Main.scss";
import MainCategory from "./MainCategory";
import "./Main.scss";

interface MainProps {
  categoryList: CategoryType[];
  total_post: number;
}

interface CategoryType {
  idx: number;
  name: string;
  post_count: number;
}

const Main = ({ categoryList, total_post }: MainProps) => {
  return (
    <div className="main">
      <div className="main-container">
        <MainCategory categoryList={categoryList} total_post={total_post} />
      </div>
    </div>
  );
};

export default Main;
