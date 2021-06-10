import Privacy from "components/privacy/Privacy";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";

const PrivacyPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>{"Slog"}</title>
        <meta
          name="description"
          content="Slog는 개발하면서 이슈, 유용한 정보를 공유하기 위해 제작한 개인 블로그입니다."
        />
        <meta property="og:title" content="Slog" />
        <meta
          property="og:description"
          content="Slog는 개발하면서 이슈, 유용한 정보를 공유하기 위해 제작한 개인 블로그입니다."
        />
        <meta property="og:url" content="https://slog.website/" />
        <meta property="og:image" content="https://slog.website/api/static/op_logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Slog" />
        <meta
          name="twitter:description"
          content="Slog는 개발하면서 이슈, 유용한 정보를 공유하기 위해 제작한 개인 블로그입니다."
        />
        <meta name="twitter:image" content="https://slog.website/api/static/op_logo.png" />
      </Head>
      <Privacy />
    </>
  );
};

export default PrivacyPage;
