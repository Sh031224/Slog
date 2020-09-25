import dynamic from "next/dynamic";
import React from "react";
import MainTemplate from "../../components/common/Template/MainTemplate";

const PrivacyContainer = dynamic(
  () => import("../../containers/Privacy/PrivacyContainer")
);

const Privacy = () => {
  return (
    <MainTemplate>
      <PrivacyContainer />
    </MainTemplate>
  );
};

export default Privacy;
