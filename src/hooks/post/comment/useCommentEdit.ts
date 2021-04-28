import { IComment } from "interface/IPost";
import { useCallback, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "stores/modules";
import { deleteCommentThunk, modifyCommentThunk } from "stores/modules/comment";

const useCommentEdit = (comment: IComment) => {
  const dispatch = useDispatch();

  const {
    post: { idx }
  } = useSelector((state: RootState) => state.post.data);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [value, setValue] = useState<string>(comment.content);

  const onClickEdit = useCallback(() => {
    setIsEdit(true);
  }, []);

  const onCloseEdit = useCallback(() => {
    setIsEdit(false);
  }, []);

  const onClickCreate = useCallback(() => {
    setIsCreate(true);
  }, []);

  const onCloseCreate = useCallback(() => {
    setIsCreate(false);
  }, []);

  const onChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const init = useCallback(() => {
    setValue("");
    setIsEdit(false);
    // setIsCreate(false);
  }, []);

  const onSave = useCallback(() => {
    if (value.replace(/\s/gi, "") !== "") {
      dispatch(modifyCommentThunk(comment.idx, value, idx, init));
    }
  }, [comment, idx, value, init]);

  const onKeyDownValue = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        onCloseEdit();
      } else if (e.key === "Enter") {
        onSave();
      }
    },
    [onCloseEdit, onSave]
  );

  const onClickDelete = useCallback(() => {
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
  }, [comment, idx]);

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
