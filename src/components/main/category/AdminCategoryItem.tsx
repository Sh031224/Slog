import { ICategory } from "interface/ICategory";
import React, { memo } from "react";
import styled from "styled-components";
import { RiArrowDropUpLine, RiArrowDropDownLine, RiDeleteBin6Line } from "react-icons/ri";
import useAdminCategory from "hooks/useAdminCategory";

interface IAdminCategoryItemProps {
  item: ICategory;
  idx: number;
  isFirst?: boolean;
  isLast?: boolean;
}

const AdminCategoryItem: React.FC<IAdminCategoryItemProps> = ({
  item,
  idx,
  isFirst = false,
  isLast = false
}) => {
  const {
    isFocus,
    value,
    onClickTitle,
    onChangeValue,
    onKeyPressHandle,
    modifyCategoryOrder,
    deleteCategory
  } = useAdminCategory(item);

  return (
    <AdminItemWrapper>
      <span onClick={onClickTitle}>{item.name}</span>
      <AdminItemEditInput
        type="text"
        maxLength={50}
        isFocus={isFocus}
        value={value}
        onKeyPress={onKeyPressHandle}
        onChange={onChangeValue}
      />
      <AdminCategoryIcon>
        <AdminCategoryDeleteIcon onClick={deleteCategory} />
        <AdminCategoryArrow>
          <AdminCategoryArrowUp isFirst={isFirst} onClick={() => modifyCategoryOrder(idx)} />
          <AdminCategoryArrowDown isLast={isLast} onClick={() => modifyCategoryOrder(idx + 2)} />
        </AdminCategoryArrow>
      </AdminCategoryIcon>
    </AdminItemWrapper>
  );
};

const AdminItemWrapper = styled.div`
  position: relative;
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.colors.ftGray};
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover > div > svg {
    display: block;
  }
`;

const AdminItemEditInput = styled.input<{ isFocus: boolean }>`
  position: absolute;
  width: calc(100% - 7rem);
  height: 100%;
  font-size: 0.9rem;
  outline: none;
  display: ${({ isFocus }) => (isFocus ? "block" : "none")};
  border: none;
  color: ${({ theme }) => theme.colors.ftGray};
`;

const AdminCategoryIcon = styled.div`
  display: flex;
  align-items: center;
`;

const AdminCategoryDeleteIcon = styled(RiDeleteBin6Line)`
  display: none;
  cursor: pointer;
`;

const AdminCategoryArrow = styled.div`
  margin-left: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  cursor: pointer;
`;

const AdminCategoryArrowUp = styled(RiArrowDropUpLine)<{ isFirst: boolean }>`
  ${({ isFirst, theme }) =>
    isFirst && `color: ${theme.colors.ftLightGray}; opacity: 0.6; cursor: default;`}
`;

const AdminCategoryArrowDown = styled(RiArrowDropDownLine)<{ isLast: boolean }>`
  ${({ isLast, theme }) =>
    isLast && `color: ${theme.colors.ftLightGray}; opacity: 0.6; cursor: default;`}
`;

export default memo(AdminCategoryItem);
