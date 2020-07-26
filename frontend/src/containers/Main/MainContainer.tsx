import { inject, observer } from "mobx-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Main from "../../components/Main";
import CategoryStore from "../../stores/CategoryStore";
import PostStore from "../../stores/PostStore";
import UserStore from "../../stores/UserStore";
import AdminCategoryContainer from "../Admin/AdminCategoryContainer";
import { Helmet } from "react-helmet-async";
import logo from "../../assets/images/logo.svg";
import { useHistory, useLocation } from "react-router-dom";

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
    total_post,
    categoryList,
    handleCategoryList,
    modifyOrderCategory,
    modifyCategoryName,
    deleteCategory,
    createCategory
  } = store!.CategoryStore;
  const { admin } = store!.UserStore;
  const { posts, handlePosts, initPosts, getPostLength } = store!.PostStore;

  const [categoryEdit, setCategoryEdit] = useState(false);

  const arrowToggleEl = useRef<HTMLElement>(null);
  const categoryRowEl = useRef<HTMLElement>(null);

  useEffect(() => {
    handleCategoryList();
  }, []);

  interface PostParmsType {
    page: number;
    limit: number;
    order?: string;
    category?: number;
  }

  const { search } = useLocation();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [notfound, setNotfound] = useState(true);

  const page = useRef(1);
  let total = 0;

  const infiniteScroll = () => {
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    const scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight === scrollHeight) {
      if (total) {
        if (total > getPostLength()) {
          page.current = page.current + 1;
          handlePostsCallback().catch((error: Error) => console.log(error));
        }
      }
    }
  };

  const handlePostsCallback = useCallback(async () => {
    setLoading(true);
    const query: PostParmsType = {
      page: page.current,
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
        total = res.data.total;
        setLoading(false);
        if (res.data.posts.length > 0) {
          setNotfound(false);
        }
      })
      .catch((error: any) => {
        history.push("/");
        return error;
      });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
    return () => window.removeEventListener("scroll", infiniteScroll);
  }, [page]);

  useEffect(() => {
    initPosts();
    page.current = 1;
    handlePostsCallback().catch((error: Error) => console.log(error));
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
