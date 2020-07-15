import { inject, observer } from "mobx-react";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MainPosts from "../../components/Main/MainPosts";
import PostStore from "../../stores/PostStore";

interface MainPostContainerProps {
  store?: StoreType;
}

interface StoreType {
  PostStore: PostStore;
}

const MainPostContainer = ({ store }: MainPostContainerProps) => {
  interface PostParmsType {
    page: number;
    limit: number;
    order?: string;
    category?: number;
  }

  const { search } = useLocation();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const { posts, handlePosts } = store!.PostStore;

  const query: PostParmsType = {
    page: page,
    limit: 20
  };

  const handlePostsCallback = useCallback(async (query: PostParmsType) => {
    await handlePosts(query).catch((error: Error) => {
      return error;
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    const tab = Number(search.replace("?tab=", ""));

    if (tab) {
      query.category = tab;
    } else {
      delete query.category;
    }

    handlePostsCallback(query);
  }, [page, search]);

  return (
    <>
      <MainPosts
        page={page}
        setPage={setPage}
        posts={posts}
        loading={loading}
      />
    </>
  );
};

export default inject("store")(observer(MainPostContainer));
