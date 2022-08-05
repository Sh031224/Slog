/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "stores/modules";
import { clearCommentError, createCommentThunk, createReplyThunk } from "stores/modules/comment";
import { NotificationManager } from "react-notifications";
import { useRouter } from "next/router";
import { logout } from "stores/modules/user";
import { removeToken } from "lib/token";
import { Comment } from "types/post";

const useCreateComment = (comment?: Comment, onClose?: () => void) => {
  const dispatch = useDispatch();

  const {
    data: {
      post: { idx }
    }
  } = useSelector((state: RootState) => state.post);
  const { error } = useSelector((state: RootState) => state.comment);

  const [value, setValue] = useState<string>("");
  const [isPrivate, setIsPrivate] = useState<boolean>((comment && comment.is_private) || false);

  const router = useRouter();

  const init = () => {
    setIsPrivate(false);
    setValue("");
    if (onClose) {
      onClose();
    }
  };

  const onSubmit = () => {
    if (value.replace(/\s/gi, "") !== "")
      if (comment !== undefined) {
        dispatch(
          createReplyThunk(
            { comment_idx: comment.idx, content: value, is_private: isPrivate },
            init,
            idx
          )
        );
      } else {
        dispatch(
          createCommentThunk({ post_idx: idx, is_private: isPrivate, content: value }, init)
        );
      }
  };

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onClickPrivate = () => {
    if (comment && comment.is_private) {
      setIsPrivate(true);
    } else {
      setIsPrivate((prev) => !prev);
    }
  };

  const onKeyPressValue = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      if (onClose) {
        onClose();
      }
    } else if (e.key === "Enter") {
      onSubmit();
    }
  };

  useEffect(() => {
    if (error && error.response) {
      if (error.response.status === 404) {
        NotificationManager.error("해당 댓글/게시글이 없습니다.", "Error");
      } else if (error.response.status === 401) {
        removeToken();
        dispatch(logout());
        NotificationManager.warning("로그인 후 작성가능합니다.", "Warning");
      } else if (error.response.status === 403) {
        NotificationManager.warning("권한이 없습니다.", "Warning");
      } else {
        NotificationManager.error("오류가 발생하였습니다.", "Error");
      }
      dispatch(clearCommentError());
    }
  }, [error, router]);

  return { value, onChangeValue, isPrivate, onClickPrivate, onKeyPressValue, onSubmit };
};

export default useCreateComment;
