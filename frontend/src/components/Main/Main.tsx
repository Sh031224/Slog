import React, { Dispatch, MutableRefObject, SetStateAction } from "react";
import "./Main.scss";
import MainCategory from "./MainCategory";
import "./Main.scss";
import MainPostContainer from "../../containers/Main/MainPostContainer";

interface MainProps {
  categoryList: CategoryType[];
  total_post: number;
  arrowToggleEl: MutableRefObject<any>;
  categoryRowEl: MutableRefObject<any>;
  setCategoryEdit: Dispatch<SetStateAction<boolean>>;
  admin: boolean;
}

interface CategoryType {
  idx: number;
  name: string;
  post_count: number;
}

const Main = ({
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
        <MainPostContainer categoryList={categoryList} />
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
