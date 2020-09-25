import React from "react";
import { NextPage } from "next";
import MainTemplate from "../components/common/Template/MainTemplate";
import MainContainer from "../containers/Main/MainContainer";

const IndexPage: NextPage = () => {
  return (
    <MainTemplate>
      <MainContainer />
    </MainTemplate>
  );
};

export default IndexPage;
