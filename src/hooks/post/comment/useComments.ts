import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "stores/modules";
import { getCommentsThunk } from "stores/modules/comment";

const useComments = () => {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state: RootState) => state.comment);
  const { post } = useSelector((state: RootState) => state.post.data);

  const router = useRouter();
  const { idx } = router.query;

  const getComments = useCallback(() => {
    if (Number(idx)) {
      if (post.idx !== Number(idx)) dispatch(getCommentsThunk(Number(idx)));
    } else {
      router.push("/");
    }
  }, [idx, post]);

  useEffect(() => {
    getComments();
  }, [idx]);

  return { comments: data.comments };
};

export default useComments;
