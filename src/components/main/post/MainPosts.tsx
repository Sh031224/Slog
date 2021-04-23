import useMainPosts from "hooks/useMainPosts";
import React, { memo } from "react";
import styled from "styled-components";
import PostItem from "./PostItem";
import PostItemLoading from "./PostItemLoading";

const MainPosts: React.FC = () => {
  const { posts, loading, notfound, lastEl } = useMainPosts();

  return (
    <PostsWrapper>
      <PostsContainer>
        {posts.map((item, idx) => (
          <React.Fragment key={item.idx}>
            <PostItem item={item} lastEl={idx === posts.length - 1 ? lastEl : undefined} />
          </React.Fragment>
        ))}
        {loading ? (
          <PostItemLoading />
        ) : (
          notfound && !posts.length && <PostsNotfound>게시글이 없어요. 🤭</PostsNotfound>
        )}
      </PostsContainer>
    </PostsWrapper>
  );
};

const PostsWrapper = styled.div`
  flex: 1 1 0%;
  padding-top: 2rem;
  ${({ theme }) => theme.device.smallDesktop} {
    padding-top: 0;
  }
`;

const PostsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  position: relative;
`;

const PostsNotfound = styled.div`
  display: flex;
  height: 60vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
`;

export default memo(MainPosts);
