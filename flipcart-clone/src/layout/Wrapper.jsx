import Header from "../layout/header";
import MenuHeader from "../pages/home/menuHeader";
import { Outlet } from "react-router-dom";
const Wrapper = (props) => {
  return (
    <>
      <Header />
      <MenuHeader />
      <Outlet />
    </>
  );
};

export default Wrapper;
