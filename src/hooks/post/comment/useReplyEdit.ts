import { IReply } from "interface/IPost";
import { useCallback, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "stores/modules";
import { deleteReplyThunk, modifyReplyThunk } from "stores/modules/comment";

const useReplyEdit = (reply: IReply) => {
  const dispatch = useDispatch();

  const {
    post: { idx }
  } = useSelector((state: RootState) => state.post.data);

  const [value, setValue] = useState<string>(reply.content);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const onClickEdit = useCallback(() => {
    setIsEdit(true);
  }, []);

  const onCloseEdit = useCallback(() => {
    setIsEdit(false);
  }, []);

  const onChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const init = useCallback(() => {
    setValue("");
    setIsEdit(false);
  }, []);

  const onSave = useCallback(() => {
    if (value.replace(/\s/gi, "") !== "") {
      dispatch(modifyReplyThunk(reply.idx, value, idx, init));
    }
  }, [reply, idx, value, init]);

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
  }, [reply, idx]);

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
