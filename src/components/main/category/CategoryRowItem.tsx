import Link from "next/link";
import React, { memo } from "react";
import styled from "styled-components";

interface ICategoryRowItemProps {
  href: string;
  params: number | string;
  name: string;
  postCount?: number;
  getIsActive: (idx: number | string) => boolean;
}

const CategoryRowItem: React.FC<ICategoryRowItemProps> = ({
  href,
  params,
  name,
  postCount,
  getIsActive
}) => {
  return (
    <Link href={href}>
      <a>
        <CategoryRow isActive={getIsActive(params)}>
          {name}
          {postCount !== undefined && (
            <CategoryCount isActive={getIsActive(params)}>{` (${postCount})`}</CategoryCount>
          )}
        </CategoryRow>
      </a>
    </Link>
  );
};

export const CategoryRow = styled.div<{ isActive: boolean }>`
  padding: 0.2rem 0.75rem;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.bgBlue : theme.colors.bgLightGray};
  margin: 0.5rem;
  border-radius: 0.75rem;
  font-size: 0.75rem;
  line-height: 1.5;
  color: ${({ theme, isActive }) => (isActive ? theme.colors.ftWhite : theme.colors.ftDarkGray)};
  display: flex;
  cursor: pointer;
  align-items: center;
`;

const CategoryCount = styled.span<{ isActive: boolean }>`
  margin-left: 0.25rem;
  color: ${({ theme, isActive }) => (isActive ? theme.colors.ftWhite : theme.colors.ftGray)};
  opacity: ${({ isActive }) => (isActive ? "0.8" : "1")};
  font-size: 0.7rem;
`;

export default memo(CategoryRowItem);
