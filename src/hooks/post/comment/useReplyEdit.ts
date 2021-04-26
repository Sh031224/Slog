import { useCallback, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "stores/modules";
import { deleteReplyThunk } from "stores/modules/comment";

const useReplyEdit = (replyIdx: number) => {
  const dispatch = useDispatch();

  const {
    post: { idx }
  } = useSelector((state: RootState) => state.post.data);

  const [value, setValue] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const onClickEdit = useCallback(() => {
    setIsEdit(true);
  }, []);

  const onCloseEdit = useCallback(() => {
    setIsEdit(false);
  }, []);

  const onClickDelete = useCallback(() => {
    confirmAlert({
      title: "Warning",
      message: "정말로 삭제하시겠습니까?",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(deleteReplyThunk(replyIdx, idx))
        },
        {
          label: "No",
          onClick: () => {
            return;
          }
        }
      ]
    });
  }, [replyIdx, idx]);

  return {
    isEdit,
    onClickEdit,
    onCloseEdit,
    onClickDelete
  };
};

export default useReplyEdit;
