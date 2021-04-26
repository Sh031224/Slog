import useCreateComment from "hooks/post/comment/useCreateComment";
import React from "react";
import styled from "styled-components";
import { FaTelegramPlane } from "react-icons/fa";
import { IoIosLock, IoIosUnlock } from "react-icons/io";
import { MdCancel } from "react-icons/md";

interface IPostCommentCreateProps {
  commentIdx?: number;
  onClose?: () => void;
}

const PostCommentCreate: React.FC<IPostCommentCreateProps> = ({ commentIdx, onClose }) => {
  const {
    value,
    isPrivate,
    onChangeValue,
    onClickPrivate,
    onKeyPressValue,
    onSubmit
  } = useCreateComment(commentIdx, onClose);

  return (
    <PostCommentCreateWrapper isReply={commentIdx !== undefined}>
      <PostCommentCreateInput
        type="text"
        value={value}
        placeholder="내용을 입력해주세요."
        onChange={onChangeValue}
        onKeyDown={onKeyPressValue}
        maxLength={255}
        autoFocus={commentIdx !== undefined}
      />

      {commentIdx && (
        <PostCommentSubmitBtn right={"5rem"} isActive={true} fontSize={"1.1rem"} onClick={onClose}>
          <MdCancel />
        </PostCommentSubmitBtn>
      )}
      <PostCommentSubmitBtn right={"3rem"} isActive={isPrivate} onClick={onClickPrivate}>
        {isPrivate ? <IoIosLock /> : <IoIosUnlock />}
      </PostCommentSubmitBtn>
      <PostCommentSubmitBtn onClick={onSubmit} right={"1rem"}>
        <FaTelegramPlane />
      </PostCommentSubmitBtn>
    </PostCommentCreateWrapper>
  );
};

const PostCommentCreateWrapper = styled.div<{ isReply?: boolean }>`
  font-size: 1rem;
  display: flex;
  position: relative;
  align-items: center;
  ${({ isReply }) => isReply && "margin-top: 0.5rem; margin-bottom: 1rem;"}
`;

const PostCommentCreateInput = styled.input`
  color: ${({ theme }) => theme.colors.ftBlack};
  background-color: ${({ theme }) => theme.colors.bgLightGray};
  border-radius: 10px;
  border: none;
  outline: none;
  width: 100%;
  height: 2.5rem;
  padding: 1rem;
  font-size: 1rem;
  padding-right: 5.5rem;
`;

export const PostCommentSubmitBtn = styled.button<{
  right: string;
  isActive?: boolean;
  fontSize?: string;
}>`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "1.4rem")};
  padding: 0;
  cursor: pointer;
  position: absolute;
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  right: ${({ right }) => right};
  color: ${({ theme, isActive }) =>
    isActive === undefined
      ? theme.colors.ftBlue
      : isActive
      ? theme.colors.ftGray
      : theme.colors.ftLightGray};
`;

export default PostCommentCreate;
