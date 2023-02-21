import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Wrapper from "../layout/Wrapper";
import usePrivate from "../hooks/usePrivate";
import { useDispatch } from "react-redux";
const productsListPage = () => {
  const location = useLocation();
  const axios = usePrivate();
  const { pathname } = location;
  const path = pathname.slice(1);
  useEffect(() => {
    const fn = async () => {
      try {
        const req = await axios.get(`/product${pathname}`);
        console.log(req.data);
      } catch (err) {
        console.log(err);
      }
    };
    fn();
  });
  return <Wrapper>{path}</Wrapper>;
};

export default productsListPage;
