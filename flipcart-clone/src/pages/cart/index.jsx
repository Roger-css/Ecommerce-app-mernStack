import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import {
  addProductToCart,
  removeProductFromCart,
  decreaseQty,
} from "../../state/reducers/cart";
import "./style.css";
import usePrivate from "../../hooks/usePrivate";
import { MaterialButton } from "../../components/materialUI";
import { useNavigate } from "react-router-dom";
const CartPage = () => {
  const cart = useSelector((state) => state.cart.cartProducts);
  const auth = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axios = usePrivate();
  useEffect(() => {
    const sendToApi = async () => {
      try {
        const payload = Object.values(cart);
        const req = await axios.post("/cart/user/addToCart", payload);
        console.log(req);
      } catch (error) {
        console.log(error);
      }
    };
    auth && sendToApi();
  }, [cart]);
  const onQuantityIncrement = (_id) => {
    const { name, price, img } = cart[_id];
    dispatch(addProductToCart({ _id, name, price, img }));
  };
  const onQuantityDecrement = (_id) => {
    const { name, price, img } = cart[_id];
    dispatch(decreaseQty({ _id, name, price, img }));
  };

  const onRemoveCartItem = (_id) => {
    dispatch(removeProductFromCart({ _id }));
  };
  return (
    <>
      <div className="cartContainer">
        <div style={{ position: "relative" }} className="cartProductsContainer">
          <div className="cartHeadings">
            <h4>my cart</h4>
            <h4>deliver to</h4>
          </div>
          <div
            className="products"
            style={{ minHeight: "300px", overflowY: "auto" }}
          >
            {Object.keys(cart).map((item, i) => {
              return (
                <div key={i} style={{ marginBottom: "30px" }}>
                  <CartItem
                    onQuantityDecrement={onQuantityDecrement}
                    onQuantityIncrement={onQuantityIncrement}
                    onRemoveCartItem={onRemoveCartItem}
                    cartItem={cart[item]}
                  />
                </div>
              );
            })}
          </div>
          <div
            style={{
              width: "100%",
              height: "70px",
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <MaterialButton
              style={{
                width: "200px",
                marginRight: "10px",
              }}
              title="PLACE AN ORDER"
              bgColor="#fb641b"
              handleClick={() => navigate("/checkout")}
            />
          </div>
        </div>
        <div className="priceContainer">
          <h4>price</h4>
        </div>
      </div>
    </>
  );
};

export default CartPage;
