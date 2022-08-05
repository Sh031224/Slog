import { useSelector } from "react-redux";
import type { RootState } from "stores/modules";
import styled from "styled-components";
import PostHitItem from "./PostHitItem";

const PostHit: React.FC = () => {
  const { hitPosts } = useSelector((state: RootState) => state.post.data);

  return (
    <PostHitWrapper>
      <PostHitContainer>
        <PostHitTitle>이 블로그의 인기 글</PostHitTitle>
        {hitPosts.map((item, idx) => (
          <PostHitItem key={idx} item={item} />
        ))}
      </PostHitContainer>
    </PostHitWrapper>
  );
};

const PostHitWrapper = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 0 0.25rem;
`;

const PostHitContainer = styled.div`
  border: ${({ theme }) => theme.colors.bdDarkWhite} 1px solid;
  border-radius: 5px;
  padding: 1rem;
`;

const PostHitTitle = styled.h3`
  width: 100%;
  padding-bottom: 0.5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.ftDarkGray};
  margin: 0;
`;

export default PostHit;
