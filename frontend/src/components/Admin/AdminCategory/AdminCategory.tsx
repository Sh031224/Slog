import React, { Dispatch, SetStateAction } from "react";
import "./AdminCategory.scss";
import { GrFormAdd } from "react-icons/gr";
import dynamic from "next/dynamic";

const AdminCategoryItem = dynamic(() => import("./AdminCategoryItem"));

interface AdminCategoryProps {
  categoryList: CategoryType[];
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  modifyName: (category_idx: number, name: string) => void;
  modifyOrderNumber: (category_idx: number, order_number: number) => void;
  setCategoryEdit: Dispatch<React.SetStateAction<boolean>>;
  removeCategory: (category_idx: number) => void;
  createTempCategory: () => Promise<void>;
}

interface CategoryType {
  idx: number;
  name: string;
  post_count: number;
}

const AdminCategory = ({
  categoryList,
  input,
  setInput,
  modifyOrderNumber,
  modifyName,
  setCategoryEdit,
  removeCategory,
  createTempCategory
}: AdminCategoryProps) => {
  return (
    <div className="admin-category">
      <div
        className="admin-category-box-exit"
        onClick={() => setCategoryEdit(false)}
      />
      <div className="admin-category-box">
        <div className="admin-category-box-title">
          <span>⚙️ 카테고리 수정</span>
          <GrFormAdd
            onClick={() => createTempCategory()}
            className="admin-category-box-title-plus"
          />
        </div>
        {categoryList.map((category: CategoryType, index: number) => {
          return (
            <AdminCategoryItem
              removeCategory={removeCategory}
              modifyName={modifyName}
              input={input}
              setInput={setInput}
              key={index}
              last={categoryList.length - 1}
              index={index}
              category={category}
              modifyOrderNumber={modifyOrderNumber}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AdminCategory;
