import React from "react";
import "./MainCategory.scss";
import MainCategoryItem from "./MainCategoryItem";

interface MainCategoryProps {
  categoryList: CategoryType[];
  total_post: number;
}

interface CategoryType {
  idx: number;
  name: string;
  post_count: number;
}

const MainCategory = ({ categoryList, total_post }: MainCategoryProps) => {
  const total_view = {
    idx: 0,
    name: "전체 보기",
    post_count: total_post
  };

  return (
    <div className="main-category">
      <div className="main-category-title">목록 보기</div>
      <MainCategoryItem item={total_view} />
      {categoryList.map((category: CategoryType) => {
        return <MainCategoryItem key={category.idx} item={category} />;
      })}
    </div>
  );
};

export default MainCategory;
