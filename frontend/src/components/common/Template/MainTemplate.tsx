import React, { ReactNode } from "react";
import HeaderContainer from "../../../containers/Header/HeaderContainer";
import Footer from "../Footer";

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
