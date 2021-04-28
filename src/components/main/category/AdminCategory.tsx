import React, { memo } from "react";
import styled from "styled-components";
import { GrFormAdd } from "react-icons/gr";
import { ICategory } from "interface/ICategory";
import AdminCategoryItem from "./AdminCategoryItem";

interface IAdminCategoryProps {
  categories: ICategory[];
  onCloseEdit: () => void;
  createCategory: () => void;
}

const AdminCategory: React.FC<IAdminCategoryProps> = ({
  categories,
  onCloseEdit,
  createCategory
}) => {
  return (
    <AdminCategoryWrapper>
      <AdminCategoryExit onClick={onCloseEdit} />
      <AdminCategoryContainer>
        <AdminCategoryTitle>
          <span>⚙️ 카테고리 수정</span>️
          <AdminCategoryIcon onClick={createCategory} />
        </AdminCategoryTitle>
        {categories.map((item, idx) => (
          <AdminCategoryItem
            item={item}
            key={idx}
            idx={idx}
            isFirst={idx === 0}
            isLast={idx === categories.length - 1}
          />
        ))}
      </AdminCategoryContainer>
    </AdminCategoryWrapper>
  );
};

const AdminCategoryWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.bgPopUp};
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 100vh;
`;

const AdminCategoryExit = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
`;

const AdminCategoryContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.bgWhite};
  width: 100%;
  max-width: 30rem;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.colors.sdBlack} 1px 1px 15px;
  z-index: 11;
`;

const AdminCategoryTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  border-bottom: ${({ theme }) => theme.colors.bdLightGray} 1px solid;
  padding-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AdminCategoryIcon = styled(GrFormAdd)`
  opacity: 0.5;
  cursor: pointer;
`;

export default memo(AdminCategory);
