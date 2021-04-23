import { IPost } from "interface/IPost";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { memo, useMemo } from "react";
import styled from "styled-components";
import TimeCounting from "time-counting";

interface IPostHitItemProps {
  item: IPost;
}

const PostHitItem: React.FC<IPostHitItemProps> = ({ item }) => {
  const router = useRouter();

  const isActive = useMemo(() => router.query.idx === `${item.idx}`, [router, item]);

  return (
    <PostHitItemContainer>
      <Link href={`/post/[idx]`} as={`/post/${item.idx}`}>
        <a>
          <PostHitItemTitle isActive={isActive}>{item.title}</PostHitItemTitle>
        </a>
      </Link>
      <PostHitDate>{TimeCounting(item.created_at, { lang: "ko" })}</PostHitDate>
    </PostHitItemContainer>
  );
};

const PostHitItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 0.2rem;
  a {
    display: inline-block;
    width: calc(100% - 5rem);
  }
`;

const PostHitItemTitle = styled.div<{ isActive: boolean }>`
  width: 100%;
  font-size: 0.9rem;
  font-weight: ${({ isActive }) => (isActive ? "700" : "500")};
  line-height: 1.5;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-x: hidden;
  overflow-y: hidden;
  cursor: pointer;
  color: ${({ theme, isActive }) => (isActive ? theme.colors.ftBlack : theme.colors.ftGray)};
  &:hover {
    text-decoration: underline;
  }
`;

const PostHitDate = styled.div`
  color: ${({ theme }) => theme.colors.ftLightGray};
  font-size: 0.9rem;
`;

export default memo(PostHitItem);
