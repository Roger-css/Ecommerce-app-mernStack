import Header from "../layout/header";
import MenuHeader from "../pages/home/menuHeader";
import { Outlet } from "react-router-dom";
const Wrapper = (props) => {
  return (
    <>
      <Header />
      <MenuHeader />
      <div
        style={{
          backgroundColor: "#f2f2f6",
          padding: 0,
          margin: 0,
          minHeight: "calc(100% - 96px)",
        }}
      >
        <Outlet />
      </div>
    </>
  );
};

export default Wrapper;
