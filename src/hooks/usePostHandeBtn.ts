import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "stores/modules";
import { deletePostThunk } from "stores/modules/post";
import { NotificationManager } from "react-notifications";

const usePostHandleBtn = (idx: number, title: string) => {
  const dispatch = useDispatch();
  const { is_admin } = useSelector((state: RootState) => state.user.data.user);

  const router = useRouter();

  const [isOpenHandle, setIsOpenHandle] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const onClickHandleBtn = useCallback(() => {
    setIsOpenHandle((prev) => !prev);
  }, []);

  const onClose = useCallback(() => {
    setIsOpenHandle(false);
  }, []);

  const onClickEdit = useCallback(() => {
    router.push(`/handle/${idx}`);
  }, [router]);

  const onClickDelete = useCallback(() => {
    confirmAlert({
      title: "Warning",
      message: "정말로 삭제하시겠습니까?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(deletePostThunk(idx));
            setIsDeleted(true);
          }
        },
        {
          label: "No",
          onClick: () => setIsOpenHandle(false)
        }
      ]
    });
  }, [idx]);

  useEffect(() => {
    if (!title && isDeleted) {
      router.push("/");
    }
  }, [title, isDeleted]);

  return { is_admin, isOpenHandle, onClickHandleBtn, onClose, onClickEdit, onClickDelete };
};

export default usePostHandleBtn;
