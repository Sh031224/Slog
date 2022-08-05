/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch, useSelector } from "react-redux";
import { Comment } from "types/post";
import type { RootState } from "stores/modules";
import { deleteCommentThunk, modifyCommentThunk } from "stores/modules/comment";

const useCommentEdit = (comment: Comment) => {
  const dispatch = useDispatch();

  const {
    post: { idx }
  } = useSelector((state: RootState) => state.post.data);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [value, setValue] = useState<string>(comment.content);

  const onClickEdit = () => {
    setIsEdit(true);
  };

  const onCloseEdit = () => {
    setIsEdit(false);
  };

  const onClickCreate = () => {
    setIsCreate(true);
  };

  const onCloseCreate = () => {
    setIsCreate(false);
  };

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const init = () => {
    setValue("");
    setIsEdit(false);
  };

  const onSave = () => {
    if (value.replace(/\s/gi, "") !== "") {
      dispatch(modifyCommentThunk(comment.idx, value, idx, init));
    }
  };

  const onKeyDownValue = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      onCloseEdit();
    } else if (e.key === "Enter") {
      onSave();
    }
  };

  const onClickDelete = () => {
    confirmAlert({
      title: "Warning",
      message: "정말로 삭제하시겠습니까?",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(deleteCommentThunk(comment.idx, idx))
        },
        {
          label: "No",
          onClick: () => {
            return;
          }
        }
      ]
    });
  };

  return {
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
  };
};

export default useCommentEdit;
