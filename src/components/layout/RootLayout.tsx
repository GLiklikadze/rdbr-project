import { Outlet } from "react-router";
import PageContainer from "./PageContainer";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const RootLayout = () => {
  return (
    <div>
      <PageContainer>
        <Header />
        <Outlet />
        <Footer />
      </PageContainer>
    </div>
  );
};

export default RootLayout;
