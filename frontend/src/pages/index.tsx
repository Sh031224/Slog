import React from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";

const MainTemplate = dynamic(
  () => import("../components/common/Template/MainTemplate")
);
const MainContainer = dynamic(() => import("../containers/Main/MainContainer"));

const IndexPage: NextPage = () => {
  return (
    <MainTemplate>
      <MainContainer />
    </MainTemplate>
  );
};

export default IndexPage;
