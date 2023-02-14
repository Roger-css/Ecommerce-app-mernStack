import NavBar from "../../layout/navBar";
import SideBar from "./SideBar";
import { Stack } from "@mui/material";
import useAxios from "../../hooks/usePrivate";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAllProducts } from "../../state/reducers/products";
import { addAllCategories } from "../../state/reducers/category";
const Home = () => {
  const cats = useSelector((state) => state.category.categories);
  const axios = useAxios();
  const dispatch = useDispatch();
  useEffect(() => {
    const initialData = async () => {
      try {
        const req = await axios.get("/admin/initialData");
        dispatch(addAllCategories(req.data.Categories));
        dispatch(addAllProducts(req.data.Products));
      } catch (er) {
        console.log(er);
      }
    };
    cats.length === 0 && initialData();
  }, []);

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
