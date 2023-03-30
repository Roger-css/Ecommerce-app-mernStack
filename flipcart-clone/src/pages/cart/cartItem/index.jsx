import React, { useState } from "react";
import GeneratePhoto from "../../../hooks/useGeneratePhoto";
import "./style.css";

const CartItem = (props) => {
  const [qty, setQty] = useState(props.cartItem.qty);
  const { _id, name, price, img } = props.cartItem;
  const onQuantityIncrement = () => {
    setQty((p) => p + 1);
    props.onQuantityIncrement(_id, qty + 1);
  };
  const onQuantityDecrement = () => {
    if (qty <= 1) return;
    setQty((p) => p - 1);
    props.onQuantityDecrement(_id, qty - 1);
  };
  return (
    <div className="cartItemContainer">
      <div className="flexRow">
        <div className="cartProImgContainer">
          <img src={GeneratePhoto(img)} alt={""} />
        </div>
        <div className="cartItemDetails">
          <div>
            <p>{name}</p>
            <p>Rs. {price}</p>
          </div>
          <div style={{ marginLeft: "30px" }}>Delivery in 3 - 5 days</div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          margin: "5px 0",
        }}
      >
        {/* quantity control */}
        <div className="quantityControl">
          <button className="dec" onClick={onQuantityDecrement}>
            -
          </button>
          <input value={qty} readOnly />
          <button className="inc" onClick={onQuantityIncrement}>
            +
          </button>
        </div>
        <button className="cartActionBtn">save for later</button>
        <button
          className="cartActionBtn danger"
          onClick={() => props.onRemoveCartItem(_id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
