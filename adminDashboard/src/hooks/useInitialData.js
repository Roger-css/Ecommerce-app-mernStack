import useAxios from "./usePrivate";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addAllProducts } from "../state/reducers/products";
import { addAllCategories } from "../state/reducers/category";
const useInitialData = () => {
  const axios = useAxios();
  const dispatch = useDispatch();
  const initialData = async () => {
    try {
      const req = await axios.get("/admin/initialData");
      dispatch(addAllCategories(req.data.Categories));
      dispatch(addAllProducts(req.data.Products));
    } catch (er) {
      console.log(er);
    }
  };
  return initialData;
};

export default useInitialData;
