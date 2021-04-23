import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "stores/modules";
import { NotificationManager } from "react-notifications";
import {
  getPostsThunk,
  getSearchPostsThunk,
  getTempPostsThunk,
  increasePage,
  resetPage
} from "stores/modules/common";
import { limit } from "config/index.json";
import { IPostParmsDTO } from "interface/IPost";

const useMainPosts = () => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state: RootState) => state.common);
  const { page, posts, total, notfound } = useSelector((state: RootState) => state.common.data);

  const router = useRouter();
  const { query, asPath } = router;

  const [lastEl, inView] = useInView({ threshold: 0.5 });

  const isInitialMount = useRef<boolean>(true);
  const isInitialMountPage = useRef<boolean>(true);

  const getTempPosts = useCallback(() => {
    dispatch(getTempPostsThunk());
  }, []);

  // excute only update query
  const getPostsByCategory = useCallback(() => {
    const params: IPostParmsDTO = {
      page: 1,
      limit
    };

    if (query) {
      if (Number(query.tab)) {
        params.category = Number(query.tab);
      } else if (query.temp) {
        return getTempPosts();
      } else if (query.search && typeof query.search === "string") {
        return dispatch(getSearchPostsThunk(query.search));
      } else {
        router.push("/");
      }
    }
    dispatch(resetPage());
    dispatch(getPostsThunk(params));
  }, [query, page, getTempPosts]);

  // excute only update page
  const getPostsByPage = useCallback(() => {
    const params: IPostParmsDTO = {
      page,
      limit
    };

    if (Number(query.tab)) {
      params.category = Number(query.tab);
    } else if (query.temp) {
      return getTempPosts();
    } else {
      router.push("/");
    }

    dispatch(getPostsThunk(params));
  }, [page]);

  const getInitPosts = useCallback(() => {
    if (!error && !posts.length && !notfound) {
      getPostsByCategory();
    } else if (error && error.message.includes("404")) {
      router.push("/");
    }
  }, [error, posts, notfound, getPostsByCategory]);

  useEffect(() => {
    if (inView && !loading && !query.temp && !query.search && posts.length < total) {
      dispatch(increasePage());
    }
  }, [inView, loading, posts, query]);

  useEffect(() => {
    getInitPosts();
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      getPostsByCategory();
    }
  }, [asPath]);

  useEffect(() => {
    if (isInitialMountPage.current) {
      isInitialMountPage.current = false;
    } else {
      getPostsByPage();
    }
  }, [page]);

  useEffect(() => {
    if (error) {
      NotificationManager.error("오류가 발생하였습니다.", "Error");
    }
  }, [error]);

  return { posts, loading, notfound, lastEl };
};

export default useMainPosts;
