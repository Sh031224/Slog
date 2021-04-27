import MainTemplate from "components/common/template/MainTemplate";
import Post from "components/post/Post";
import { getCommentsPromise, getHitPostsPromise, getPostInfoPromise } from "lib/promiseDispatch";
import moment from "moment";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "stores/modules";

const PostPage: NextPage = () => {
  const { loading, data } = useSelector((state: RootState) => state.post);
  const { post } = data;

  return (
    <MainTemplate>
      {!loading && post.title && (
        <Head>
          <title>{post.title}</title>
          <meta name="description" content={post.description} />
          <meta property="og:url" content={`https://slog.website/post/${post.idx}`} />
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={post.description} />
          <meta property="og:site_name" content="Slog" />
          <meta
            property="article:published_time"
            content={moment(post.created_at).format("YYYY-MM-DD")}
          />
          <meta
            property="article:modified_time"
            content={moment(post.updated_at).format("YYYY-MM-DD")}
          />
          <meta
            property="article:author"
            content="https://www.facebook.com/profile.php?id=100048700034135"
          />
          <meta
            property="article:pc_service_home"
            content={`https://slog.website/post/${post.idx}`}
          />
          <meta
            property="article:mobile_service_home"
            content={`https://slog.website/post/${post.idx}`}
          />
          <meta name="by" content="Sh031224" />

          <meta name="twitter:title" content={post.title} />
          <meta name="twitter:description" content={post.description} />
          {post.thumbnail ? (
            <>
              <meta name="twitter:card" content="summary_large_image" />
              <meta property="og:image" content={post.thumbnail || post.thumbnail} />
              <meta name="twitter:image" content={post.thumbnail || post.thumbnail} />
            </>
          ) : (
            <>
              <meta name="twitter:card" content="summary_large_image" />
              <meta property="og:image" content={"https://data.slog.website/public/op_logo.png"} />
              <meta name="twitter:image" content={"https://data.slog.website/public/op_logo.png"} />
            </>
          )}
        </Head>
      )}
      <Post />
    </MainTemplate>
  );
};

PostPage.getInitialProps = async (ctx) => {
  const isServer = typeof window === "undefined";

  if (isServer) {
    await Promise.all([getPostInfoPromise(ctx), getHitPostsPromise(ctx), getCommentsPromise(ctx)]);
  }
};

export default PostPage;
