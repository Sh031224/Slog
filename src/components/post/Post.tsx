import usePostInfo from "hooks/post/usePostInfo";
import React from "react";
import styled from "styled-components";
import Markdown from "../common/markdown/Markdown";
import PostComment from "./comment/PostComment";
import PostHeader from "./content/PostHeader";
import PostLoading from "./content/PostLoading";
import PostHit from "./hit/PostHit";

const Post: React.FC = () => {
  const { data, loading } = usePostInfo();
  const { post } = data;

  return (
    <PostWrapper>
      <PostContainer>
        {loading ? (
          <PostLoading />
        ) : (
          <>
            <PostHeader />
            <PostContentContainer>
              <Markdown content={post.content} />
            </PostContentContainer>
            <PostHit />
            <PostComment />
          </>
        )}
      </PostContainer>
    </PostWrapper>
  );
};

const PostWrapper = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const PostContainer = styled.div`
  max-width: 900px;
  position: relative;
  width: 100%;
  padding: 0 1rem;
`;

const PostContentContainer = styled.section`
  margin: 3rem 0;
`;

export default Post;
