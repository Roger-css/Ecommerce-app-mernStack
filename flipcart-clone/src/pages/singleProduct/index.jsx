import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAxios from "../../hooks/usePrivate";
const index = () => {
  const [product, setProduct] = useState(null);
  const axios = useAxios();
  const location = useLocation();
  const p_id = location.pathname.split("/")[2];
  useEffect(() => {
    const requestProduct = async () => {
      try {
        const req = await axios.get(`product/${p_id}`);
        console.log(req);
      } catch (error) {
        console.log(error);
      }
    };
    requestProduct();
  }, []);
  return <div>index</div>;
};

export default index;
