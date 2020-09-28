import HeaderContainer from "containers/Header/HeaderContainer";
import React, { ReactNode } from "react";
import Footer from "../Footer";

interface MainTemplateProps {
  children: ReactNode;
  token?: string;
}

const MainTemplate = ({ children, token }: MainTemplateProps) => {
  return (
    <>
      <HeaderContainer token={token} />
      {children}
      <Footer />
    </>
  );
};

export default MainTemplate;
