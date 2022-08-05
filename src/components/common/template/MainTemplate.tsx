import Footer from "../Footer";
import Header from "../Header";

type Props = {
  children: React.ReactNode;
};

const MainTemplate: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MainTemplate;
