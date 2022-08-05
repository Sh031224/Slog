/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "stores/modules";
import { clearPostError, getHitPostsThunk, getPostInfoThunk } from "stores/modules/post";
import { NotificationManager } from "react-notifications";
import { getCommentsThunk } from "stores/modules/comment";

const usePostInfo = () => {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state: RootState) => state.post);

  const router = useRouter();
  const { idx } = router.query;

  const getPostInfo = () => {
    if (Number(idx)) {
      if (data.post.idx !== Number(idx)) {
        dispatch(getPostInfoThunk(Number(idx)));
        dispatch(getCommentsThunk(Number(idx)));
      }
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    if (!data.hitPosts.length) {
      dispatch(getHitPostsThunk());
    }
  }, [idx]);

  useEffect(() => {
    getPostInfo();
  }, [idx]);

  useEffect(() => {
    if (error && error.response) {
      if (error.response.status === 404) {
        router.push("/");
        NotificationManager.error("해당 게시글이 없습니다.", "Error");
      } else if (error.response.status === 403 || error.response.status === 401) {
        router.push("/");
        NotificationManager.error("권한이 없습니다.", "Error");
      } else {
        router.push("/");
        NotificationManager.error("오류가 발생하였습니다.", "Error");
      }
      dispatch(clearPostError());
    }
  }, [error]);

  return { data, loading };
};

export default usePostInfo;
