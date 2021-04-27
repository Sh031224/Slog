import { IComment } from "interface/IPost";
import React, { memo } from "react";
import profileImg from "assets/images/profile.png";
import styled from "styled-components";
import TimeCounting from "time-counting";
import timeCalc from "lib/timeCalc";
import { IoIosLock, IoMdCheckmarkCircleOutline } from "react-icons/io";
import PostReplyItem from "../reply/PostReplyItem";
import useCommentEdit from "hooks/post/comment/useCommentEdit";
import PostCommentCreate, { PostCommentSubmitBtn } from "./PostCommentCreate";
import { useSelector } from "react-redux";
import { RootState } from "stores/modules";
import { MdCancel } from "react-icons/md";
import { GoPencil } from "react-icons/go";

interface IPostCommentItemProps {
  item: IComment;
}

const PostCommentItem: React.FC<IPostCommentItemProps> = ({ item }) => {
  const { login, user } = useSelector((state: RootState) => state.user.data);
  const {
    isEdit,
    onClickEdit,
    onCloseEdit,
    isCreate,
    onClickCreate,
    onCloseCreate,
    onClickDelete,
    value,
    onChangeValue,
    onKeyDownValue,
    onSave
  } = useCommentEdit(item);

  return (
    <PostCommentItemWrapper>
      <PostCommentItemProfile src={profileImg} alt={item.fk_user_name || "비밀 댓글"} />
      {isEdit ? (
        <PostCommentEditWrapper>
          <PostCommentEditContent>
            <PostCommentEditInput
              type="text"
              maxLength={255}
              autoFocus
              placeholder="내용을 입력해주세요."
              value={value}
              onChange={onChangeValue}
              onKeyDown={onKeyDownValue}
              name="edit-content"
            />
            <PostCommentSubmitBtn
              right={"3rem"}
              isActive={true}
              fontSize={"1.2rem"}
              onClick={onCloseEdit}
              aria-label={"cancel"}
            >
              <MdCancel />
            </PostCommentSubmitBtn>
            <PostCommentSubmitBtn
              right={"1rem"}
              fontSize={"1.2rem"}
              onClick={onSave}
              aria-label={"submit"}
            >
              <GoPencil />
            </PostCommentSubmitBtn>
          </PostCommentEditContent>
          {item.replies &&
            item.replies.map((reply, idx) => <PostReplyItem item={reply} key={idx} />)}
        </PostCommentEditWrapper>
      ) : item.fk_user_name ? (
        <PostCommentItemContent>
          <PostCommentItemTitle>
            {item.fk_user_name}
            {item.fk_user_is_admin && <PostCommentAdminMark />}
            {item.is_private && <PostCommentLock />}
            <PostCommentItemTime>
              {TimeCounting(item.created_at, { lang: "ko" })}
            </PostCommentItemTime>
            {timeCalc.checkModify(item.created_at, item.updated_at) && (
              <PostCommentItemTime>{"(수정됨)"}</PostCommentItemTime>
            )}
          </PostCommentItemTitle>
          <PostCommentContent>{item.content}</PostCommentContent>
          <PostCommentUtil>
            <button onClick={onClickCreate} aria-label={"create-reply"}>
              답글
            </button>
            {login && (
              <>
                {item.fk_user_idx === user.idx && (
                  <button onClick={onClickEdit} aria-label={"edit"}>
                    수정
                  </button>
                )}
                {(item.fk_user_idx === user.idx || user.is_admin) && (
                  <button onClick={onClickDelete} aria-label={"delete"}>
                    삭제
                  </button>
                )}
              </>
            )}
          </PostCommentUtil>
          {isCreate && <PostCommentCreate comment={item} onClose={onCloseCreate} />}
          {item.replies &&
            item.replies.map((reply, idx) => <PostReplyItem item={reply} key={idx} />)}
        </PostCommentItemContent>
      ) : (
        <PostCommentPrivate>
          <PostCommentPrivateTitle>{item.content}</PostCommentPrivateTitle>
          {item.replies &&
            item.replies.map((reply, idx) => <PostReplyItem item={reply} key={idx} />)}
        </PostCommentPrivate>
      )}
    </PostCommentItemWrapper>
  );
};

const PostCommentItemWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1.2rem;
  padding-bottom: 0.8rem;
  border-bottom: ${({ theme }) => theme.colors.bdSoLightGray} 1px solid;
`;

export const PostCommentItemProfile = styled.img`
  width: 2.8rem;
  height: 2.8rem;
`;

export const PostCommentEditWrapper = styled.div`
  padding-left: 0.8rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const PostCommentEditContent = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;
`;

export const PostCommentEditInput = styled.input`
  color: ${({ theme }) => theme.colors.ftBlack};
  background-color: ${({ theme }) => theme.colors.bgLightGray};
  border-radius: 10px;
  border: none;
  outline: none;
  width: 100%;
  height: 2.5rem;
  padding: 1rem;
  padding-right: 6rem;
  font-size: 1rem;
  &:focus {
    outline: none;
  }
`;

export const PostCommentItemContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 0.8rem;
  flex-grow: 1;
`;

export const PostCommentItemTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  word-break: break-all;
  font-weight: 600;
`;

export const PostCommentItemTime = styled.span`
  display: inline-block;
  opacity: 0.7;
  margin-left: 0.8rem;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.ftBlack};
  font-weight: 500;
`;

export const PostCommentPrivate = styled.div`
  padding-left: 0.8rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-top: 0.7rem;
`;

export const PostCommentPrivateTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  padding-bottom: 0.7rem;
  opacity: 0.7;
`;

export const PostCommentAdminMark = styled(IoMdCheckmarkCircleOutline)`
  color: ${({ theme }) => theme.colors.ftGreen};
  margin-left: 0.5rem;
`;

export const PostCommentLock = styled(IoIosLock)`
  margin-left: 0.5rem;
  opacity: 0.6;
`;

export const PostCommentContent = styled.div`
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
  word-break: break-word;
  hyphens: auto;
  font-size: 0.8rem;
`;

export const PostCommentUtil = styled.div`
  padding-top: 0.8rem;
  margin-bottom: 0.5rem;
  button {
    cursor: pointer;
    border: none;
    background-color: transparent;
    opacity: 0.8;
    color: ${({ theme }) => theme.colors.ftBlack};
    font-size: 0.7rem;
    padding: 0;
    margin-right: 0.5rem;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default memo(PostCommentItem);
