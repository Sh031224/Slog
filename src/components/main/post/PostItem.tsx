/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";
import { memo } from "react";
import styled from "styled-components";
import TimeCounting from "time-counting";
import { AiOutlineEye } from "react-icons/ai";
import { GoCommentDiscussion } from "react-icons/go";

import type { Post } from "types/post";
import timeCalc from "lib/timeCalc";
import numberConverter from "lib/numberConverter";

type Props = {
  item: Post;
  lastEl?: (node?: Element) => void;
};

const PostItem: React.FC<Props> = ({ item, lastEl }) => {
  return (
    <PostItemWrapper ref={lastEl}>
      {item.thumbnail && (
        <Link href={`/post/[idx]`} as={`/post/${item.idx}`}>
          <a>
            <PostThumbnail>
              <PostThumbnailImg src={item.thumbnail} alt={item.title} />
            </PostThumbnail>
          </a>
        </Link>
      )}
      <Link href={`/post/[idx]`} as={`/post/${item.idx}`}>
        <a style={{ display: "flex", height: "100%" }}>
          <PostContent>
            <PostContentTitle>
              {item.title}
              <PostContentDescription hasThumbnail={item.thumbnail !== null}>
                {item.description}
              </PostContentDescription>
            </PostContentTitle>
            <PostContentSubinfo title={timeCalc.getTime(item.created_at)}>
              {TimeCounting(item.created_at, { lang: "ko" })}
            </PostContentSubinfo>
          </PostContent>
        </a>
      </Link>
      <PostItemInfo>
        <PostItemInfoContainer>
          <AiOutlineEye />
          <PostItemInfoCount>{numberConverter(item.view)}</PostItemInfoCount>
          <GoCommentDiscussion />
          <PostItemInfoCount>{numberConverter(item.comment_count)}</PostItemInfoCount>
        </PostItemInfoContainer>
      </PostItemInfo>
    </PostItemWrapper>
  );
};

const PostItemWrapper = styled.div`
  width: 19rem;
  box-shadow: ${({ theme }) => theme.colors.sdBlack} 0px 2px 10px 0px;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.bgWhite};
  border-radius: 5px;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  margin: 1rem;
  overflow: hidden;
  position: relative;
  border-radius: 5px;
  ${({ theme }) => theme.device.desktop} {
    width: calc(50% - 2rem);
  }
  ${({ theme }) => theme.device.tablet} {
    width: 100%;
  }
`;

const PostThumbnail = styled.div`
  position: relative;
  padding-top: 52%;
  cursor: pointer;
`;

const PostThumbnailImg = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
  position: relative;
  height: 100%;
  cursor: pointer;
`;

const PostContentTitle = styled.h4`
  margin: 0;
  width: 100%;
  color: ${({ theme }) => theme.colors.ftBlack};
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ theme }) => theme.device.tablet} {
    white-space: initial;
  }
`;

const PostContentDescription = styled.div<{ hasThumbnail: boolean }>`
  color: ${({ theme }) => theme.colors.ftGray};
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 1.5;
  text-overflow: ellipsis;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: ${({ hasThumbnail }) => (hasThumbnail ? "1rem" : "2rem")};
  margin-top: ${({ hasThumbnail }) => (hasThumbnail ? "0.3rem" : "0rem")};
`;

const PostContentSubinfo = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors.ftLightGray};
  font-size: 0.8rem;
  line-height: 1.5;
`;

const PostItemInfo = styled.div`
  border-top: ${({ theme }) => theme.colors.bdDarkWhite} 1px solid;
  padding: 0rem 1rem;
`;

const PostItemInfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0.3rem 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.ftGray};
`;

const PostItemInfoCount = styled.span`
  margin-right: 1rem;
  margin-left: 0.2rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.ftLittleGray};
`;

export default memo(PostItem);
