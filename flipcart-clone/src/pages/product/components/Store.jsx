import React from "react";
import generatePhoto from "../../../hooks/useGeneratePhoto";
import { Link } from "react-router-dom";
const Store = (props) => {
  const { products, path } = props;
  return (
    <>
      {Object.keys(products.productsByPrice).map((e, i) => {
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
                  <Link
                    key={JSON.stringify(a)}
                    style={{ textDecoration: "none", color: "unset" }}
                    to={`/${a.slug}/${a._id}/p`}
                  >
                    <div className="product">
                      <div className="picture">
                        <img
                          src={generatePhoto(a.productPictures[0]?.img)}
                          alt=""
                        />
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
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Store;
