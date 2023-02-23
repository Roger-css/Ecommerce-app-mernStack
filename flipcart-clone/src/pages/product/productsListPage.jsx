import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Wrapper from "../../layout/Wrapper";
import usePrivate from "../../hooks/usePrivate";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../../state/reducers/products";
import "./style.css";
const productsListPage = () => {
  const location = useLocation();
  const products = useSelector((state) => state.product);
  const axios = usePrivate();
  const dispatch = useDispatch();
  const { pathname } = location;
  const path = pathname.slice(1);
  useEffect(() => {
    const fn = async () => {
      try {
        const req = await axios.get(`/product${pathname}`);
        dispatch(addProducts(req.data));
      } catch (err) {
        console.log(err);
      }
    };
    fn();
  }, []);
  return (
    <Wrapper>
      {Object.keys(products.productsByPrice).map((e, i) => {
        console.log(e);
        return (
          <div key={e} className="card">
            <div className="cardHeader">
              <p>
                {path} {`products under ${i === 0 ? "5k" : e.slice(-3)}`}
              </p>
              <div className="viewAll">view All</div>
            </div>
            <div className="productsContainer">
              {products.productsByPrice[e].map((a) => {
                return (
                  <div key={JSON.stringify(a)} className="product">
                    <div className="picture">
                      <img src="https://random.imagecdn.app/180/300" alt="" />
                    </div>
                    <div className="productDetails">
                      <div className="productName">{a.name}</div>
                      <div className="ratings">
                        <span className="total">4.5</span>
                        <span className="count">3345</span>
                      </div>
                      <div className="price">{a.price}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </Wrapper>
  );
};

export default productsListPage;
