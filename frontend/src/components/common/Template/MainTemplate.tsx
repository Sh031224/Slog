import dynamic from "next/dynamic";
import React, { ReactNode } from "react";

const HeaderContainer = dynamic(
  () => import("../../../containers/Header/HeaderContainer")
);
const Footer = dynamic(() => import("../Footer"));

interface MainTemplateProps {
  children: ReactNode;
}

const MainTemplate = ({ children }: MainTemplateProps) => {
  return (
    <>
      <HeaderContainer />
      {children}
      <Footer />
    </>
  );
};

export default MainTemplate;
