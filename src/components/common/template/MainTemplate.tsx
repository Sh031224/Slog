import React from "react";
import Footer from "../Footer";
import Header from "../Header";

interface IMainTemplateProps {
  children: React.ReactNode;
}

const MainTemplate: React.FC<IMainTemplateProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MainTemplate;
