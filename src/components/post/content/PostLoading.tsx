import React from "react";
import styled from "styled-components";

const PostLoading: React.FC = () => {
  return (
    <PostLoadingWrapper>
      <PostLoadingTitle />
      <PostLoadingDate />
      <PostLoadingImg />
      <PostLoadingContent width="100%" />
      <PostLoadingContent width="60%" />
    </PostLoadingWrapper>
  );
};

const PostLoadingWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const PostLoadingTitle = styled.div`
  margin-top: 5rem;
  animation: loading 3s infinite ease-in-out;
  width: 100%;
  height: 3.4rem;
  border-radius: 5px;
  ${({ theme }) => theme.device.smallDesktop} {
    margin-top: 1rem;
    height: 3rem;
  }
`;

const PostLoadingDate = styled.div`
  width: 10rem;
  border-radius: 5px;
  margin-top: 1rem;
  animation: loading 3s infinite ease-in-out;
  height: 2rem;
`;

const PostLoadingImg = styled.div`
  width: 100%;
  height: 25rem;
  animation: loading 3s infinite ease-in-out;
  border-radius: 5px;
  margin-top: 5rem;
  ${({ theme }) => theme.device.smallDesktop} {
    height: 20rem;
    margin-top: 3rem;
  }
  ${({ theme }) => theme.device.mobile} {
    height: 18rem;
  }
`;

const PostLoadingContent = styled.div<{ width: string }>`
  margin-top: 1rem;
  height: 3.4rem;
  border-radius: 5px;
  width: ${({ width }) => width};
  animation: loading 3s infinite ease-in-out;
  ${({ theme }) => theme.device.smallDesktop} {
    height: 3rem;
  }
`;

export default PostLoading;
