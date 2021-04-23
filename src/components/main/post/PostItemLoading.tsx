import React from "react";
import styled from "styled-components";

const PostItemLoading: React.FC = () => {
  return (
    <PostLoadingWrapper>
      <PostLoadingThumbnail>
        <PostLoadingThumbnailImg />
      </PostLoadingThumbnail>
      <PostLoadingContent>
        <PostLoadingContentTitles />
        <PostLoadingContentDescription width="80%" />
        <PostLoadingContentDescription width="60%" />
      </PostLoadingContent>
    </PostLoadingWrapper>
  );
};

const PostLoadingWrapper = styled.div`
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
  justify-content: space-between;
  ${({ theme }) => theme.device.desktop} {
    width: calc(50% - 2rem);
  }
  ${({ theme }) => theme.device.tablet} {
    width: 100%;
  }
`;

const PostLoadingThumbnail = styled.div`
  position: relative;
  padding-top: 52%;
`;

const PostLoadingThumbnailImg = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  animation: loading 3s infinite ease-in-out;
`;

const PostLoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
  position: relative;
`;
const PostLoadingContentTitles = styled.div`
  width: 80%;
  height: 1.3rem;
  animation: loading 3s infinite ease-in-out;
  border-radius: 5px;
  margin-bottom: 0.5rem;
`;

const PostLoadingContentDescription = styled.div<{ width: string }>`
  height: 1rem;
  width: 100%;
  margin-top: 0.5rem;
  animation: loading 3s infinite ease-in-out;
  border-radius: 3px;
  width: ${({ width }) => width};
`;

export default PostItemLoading;
