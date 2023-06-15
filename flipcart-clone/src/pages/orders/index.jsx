import React, { useEffect } from "react";
import usePrivate from "../../hooks/usePrivate";
import { useDispatch, useSelector } from "react-redux";
import { addOrders } from "../../state/reducers/auth";
import Card from "../../components/MUIcard/index";
import GeneratePhoto from "../../hooks/useGeneratePhoto";
import "./style.css";
const OrdersPage = () => {
  const axios = usePrivate();
  const authenticated = useSelector((state) => state.auth.authenticated);
  const orders = useSelector((state) => state.auth.user.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    const getOrders = async () => {
      const req = await axios.get("getOrders");
      if (req.status < 400) {
        dispatch(addOrders(req.data.orders));
      }
    };
    authenticated && getOrders();
  }, [authenticated]);

  return (
    <div>
      {orders.length > 0 &&
        orders.map((order) => {
          return order.items.map((item, i) => {
            console.log(item);
            return (
              <Card key={i} style={{ maxWidth: "1200px", margin: "5px auto" }}>
                <div className="orderItemContainer">
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      overflow: "hidden",
                      textAlign: "center",
                    }}
                  >
                    <img
                      style={{ maxWidth: "80px", maxHeight: "80px" }}
                      src={GeneratePhoto(
                        item.productId.productPictures[0]?.img
                      )}
                      alt=""
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginLeft: "10px",
                      flex: 1,
                    }}
                  >
                    <div>{item.productId.name}</div>
                    <div>{item.productId.price || "999.99"}</div>
                    <div>{order.paymentStatus}</div>
                  </div>
                </div>
              </Card>
            );
          });
        })}
    </div>
  );
};

export default OrdersPage;
