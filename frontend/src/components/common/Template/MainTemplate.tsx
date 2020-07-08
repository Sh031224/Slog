import React from "react";
import Header from "../Header";
import Footer from "../Footer";

type MainTemplateProps = {
  children: React.ReactNode;
};

const MainTemplate = ({ children }: MainTemplateProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MainTemplate;
