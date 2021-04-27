import { IReply } from "interface/IPost";
import React, { memo } from "react";
import styled from "styled-components";
import profileImg from "assets/images/profile.png";
import {
  PostCommentAdminMark,
  PostCommentContent,
  PostCommentEditContent,
  PostCommentEditInput,
  PostCommentEditWrapper,
  PostCommentItemContent,
  PostCommentItemProfile,
  PostCommentItemTime,
  PostCommentItemTitle,
  PostCommentLock,
  PostCommentPrivate,
  PostCommentPrivateTitle,
  PostCommentUtil
} from "../comment/PostCommentItem";
import TimeCounting from "time-counting";
import timeCalc from "lib/timeCalc";
import useReplyEdit from "hooks/post/comment/useReplyEdit";
import { useSelector } from "react-redux";
import { RootState } from "stores/modules";
import { PostCommentSubmitBtn } from "../comment/PostCommentCreate";
import { MdCancel } from "react-icons/md";
import { GoPencil } from "react-icons/go";

interface IPostReplyItemProps {
  item: IReply;
}

const PostReplyItem: React.FC<IPostReplyItemProps> = ({ item }) => {
  const { login, user } = useSelector((state: RootState) => state.user.data);
  const {
    isEdit,
    onClickEdit,
    onCloseEdit,
    onClickDelete,
    value,
    onChangeValue,
    onKeyDownValue,
    onSave
  } = useReplyEdit(item);

  return (
    <PostReplyItemWrapper>
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
              name="comment-edit-content"
            />
            <PostCommentSubmitBtn
              right={"3rem"}
              isActive={true}
              fontSize={"1.2rem"}
              onClick={onCloseEdit}
              aria-label="create-reply-cancel"
            >
              <MdCancel />
            </PostCommentSubmitBtn>
            <PostCommentSubmitBtn
              right={"1rem"}
              fontSize={"1.2rem"}
              onClick={onSave}
              aria-label="submit"
            >
              <GoPencil />
            </PostCommentSubmitBtn>
          </PostCommentEditContent>
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
            {login && (
              <>
                {item.fk_user_idx === user.idx && (
                  <button onClick={onClickEdit} aria-label="reply-edit">
                    수정
                  </button>
                )}
                {(item.fk_user_idx === user.idx || user.is_admin) && (
                  <button onClick={onClickDelete} aria-label="reply-delete">
                    삭제
                  </button>
                )}
              </>
            )}
          </PostCommentUtil>
        </PostCommentItemContent>
      ) : (
        <PostCommentPrivate>
          <PostCommentPrivateTitle>{item.content}</PostCommentPrivateTitle>
        </PostCommentPrivate>
      )}
    </PostReplyItemWrapper>
  );
};

const PostReplyItemWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 0.5rem;
  padding-bottom: 0.5rem;
  position: relative;
`;

export default memo(PostReplyItem);
