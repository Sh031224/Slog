import MainTemplate from "components/common/template/MainTemplate";
import Handle from "components/handle/Handle";
import { getPostInfoPromise } from "lib/promiseDispatch";
import { NextPage } from "next";
import React from "react";

const HandlePage: NextPage = () => {
  return (
    <MainTemplate>
      <Handle />
    </MainTemplate>
  );
};

HandlePage.getInitialProps = async (ctx) => {
  const isServer = typeof window === "undefined";

  if (isServer) {
    await Promise.all([getPostInfoPromise(ctx)]);
  }
};

export default HandlePage;
