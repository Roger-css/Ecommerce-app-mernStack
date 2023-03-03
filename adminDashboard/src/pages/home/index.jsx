import NavBar from "../../layout/navBar";
import SideBar from "../../layout/SideBar";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import useInitialData from "../../hooks/useInitialData";
import { useEffect } from "react";
const Home = () => {
  const cats = useSelector((state) => state.category.categories);
  const lel = useEffect(() => {}, []);
  return (
    <>
      <NavBar />
      <Stack direction="row">
        <SideBar />
      </Stack>
    </>
  );
};

export default Home;
