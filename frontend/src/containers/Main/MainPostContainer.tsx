import { inject, observer } from "mobx-react";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import MainPosts from "../../components/Main/MainPosts";

interface MainPostContainerProps {
  categoryList: CategoryType[];
  posts: PostType[];
  handlePosts: (query: PostParmsType) => Promise<unknown>;
  initPosts: () => void;
}

interface PostType {
  idx: number;
  title: string;
  view: number;
  comment_count: number;
  thumbnail?: string;
  description?: string;
  created_at: Date;
}

interface CategoryType {
  idx: number;
  name: string;
  post_count: number;
}

interface PostParmsType {
  page: number;
  limit: number;
  order?: string;
  category?: number;
}

const MainPostContainer = ({
  posts,
  handlePosts,
  initPosts,
  categoryList
}: MainPostContainerProps) => {
  interface PostParmsType {
    page: number;
    limit: number;
    order?: string;
    category?: number;
  }

  const { search } = useLocation();
  const history = useHistory();

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [notfound, setNotfound] = useState(true);

  let total = 0;

  const query: PostParmsType = {
    page: page,
    limit: 20
  };

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
        if (total > posts.length) {
          setPage(page + 1);
        }
      }
    }
  };

  const handlePostsCallback = useCallback(
    async (query: PostParmsType) => {
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
    },
    [categoryList]
  );

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
    return () => window.removeEventListener("scroll", infiniteScroll);
  }, []);

  useEffect(() => {
    initPosts();
    setPage(1);
  }, [search]);

  useEffect(() => {
    setLoading(true);
    const tab = Number(search.replace("?tab=", ""));

    if (tab) {
      query.category = tab;
    } else {
      delete query.category;
    }
    handlePostsCallback(query).catch((error: Error) => console.log(error));
  }, [page, search]);

  return (
    <>
      <MainPosts
        page={page}
        setPage={setPage}
        posts={posts}
        loading={loading}
        notfound={notfound}
      />
    </>
  );
};

export default MainPostContainer;
