import useComments from "hooks/post/comment/useComments";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "stores/modules";
import styled from "styled-components";
import PostCommentCreate from "./PostCommentCreate";
import PostCommentItem from "./PostCommentItem";

const PostComment: React.FC = () => {
  const { comment_count } = useSelector((state: RootState) => state.post.data.post);
  const { comments } = useComments();

  return (
    <PostCommentWrapper>
      <PostCommentContent>
        댓글 <strong>{comment_count}</strong>
      </PostCommentContent>
      <PostCommentCreate />
      {comments.map((item, idx) => (
        <PostCommentItem key={idx} item={item} />
      ))}
    </PostCommentWrapper>
  );
};

const PostCommentWrapper = styled.section`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
`;

const PostCommentContent = styled.div`
  color: ${({ theme }) => theme.colors.ftGray};
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  & > strong {
    color: ${({ theme }) => theme.colors.ftBlue};
  }
`;

export default memo(PostComment);
