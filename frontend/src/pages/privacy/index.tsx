import dynamic from "next/dynamic";
import React from "react";

const MainTemplate = dynamic(
  () => import("../../components/common/Template/MainTemplate")
);
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
