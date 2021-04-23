import React from "react";
import MainTemplate from "components/common/template/MainTemplate";
import { NextPage } from "next";
import Main from "components/main/Main";
import Head from "next/head";
import { getCategoriesPromise, getPostsPromise, getUserInfoPromise } from "lib/promiseDispatch";

const IndexPage: NextPage = () => {
  return (
    <MainTemplate>
      <Head>
        <title>{"Slog"}</title>
        <meta
          name="description"
          content="많은 사람들에게 유용한 정보를 제공하기 위해 제작한 Slog입니다."
        />
        <meta property="og:title" content="Slog" />
        <meta property="og:url" content="https://slog.website" />
        <meta
          property="og:description"
          content="많은 사람들에게 유용한 정보를 제공하기 위해 제작한 Slog입니다."
        />
        <meta property="og:url" content="https://slog.website/" />
        <meta property="og:image" content="https://slog.website/api/static/op_logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Slog" />
        <meta
          name="twitter:description"
          content="많은 사람들에게 유용한 정보를 제공하기 위해 제작한 Slog입니다."
        />
        <meta name="twitter:image" content="https://slog.website/api/static/op_logo.png" />
      </Head>
      <Main />
    </MainTemplate>
  );
};

IndexPage.getInitialProps = async (ctx) => {
  const isServer = typeof window === "undefined";

  if (isServer) {
    await Promise.all([getPostsPromise(ctx), getUserInfoPromise(ctx), getCategoriesPromise(ctx)]);
  }
};

export default IndexPage;
