import useCategories from "hooks/useCategories";
import React from "react";
import { FiEdit3 } from "react-icons/fi";
import { MdExpandMore } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "stores/modules";
import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import CategoryRowItem, { CategoryRow } from "./CategoryRowItem";
import dynamic from "next/dynamic";

const AdminCategory = dynamic(() => import("./AdminCategory"));

const MainCategories: React.FC = () => {
  const { is_admin } = useSelector((state: RootState) => state.user.data.user);
  const {
    total,
    categories,
    getIsActive,
    isArrowActive,
    onArrowClick,
    isEdit,
    onClickEdit,
    onCloseEdit,
    createCategory
  } = useCategories();

  return (
    <>
      {isEdit && is_admin && (
        <AdminCategory
          createCategory={createCategory}
          categories={categories}
          onCloseEdit={onCloseEdit}
        />
      )}

      <CategoriesWrapper>
        <CategoryTitle>
          목록 보기
          {is_admin && (
            <CategoryEdit onClick={onClickEdit}>
              <FiEdit3 />
            </CategoryEdit>
          )}
        </CategoryTitle>
        <CategoryItem
          href={"/"}
          params={""}
          name={"전체 보기"}
          postCount={total}
          getIsActive={getIsActive}
        />
        {categories.map((item) => (
          <CategoryItem
            key={item.idx}
            href={`/?tab=${item.idx}`}
            params={item.idx}
            name={item.name}
            postCount={item.post_count}
            getIsActive={getIsActive}
          />
        ))}
        {is_admin && (
          <CategoryItem
            href={"/?temp=true"}
            params={-1}
            name={"임시저장"}
            getIsActive={getIsActive}
          />
        )}
      </CategoriesWrapper>
      <CategoryArrow isActive={isArrowActive} onClick={onArrowClick}>
        <MdExpandMore />
      </CategoryArrow>
      <CategoryRowWrapper isActive={isArrowActive}>
        <CategoryRowItem
          href={"/"}
          params={""}
          name={"전체보기"}
          postCount={total}
          getIsActive={getIsActive}
        />
        {categories.map((item) => (
          <CategoryRowItem
            key={item.idx}
            href={`/?tab=${item.idx}`}
            params={item.idx}
            name={item.name}
            postCount={item.post_count}
            getIsActive={getIsActive}
          />
        ))}
        {is_admin && (
          <React.Fragment>
            <CategoryRowItem
              href={"/?temp=true"}
              params={-1}
              name={"임시저장"}
              getIsActive={getIsActive}
            />
            <CategoryRow isActive={false}>
              <FiEdit3 />
            </CategoryRow>
          </React.Fragment>
        )}
      </CategoryRowWrapper>
    </>
  );
};

const CategoriesWrapper = styled.section`
  display: flex;
  width: 10rem;
  flex-direction: column;
  margin-right: 1rem;
  ${({ theme }) => theme.device.desktop} {
    padding: 1rem;
  }
  ${({ theme }) => theme.device.smallDesktop} {
    display: none;
  }
`;

const CategoryTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.colors.bdLightGray};
  padding-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.ftDarkGray};
  margin-bottom: 0.3rem;
`;

const CategoryEdit = styled.span`
  font-size: 0.8rem;
  margin-left: 0.5rem;
  cursor: pointer;
`;

const CategoryArrow = styled.div<{ isActive: boolean }>`
  display: none;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all ease-in-out 0.5s 0s;
  transform: ${({ isActive }) => (isActive ? "rotate(0deg)" : "rotate(180deg)")};
  ${({ theme }) => theme.device.smallDesktop} {
    display: flex;
  }
`;

const CategoryRowWrapper = styled.section<{ isActive: boolean }>`
  display: none;
  padding: 1rem;
  overflow: ${({ isActive }) => (isActive ? "hidden" : "initial")};
  max-height: ${({ isActive }) => (isActive ? "5rem" : "20rem")};
  transition: all ease-in-out 0.5s;
  transition-duration: ${({ isActive }) => (isActive ? ".5s" : "1s")};
  ${({ theme }) => theme.device.smallDesktop} {
    display: flex;
    flex-wrap: wrap;
    padding: 1.5rem 1rem 0 1rem;
  }
`;

export default MainCategories;
