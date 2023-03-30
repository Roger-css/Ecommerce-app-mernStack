import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAxios from "../../hooks/usePrivate";
import generatePublicUrl from "../../hooks/useGeneratePhoto";
import { MaterialButton } from "../../components/materialUI";
import { IoCart } from "react-icons/io5";
import { AiFillThunderbolt } from "react-icons/ai";
import { IoIosArrowForward, IoIosStar } from "react-icons/io";
import { BiRupee } from "react-icons/bi";
import "./master.css";
import { addProductToCart } from "../../state/reducers/cart";
import { useDispatch } from "react-redux";
const index = () => {
  const [product, setProduct] = useState(null);
  const [CurrentImage, setCurrentImage] = useState(0);
  const axios = useAxios();
  const location = useLocation();
  const p_id = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  useEffect(() => {
    const requestProduct = async () => {
      try {
        const req = await axios.get(`product/${p_id}`);
        setProduct(req.data.product);
      } catch (error) {
        console.log(error);
      }
    };
    requestProduct();
  }, []);
  const addToCart = () => {
    const { _id, description, name } = product;
    const form = {
      _id,
      description,
      name,
      img: product.productPictures[0]?.img,
      qty: 0,
    };
    dispatch(addProductToCart(form));
  };
  return (
    <>
      {product && (
        <div className="productDescriptionContainer">
          <div className="flexRow">
            <div className="verticalImageStack">
              {product.productPictures.map((thumb, index) => (
                <div
                  onClick={() => setCurrentImage(index)}
                  key={index}
                  className={`thumbnail ${index == CurrentImage && "active"}`}
                >
                  <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />
                </div>
              ))}
            </div>
            <div className="productDescContainer">
              <div className="productDescImgContainer">
                <img
                  src={generatePublicUrl(
                    product.productPictures[CurrentImage]?.img
                  )}
                  alt={`${product.productPictures[0]?.img}`}
                />
              </div>

              {/* action buttons */}
              <div className="flexRow">
                <MaterialButton
                  handleClick={addToCart}
                  title="ADD TO CART"
                  bgColor="#ff9f00"
                  textColor="#ffffff"
                  style={{
                    marginRight: "5px",
                  }}
                  icon={<IoCart />}
                />
                <MaterialButton
                  title="BUY NOW"
                  bgColor="#fb641b"
                  textColor="#ffffff"
                  style={{
                    marginLeft: "5px",
                  }}
                  icon={<AiFillThunderbolt />}
                />
              </div>
            </div>
          </div>
          <div>
            {/* home > category > subCategory > productName */}
            <div className="breed">
              <ul>
                <li>
                  <a href="#">Home</a>
                  <IoIosArrowForward />
                </li>
                <li>
                  <a href="#">Mobiles</a>
                  <IoIosArrowForward />
                </li>
                <li>
                  <a href="#">Samsung</a>
                  <IoIosArrowForward />
                </li>
                <li>
                  <a href="#">{product.name}</a>
                </li>
              </ul>
            </div>
            {/* product description */}
            <div className="productDetails">
              <p className="productTitle">{product.name}</p>
              <div>
                <span className="ratingCount">
                  4.3 <IoIosStar />
                </span>
                <span className="ratingNumbersReviews">
                  72,234 Ratings & 8,140 Reviews
                </span>
              </div>
              <div className="extraOffer">
                Extra <BiRupee />
                4500 off{" "}
              </div>
              <div className="flexRow priceContainer">
                <span className="pPrice">
                  <BiRupee />
                  {product.price}
                </span>
                <span className="discount" style={{ margin: "0 10px" }}>
                  22% off
                </span>
                {/* <span>i</span> */}
              </div>
              <div>
                <p
                  style={{
                    color: "#212121",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "13px",
                  }}
                >
                  Available Offers
                </p>
                <p style={{ display: "flex" }}>
                  <span
                    style={{
                      width: "100px",
                      fontSize: "12px",
                      color: "#878787",
                      fontWeight: "600",
                      marginRight: "20px",
                    }}
                  >
                    Description
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#212121",
                    }}
                  >
                    {product.description}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default index;
