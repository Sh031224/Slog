import Link from "next/link";
import React, { memo } from "react";
import styled from "styled-components";

interface ICategoryItemProps {
  href: string;
  params: number | string;
  name: string;
  postCount?: number;
  getIsActive: (idx: number | string) => boolean;
}

const CategoryItem: React.FC<ICategoryItemProps> = ({
  href,
  params,
  name,
  postCount,
  getIsActive
}) => {
  return (
    <Link href={href}>
      <a>
        <CategoryItemTitle isActive={getIsActive(params)}>
          {name}
          {postCount !== undefined && <CategoryPostCount>{` (${postCount})`}</CategoryPostCount>}
        </CategoryItemTitle>
      </a>
    </Link>
  );
};

const CategoryItemTitle = styled.div<{ isActive: boolean }>`
  color: ${({ theme, isActive }) => (isActive ? theme.colors.ftBlue : theme.colors.ftGray)};
  font-weight: ${({ isActive }) => (isActive ? 700 : 400)};
  margin-top: 0.3rem;
  font-size: 0.9rem;
  cursor: pointer;
`;

const CategoryPostCount = styled.span`
  color: ${({ theme }) => theme.colors.ftLightGray};
`;

export default memo(CategoryItem);
