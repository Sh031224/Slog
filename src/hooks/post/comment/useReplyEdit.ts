/* eslint-disable react-hooks/exhaustive-deps */
import { Reply } from "types/post";
import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "stores/modules";
import { deleteReplyThunk, modifyReplyThunk } from "stores/modules/comment";

const useReplyEdit = (reply: Reply) => {
  const dispatch = useDispatch();

  const {
    post: { idx }
  } = useSelector((state: RootState) => state.post.data);

  const [value, setValue] = useState<string>(reply.content);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const onClickEdit = () => {
    setIsEdit(true);
  };

  const onCloseEdit = () => {
    setIsEdit(false);
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
      dispatch(modifyReplyThunk(reply.idx, value, idx, init));
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
          onClick: () => dispatch(deleteReplyThunk(reply.idx, idx))
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
    onClickDelete,
    value,
    onChangeValue,
    onKeyDownValue,
    onSave
  };
};

export default useReplyEdit;
