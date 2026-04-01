import { Outlet } from "react-router";
import PageContainer from "./PageContainer";

const RootLayout = () => {
  return (
    <div>
      <PageContainer>
        <Outlet />
      </PageContainer>
    </div>
  );
};

export default RootLayout;
