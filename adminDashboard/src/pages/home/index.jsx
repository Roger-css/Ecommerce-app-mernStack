import NavBar from "../../layout/navBar";
import SideBar from "../../layout/SideBar";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const Home = () => {
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
