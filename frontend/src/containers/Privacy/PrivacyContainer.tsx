import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useEffect } from "react";

const Privacy = dynamic(() => import("components/Privacy"));

const PrivacyContainer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
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
      <Privacy />
    </>
  );
};

export default PrivacyContainer;
