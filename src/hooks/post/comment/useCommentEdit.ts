import { IComment } from "interface/IPost";
import { useCallback, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "stores/modules";
import { deleteCommentThunk } from "stores/modules/comment";

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

  const onKeyDownValue = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        onCloseEdit();
      } else if (e.key === "Enter") {
        // onSubmit();
      }
    },
    [onCloseEdit]
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
    onKeyDownValue
  };
};

export default useCommentEdit;
