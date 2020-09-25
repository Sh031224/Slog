import dynamic from "next/dynamic";
import React from "react";

const MainTemplate = dynamic(
  () => import("../../components/common/Template/MainTemplate")
);
const HandleContainer = dynamic(
  () => import("../../containers/Handle/HandleContainer")
);

const Handle = () => {
  return (
    <MainTemplate>
      <HandleContainer />
    </MainTemplate>
  );
};

export default Handle;
