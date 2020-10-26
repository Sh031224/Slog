import { inject, observer } from "mobx-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import CategoryStore from "../../stores/CategoryStore";
import PostStore from "../../stores/PostStore";
import UserStore from "../../stores/UserStore";
import AdminCategoryContainer from "../Admin/AdminCategoryContainer";
import { NotificationManager } from "react-notifications";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";
import Head from "next/head";
import dynamic from "next/dynamic";

const Main = dynamic(() => import("components/Main"));

interface MainContainerProps {
  store?: StoreType;
}

interface StoreType {
  CategoryStore: CategoryStore;
  UserStore: UserStore;
  PostStore: PostStore;
}

const MainContainer = ({ store }: MainContainerProps) => {
  const {
    totalPost,
    categoryList,
    handleCategoryList,
    modifyOrderCategory,
    modifyCategoryName,
    deleteCategory,
    createCategory
  } = store!.CategoryStore;
  const { admin } = store!.UserStore;
  const {
    posts,
    handlePosts,
    initPosts,
    getPostLength,
    handlePostSearch,
    handleTempPosts
  } = store!.PostStore;

  interface PostParmsType {
    page: number;
    limit: number;
    order?: string;
    category?: number;
  }

  const router = useRouter();
  const { asPath } = router;

  const [categoryEdit, setCategoryEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [notfound, setNotfound] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  const arrowToggleEl = useRef<HTMLElement>(null);
  const categoryRowEl = useRef<HTMLElement>(null);

  const [lastCardEl, inView] = useInView();

  const handleCategoryListCallback = useCallback(() => {
    if (categoryList.length === 0) {
      handleCategoryList().catch(() =>
        NotificationManager.error("오류가 발생하였습니다.", "Error")
      );
    }
  }, []);

  useEffect(() => {
    handleCategoryListCallback();
  }, [handleCategoryListCallback]);

  const handlePostSearchCallback = useCallback(async () => {
    setLoading(true);
    setNotfound(true);
    const query = asPath.replace("/?search=", "");

    await handlePostSearch(query)
      .then((res: any) => {
        setLoading(false);
        if (res.data.posts.length > 0) {
          setNotfound(false);
        }
      })
      .catch(() => {
        router.push("/");
      });
  }, [asPath]);

  const handlePostsCallback = useCallback(async () => {
    setLoading(true);
    const query: PostParmsType = {
      page: page,
      limit: 20
    };
    const tab = Number(asPath.replace("/?tab=", ""));
    if (tab) {
      query.category = tab;
    } else {
      delete query.category;
    }
    await handlePosts(query)
      .then((res: any) => {
        setTotal(res.data.total);
        setLoading(false);
        if (res.data.posts.length > 0) {
          setNotfound(false);
        } else {
          setNotfound(true);
        }
      })
      .catch(() => {
        router.push("/");
      });
  }, [asPath, page]);

  const createPost = () => {
    router.push("/handle/new");
  };

  const handleTempPostsCallback = useCallback(async () => {
    setLoading(true);
    await handleTempPosts()
      .then(() => {
        setLoading(false);
        if (getPostLength() > 0) {
          setNotfound(false);
        }
      })
      .catch(() => {
        router.push("/");
      });
  }, []);

  const handleQueryCallbacks = useCallback(() => {
    if (page === 1) {
      initPosts();
    }
    if (asPath.indexOf("?temp") !== -1) {
      handleTempPostsCallback();
    } else if (asPath.indexOf("tab=") !== -1 || asPath === "/") {
      handlePostsCallback().catch(() => {
        NotificationManager.error("오류가 발생하였습니다.", "Error");
      });
    } else if (asPath.indexOf("?search=") === -1) {
      router.push("/");
      handlePostsCallback().catch(() => {
        NotificationManager.error("오류가 발생하였습니다.", "Error");
      });
    } else {
      handlePostSearchCallback().catch(() => {
        NotificationManager.error("오류가 발생하였습니다.", "Error");
      });
    }
    console.log(1);
  }, [page, asPath]);

  const handleCategoryPostCallback = useCallback(() => {
    if (page === 1) {
      handleQueryCallbacks();
    } else {
      initPosts();
      setPage(1);
    }
  }, [asPath, page, handleQueryCallbacks]);

  useEffect(() => {
    if (
      inView &&
      !loading &&
      asPath.indexOf("search=") === -1 &&
      getPostLength() < total
    ) {
      console.log(page);
      setLoading(true);
      setPage((prevState) => prevState + 1);
    }
  }, [inView, asPath, total, page, loading, lastCardEl]);

  useEffect(() => {
    handleCategoryPostCallback();
    console.log(asPath);
  }, [asPath]);

  useEffect(() => {
    handleQueryCallbacks();
  }, [page]);

  return (
    <React.Fragment>
      <Head>
        <title>{"Slog"}</title>
        <meta
          name="description"
          content="많은 사람들에게 유용한 정보를 제공하기 위해 제작한 Slog입니다."
        />
        <meta name="og:title" content="Slog" />
        <meta
          property="og:description"
          content="많은 사람들에게 유용한 정보를 제공하기 위해 제작한 Slog입니다."
        />
        <meta property="og:url" content="https://slog.website/" />
        <meta
          property="og:image"
          content="https://data.slog.website/public/op_logo.png"
        />
        <meta name="twitter:title" content="Slog" />
        <meta
          property="twitter:description"
          content="많은 사람들에게 유용한 정보를 제공하기 위해 제작한 Slog입니다."
        />
        <meta
          property="twitter:image"
          content="https://data.slog.website/public/op_logo.png"
        />
      </Head>
      <Main
        createPost={createPost}
        lastCardEl={lastCardEl}
        notfound={notfound}
        loading={loading}
        getPostLength={getPostLength}
        posts={posts}
        categoryRowEl={categoryRowEl}
        arrowToggleEl={arrowToggleEl}
        categoryList={categoryList}
        totalPost={totalPost}
        setCategoryEdit={setCategoryEdit}
        admin={admin}
      />
      {admin && categoryEdit && (
        <AdminCategoryContainer
          createCategory={createCategory}
          deleteCategory={deleteCategory}
          modifyCategoryName={modifyCategoryName}
          modifyOrderCategory={modifyOrderCategory}
          setCategoryEdit={setCategoryEdit}
          categoryList={categoryList}
          handleCategoryList={handleCategoryList}
          handlePosts={handlePosts}
        />
      )}
    </React.Fragment>
  );
};

export default inject("store")(observer(MainContainer));
