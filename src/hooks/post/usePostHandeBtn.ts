/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "stores/modules";
import { deletePostThunk } from "stores/modules/post";

const usePostHandleBtn = () => {
  const dispatch = useDispatch();
  const { is_admin } = useSelector((state: RootState) => state.user.data.user);
  const { post } = useSelector((state: RootState) => state.post.data);

  const router = useRouter();

  const [isOpenHandle, setIsOpenHandle] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const onClickHandleBtn = () => {
    setIsOpenHandle((prev) => !prev);
  };

  const onClose = () => {
    setIsOpenHandle(false);
  };

  const onClickEdit = () => {
    router.push(`/handle/${post.idx}`);
  };

  const onClickDelete = () => {
    confirmAlert({
      title: "Warning",
      message: "정말로 삭제하시겠습니까?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(deletePostThunk(post.idx));
            setIsDeleted(true);
          }
        },
        {
          label: "No",
          onClick: () => setIsOpenHandle(false)
        }
      ]
    });
  };

  useEffect(() => {
    if (!post.title && isDeleted) {
      router.push("/");
    }
  }, [post, isDeleted]);

  return {
    post,
    is_admin,
    isOpenHandle,
    onClickHandleBtn,
    onClose,
    onClickEdit,
    onClickDelete
  };
};

export default usePostHandleBtn;
