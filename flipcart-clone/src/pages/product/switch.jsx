import React, { useEffect } from "react";
import usePrivate from "../../hooks/usePrivate";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../../state/reducers/products";
import Page from "./components/Page";
import Store from "./components/Store";
import ClothingAndAccessories from "./components/clothingAndAccessories";
import { addPage } from "../../state/reducers/page";
const Switch = (props) => {
  const products = useSelector((state) => state.product);
  const pages = useSelector((state) => state.page.pages);
  const axios = usePrivate();
  const dispatch = useDispatch();
  const { location } = props;
  const { pathname, search } = location;
  const path = pathname.slice(1);
  const cType = search.split("type=")[1];
  const c_id = search.split("&")[0].slice(5);

  useEffect(() => {
    const storeReq = async () => {
      try {
        const req = await axios.get(`/product/category${pathname}`);
        dispatch(addProducts(req.data));
      } catch (err) {
        console.log(err);
      }
    };
    const pageReq = async () => {
      try {
        const req = await axios.get(`/page/${c_id}/${cType}`);
        dispatch(addPage(req.data.foundedPage));
      } catch (err) {
        console.log(err);
      }
    };
    cType === undefined || cType === "store" ? storeReq() : pageReq();
  }, []);
  const Content = () => {
    switch (cType) {
      case "store":
        return <Store path={path} products={products} />;
      case "page":
        return <Page page={pages} />;
      default:
        return <ClothingAndAccessories />;
    }
  };
  return <Content />;
};

export default Switch;
