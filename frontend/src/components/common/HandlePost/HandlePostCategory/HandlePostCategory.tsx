import React from "react";

interface HandlePostCategoryProps {
  categoryList: CategoryType[];
  categoryIdx: number;
  setCategoryIdx: React.Dispatch<React.SetStateAction<number>>;
}

interface CategoryType {
  idx: number;
  name: string;
  post_count: number;
}
const HandlePostCategory = ({
  categoryList,
  categoryIdx,
  setCategoryIdx
}: HandlePostCategoryProps) => {
  return (
    <>
      <select
        value={categoryIdx}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setCategoryIdx(Number(e.target.value))
        }
        name="category"
        id="category_idx"
      >
        <option value={-1} selected>
          카테고리를 선택해주세요.
        </option>
        {categoryList.map((category: CategoryType) => {
          return (
            <option value={category.idx} key={category.idx}>
              {category.name}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default HandlePostCategory;
