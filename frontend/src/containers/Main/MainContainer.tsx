import { inject, observer } from "mobx-react";
import React, { useEffect, useRef, useState } from "react";
import Main from "../../components/Main";
import CategoryStore from "../../stores/CategoryStore";
import PostStore from "../../stores/PostStore";
import UserStore from "../../stores/UserStore";
import AdminCategoryContainer from "../Admin/AdminCategoryContainer";
import { Helmet } from "react-helmet-async";

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
  const { posts, handlePosts, initPosts } = store!.PostStore;

  const [categoryEdit, setCategoryEdit] = useState(false);

  const arrowToggleEl = useRef<HTMLElement>(null);
  const categoryRowEl = useRef<HTMLElement>(null);

  useEffect(() => {
    handleCategoryList();
  }, []);

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
          { property: "og:image", content: "http://example.com/article.jpg" },
          { property: "og:url", content: "http://example.com/example" }
        ]}
      />
      <Main
        initPosts={initPosts}
        handlePosts={handlePosts}
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
