import React from "react";
import { useLocation } from "react-router-dom";
import Wrapper from "../../layout/Wrapper";
import Switch from "./switch";
import "./style.css";
const productsListPage = () => {
  const location = useLocation();
  const { pathname } = location;
  const path = pathname.slice(1);
  return <Switch location={location} />;
};

export default productsListPage;
