import React, { Dispatch, MutableRefObject, SetStateAction } from "react";
import { MdExpandMore } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import "./MainCategory.scss";
import dynamic from "next/dynamic";
import { CategoryType } from "types/PostType";

const MainCategoryItem = dynamic(() => import("./MainCategoryItem"));
const MainCategoryRowItem = dynamic(() => import("./MainCategoryRowItem"));

interface MainCategoryProps {
  categoryList: CategoryType[];
  totalPost: number;
  arrowToggleEl: MutableRefObject<any>;
  categoryRowEl: MutableRefObject<any>;
  setCategoryEdit: Dispatch<SetStateAction<boolean>>;
  admin: boolean;
}

const MainCategory = ({
  categoryList,
  totalPost,
  arrowToggleEl,
  categoryRowEl,
  setCategoryEdit,
  admin
}: MainCategoryProps) => {
  const total_view = {
    idx: 0,
    name: "전체 보기",
    post_count: totalPost
  };

  const arrowToggle = () => {
    arrowToggleEl.current.classList.toggle("main-category-arrow-toggle");
    categoryRowEl.current.classList.toggle("main-category-row-view");
  };

  return (
    <>
      <div className="main-category">
        <div className="main-category-title">
          목록 보기
          {admin && (
            <span
              onClick={() => setCategoryEdit(true)}
              className="main-category-edit"
            >
              <FiEdit3 />
            </span>
          )}
        </div>
        <MainCategoryItem item={total_view} />
        {categoryList.map((category: CategoryType) => {
          return <MainCategoryItem key={category.idx} item={category} />;
        })}
        {admin && (
          <MainCategoryItem
            item={{ idx: -1, name: "임시저장", post_count: 0 }}
          />
        )}
      </div>
      <div
        onClick={arrowToggle}
        ref={arrowToggleEl}
        className="main-category-arrow"
      >
        <MdExpandMore />
      </div>

      <div ref={categoryRowEl} className="main-category-row">
        <MainCategoryRowItem item={total_view} />
        {categoryList.map((category: CategoryType) => {
          return <MainCategoryRowItem item={category} key={category.idx} />;
        })}
        {admin && (
          <MainCategoryRowItem
            item={{ idx: -1, name: "임시저장", post_count: 0 }}
          />
        )}
        {admin && (
          <div
            onClick={() => setCategoryEdit(true)}
            className="main-category-row-edit main-category-row-item"
          >
            <FiEdit3 />
          </div>
        )}
      </div>
    </>
  );
};

export default MainCategory;
