import { useRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "stores/modules";
import { getCommentsThunk } from "stores/modules/comment";

const useComments = () => {
  const dispatch = useDispatch();

  const { data, error } = useSelector((state: RootState) => state.comment);
  const { post } = useSelector((state: RootState) => state.post.data);
  const { login } = useSelector((state: RootState) => state.user.data);

  const isFirstRender = useRef(true);

  const router = useRouter();
  const { idx } = router.query;

  const getComments = useCallback(() => {
    if (Number(idx)) {
      if (post.idx !== Number(idx) && !error) dispatch(getCommentsThunk(Number(idx)));
    } else {
      router.push("/");
    }
  }, [idx, post, error]);

  useEffect(() => {
    getComments();
  }, [idx]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      dispatch(getCommentsThunk(Number(idx)));
    }
  }, [login]);

  return { comments: data.comments };
};

export default useComments;
