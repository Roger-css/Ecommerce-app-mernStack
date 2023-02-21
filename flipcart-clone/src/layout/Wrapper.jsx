import Header from "../layout/header";
import MenuHeader from "../pages/home/menuHeader";
const Wrapper = (props) => {
  return (
    <>
      <Header />
      <MenuHeader />
      {props.children}
    </>
  );
};

export default Wrapper;
