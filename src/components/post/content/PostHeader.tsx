import { memo } from "react";
import styled from "styled-components";

import timeCalc from "lib/timeCalc";
import TimeCounting from "time-counting";
import { FiDelete, FiEdit3, FiMoreHorizontal } from "react-icons/fi";
import usePostHandleBtn from "hooks/post/usePostHandeBtn";

const PostHeader: React.FC = () => {
  const { post, is_admin, isOpenHandle, onClickHandleBtn, onClose, onClickDelete, onClickEdit } =
    usePostHandleBtn();

  return (
    <PostHeaderWrapper>
      <PostHeaderContainer>
        {is_admin && (
          <PostHandle>
            <PostHandleIcon onClick={onClickHandleBtn} />
            {isOpenHandle && (
              <>
                <PostHandleContainer>
                  <button onClick={onClickEdit} aria-label={"post-edit"}>
                    글 수정하기
                    <FiEdit3 />
                  </button>
                  <button onClick={onClickDelete} aria-label={"post-delete"}>
                    글 삭제하기
                    <FiDelete />
                  </button>
                </PostHandleContainer>
              </>
            )}
          </PostHandle>
        )}
        <PostHeaderTitle onClick={onClose}>{post.title}</PostHeaderTitle>
        <PostHeaderTime onClick={onClose}>
          <span title={timeCalc.getTime(post.created_at)}>
            {TimeCounting(post.created_at, { lang: "ko" })}
          </span>
          {timeCalc.checkModify(post.created_at, post.updated_at) && (
            <>
              <span>·</span>
              <span>수정됨</span>
            </>
          )}
        </PostHeaderTime>
      </PostHeaderContainer>
      {post.thumbnail && (
        <PostHeaderThumbnail onClick={onClose} src={post.thumbnail} alt={post.title} />
      )}
    </PostHeaderWrapper>
  );
};

const PostHeaderWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  word-break: break-all;
  align-items: center;
  padding-top: 5rem;
  ${({ theme }) => theme.device.smallDesktop} {
    padding-top: 1rem;
  }
`;

const PostHeaderContainer = styled.div`
  width: 100%;
`;

const PostHandle = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
`;

const PostHandleIcon = styled(FiMoreHorizontal)`
  cursor: pointer;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.ftLightGray};
`;

const PostHandleContainer = styled.div`
  position: absolute;
  display: flex;
  bottom: -5rem;
  flex-direction: column;
  border: ${({ theme }) => theme.colors.bdLightGray} 1px solid;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.bgWhite};
  color: ${({ theme }) => theme.colors.ftDarkGray};
  z-index: 10;
  & > button {
    border: none;
    background-color: transparent;
    padding: 0.5rem;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    svg {
      margin-left: 0.5rem;
    }
  }
`;

const PostHeaderTitle = styled.h1`
  width: 100%;
  font-size: 2.7rem;
  font-weight: 700;
  line-height: 1.5;
  margin-bottom: 0.5rem;
  ${({ theme }) => theme.device.smallDesktop} {
    font-size: 2rem;
  }
  ${({ theme }) => theme.device.mobile} {
    font-size: 1.7rem;
  }
`;

const PostHeaderTime = styled.div`
  width: 100%;
  display: inline-block;
  color: ${({ theme }) => theme.colors.ftGray};
  font-size: 1.1rem;
  padding-top: 1rem;
  ${({ theme }) => theme.device.smallDesktop} {
    font-size: 1rem;
  }
  & span:nth-child(1) {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  & span:nth-child(2) {
    margin: 0 0.25rem;
  }
`;

const PostHeaderThumbnail = styled.img`
  margin-top: 5rem;
  max-height: 100vh;
  max-width: 90%;
  width: auto;
  height: auto;
  object-fit: contain;
  ${({ theme }) => theme.device.mobile} {
    max-width: 100%;
  }
`;

export default memo(PostHeader);
