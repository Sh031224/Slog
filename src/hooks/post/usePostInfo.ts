import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "stores/modules";
import { clearPostError, getHitPostsThunk, getPostInfoThunk } from "stores/modules/post";
import { NotificationManager } from "react-notifications";

const usePostInfo = () => {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state: RootState) => state.post);

  const router = useRouter();
  const { idx } = router.query;

  const getPostInfo = useCallback(() => {
    if (Number(idx)) {
      if (data.post.idx !== Number(idx)) dispatch(getPostInfoThunk(Number(idx)));
    } else {
      router.push("/");
    }
  }, [idx, data]);

  useEffect(() => {
    if (!data.hitPosts.length) {
      dispatch(getHitPostsThunk());
    }
  }, [idx]);

  useEffect(() => {
    getPostInfo();
  }, [idx]);

  useEffect(() => {
    if (error) {
      if (error.message && typeof error.message === "string") {
        if (error.message.includes("404")) {
          router.push("/");
          NotificationManager.error("해당 게시글이 없습니다.", "Error");
        } else if (error.message.includes("403")) {
          router.push("/");
          NotificationManager.error("권한이 없습니다.", "Error");
        } else {
          router.push("/");
          NotificationManager.error("오류가 발생하였습니다.", "Error");
        }
        dispatch(clearPostError());
      }
    }
  }, [error]);

  return { data, loading };
};

export default usePostInfo;
