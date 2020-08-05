import { inject, observer } from "mobx-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Main from "../../components/Main";
import CategoryStore from "../../stores/CategoryStore";
import PostStore from "../../stores/PostStore";
import UserStore from "../../stores/UserStore";
import AdminCategoryContainer from "../Admin/AdminCategoryContainer";
import { Helmet } from "react-helmet-async";
import logo from "../../assets/images/logo.png";
import { useHistory, useLocation } from "react-router-dom";
import { NotificationManager } from "react-notifications";

interface MainContainerProps {
  store?: StoreType;
}

interface StoreType {
  CategoryStore: CategoryStore;
  UserStore: UserStore;
  PostStore: PostStore;
}

interface RefObject<T> {
  readonly current: T | null;
}

const MainContainer = ({ store }: MainContainerProps) => {
  const {
    total_post,
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

  const { search } = useLocation();
  const history = useHistory();

  const [categoryEdit, setCategoryEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notfound, setNotfound] = useState(true);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  const arrowToggleEl = useRef<HTMLElement>(null);
  const categoryRowEl = useRef<HTMLElement>(null);
  const lastCardEl = useRef<HTMLDivElement | null>(null);

  const intersectionObserver = new IntersectionObserver((entries, observer) => {
    const lastCard = entries[0];

    if (
      search.indexOf("search=") === -1 &&
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
  });

  useEffect(() => {
    handleCategoryList().catch((err) => {
      if (err.status === 401) {
        NotificationManager.warning("권한이 없습니다.", "Error");
      } else {
        NotificationManager.error("오류가 발생하였습니다.", "Error");
      }
    });
  }, []);

  useEffect(() => {
    if (search.indexOf("temp") !== 1) {
      handlePostsCallback().catch(() => {
        NotificationManager.error("오류가 발생하였습니다.", "Error");
      });
    }
  }, [page]);

  useEffect(() => {
    if (lastCardEl.current) {
      intersectionObserver.observe(lastCardEl.current);
    }
  });

  const handlePostSearchCallback = useCallback(async () => {
    setLoading(true);
    setNotfound(true);
    const query = search.replace("?search=", "");

    await handlePostSearch(query)
      .then((res: any) => {
        setLoading(false);
        if (res.data.posts.length > 0) {
          setNotfound(false);
        }
      })
      .catch((error: Error) => {
        history.push("/");
      });
  }, [search]);

  const handlePostsCallback = useCallback(async () => {
    setLoading(true);
    const query: PostParmsType = {
      page: page,
      limit: 20
    };
    const tab = Number(search.replace("?tab=", ""));
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
        history.push("/");
      });
  }, [search, page]);

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

  useEffect(() => {
    initPosts();
    setNotfound(true);
    if (search.indexOf("tab=") !== -1 || search === "") {
      setPage(1);
      handlePostsCallback().catch(() => {
        NotificationManager.error("오류가 발생하였습니다.", "Error");
      });
    } else if (search.indexOf("temp") !== -1) {
      handleTempPostsCallback();
    } else {
      handlePostSearchCallback().catch(() => {
        NotificationManager.error("오류가 발생하였습니다.", "Error");
      });
    }
  }, [search]);

  return (
    <>
      <Helmet
        title="Slog"
        meta={[
          { property: "og:type", content: "article" },
          {
            property: "og:title",
            content: "포트폴리오를 위한 개인 블로그 입니다."
          },
          { property: "og:image", content: `${logo}` },
          { property: "og:url", content: "http://example.com/example" }
        ]}
      />
      <Main
        lastCardEl={lastCardEl}
        notfound={notfound}
        loading={loading}
        getPostLength={getPostLength}
        posts={posts}
        categoryRowEl={categoryRowEl}
        arrowToggleEl={arrowToggleEl}
        categoryList={categoryList}
        total_post={total_post}
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
    </>
  );
};

export default inject("store")(observer(MainContainer));
