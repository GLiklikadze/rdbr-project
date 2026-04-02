import { Outlet } from "react-router";
import PageContainer from "./PageContainer";
import Header from "../header/Header";

const RootLayout = () => {
  return (
    <div>
      <PageContainer>
        <Header />
        <Outlet />
      </PageContainer>
    </div>
  );
};

export default RootLayout;
