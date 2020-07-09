import React from "react";
import HeaderContainer from "../../../containers/Header/HeaderContainer";
import Footer from "../Footer";

type MainTemplateProps = {
  children: React.ReactNode;
};

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
