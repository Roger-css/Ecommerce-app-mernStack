import NavBar from "../../layout/navBar";
import SideBar from "./SideBar";
import MainPage from "./categories";
import { Stack } from "@mui/material";
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
