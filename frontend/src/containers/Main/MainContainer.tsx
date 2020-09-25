import { inject, observer } from "mobx-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Main from "../../components/Main";
import CategoryStore from "../../stores/CategoryStore";
import PostStore from "../../stores/PostStore";
import UserStore from "../../stores/UserStore";
import AdminCategoryContainer from "../Admin/AdminCategoryContainer";
// import { userouter, useLocation } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { useRouter } from "next/router";
// import { Helmet } from "react-helmet-async";

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

  // let search = "";
  const router = useRouter();
  const { asPath } = router;

  const [categoryEdit, setCategoryEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [notfound, setNotfound] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  const arrowToggleEl = useRef<HTMLElement>(null);
  const categoryRowEl = useRef<HTMLElement>(null);
  const lastCardEl = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    if (asPath.indexOf("temp") !== 1 && asPath.indexOf("search=") === -1) {
      handlePostsCallback().catch(() => {
        NotificationManager.error("오류가 발생하였습니다.", "Error");
      });
    }
  }, [page]);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries, observer) => {
        const lastCard = entries[0];

        if (
          asPath.indexOf("search=") === -1 &&
          !loading &&
          getPostLength() < total
        ) {
          if (lastCard.intersectionRatio > 0 && lastCardEl.current) {
            observer.unobserve(lastCard.target);
            lastCardEl.current = null;
            setTimeout(() => {
              setPage(page + 1);
            }, 100);
          }
        }
      }
    );

    if (lastCardEl.current) {
      intersectionObserver.observe(lastCardEl.current);
    }
  }, []);

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
      .catch((error: Error) => {
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
        }
      })
      .catch((error: Error) => {
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
      .catch((error: Error) => {
        console.log(error);
      });
  }, []);

  const handleQueryCallbacks = useCallback(() => {
    initPosts();
    setNotfound(true);
    if (asPath.indexOf("tab=") !== -1 || asPath === "/") {
      if (page === 1) {
        handlePostsCallback().catch(() => {
          NotificationManager.error("오류가 발생하였습니다.", "Error");
        });
      } else {
        setPage(1);
      }
    } else if (asPath.indexOf("temp") !== -1) {
      handleTempPostsCallback();
    } else if (asPath.indexOf("?search=") === -1) {
      router.push("/");
    } else {
      handlePostSearchCallback().catch(() => {
        NotificationManager.error("오류가 발생하였습니다.", "Error");
      });
    }
  }, [asPath, page]);

  useEffect(() => {
    handleQueryCallbacks();
  }, [asPath]);

  return (
    <React.Fragment>
      {/* <Helmet>
        <title>{"Slog"}</title>
        <meta
          name="description"
          content="많은 사람들에게 유용한 정보를 제공하기 위해 제작한 Slog입니다."
          data-react-helmet="true"
        />
        <meta name="og:title" content="Slog" data-react-helmet="true" />
        <meta
          property="og:description"
          content="많은 사람들에게 유용한 정보를 제공하기 위해 제작한 Slog입니다."
          data-react-helmet="true"
        />
        <meta
          property="og:url"
          content="https://slog.website/"
          data-react-helmet="true"
        />
        <meta
          property="og:image"
          content="https://data.slog.website/public/op_logo.png"
          data-react-helmet="true"
        />
        <meta name="twitter:title" content="Slog" data-react-helmet="true" />
        <meta
          property="twitter:description"
          content="많은 사람들에게 유용한 정보를 제공하기 위해 제작한 Slog입니다."
          data-react-helmet="true"
        />
        <meta
          property="twitter:image"
          content="https://data.slog.website/public/op_logo.png"
          data-react-helmet="true"
        />
      </Helmet> */}
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
