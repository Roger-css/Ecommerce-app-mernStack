import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MaterialButton, MaterialInput } from "../../components/materialUI";
import usePrivate from "../../hooks/usePrivate";
import { addAddress } from "../../state/reducers/address";
import AddressForm from "./components/address";
import CheckoutStep from "./components/checkStep";
import "./style.css";
import PriceDetails from "../../components/priceDetails";
import CartItem from "../cart";
import Card from "../../components/MUIcard";
const index = () => {
  const axios = usePrivate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const auth = useSelector((state) => state.auth.authenticated);
  const addresses = useSelector((state) => state.address.addresses);
  const [email, setEmail] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [changingAddress, setChangingAddress] = useState(false);
  const [EditingAddress, setEditingAddress] = useState(null);
  const [modifiedAddresses, setModifiedAddresses] = useState([]);
  const [orderSummary, setOrderSummary] = useState(false);
  const [paymentOptions, setPaymentOptions] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const cart = useSelector((state) => state.cart.cartProducts);
  console.log({ sda: 1, sd: 324 });
  if (Object.keys(cart).length == 0) {
    return (
      <div
        style={{
          height: "100%",
          fontSize: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Your cart is empty
      </div>
    );
  }
  useEffect(() => {
    const mod = addresses.map((e) => {
      const ee = { ...e, selected: false, edit: false };
      return ee;
    });
    setModifiedAddresses(mod);
  }, [addresses]);
  useEffect(() => {
    const promise = async () => {
      try {
        const req = await axios.post("user/getaddress");
        const {
          userAddress: { address },
        } = req.data;
        addresses.length < 1 && dispatch(addAddress(address));
      } catch (error) {
        console.log(error);
      }
    };
    promise();
  }, [auth]);
  const addSelectedProp = (newAdd) => {
    const theChange = modifiedAddresses.map((e) => {
      return e._id == newAdd
        ? { ...e, selected: true, edit: false }
        : { ...e, selected: false, edit: false };
    });
    setModifiedAddresses(theChange);
  };
  const newAddress = async (payload) => {
    setChangingAddress(false);
    setEditingAddress(null);

    setOrderSummary(true);
    try {
      const req = await axios.post("user/address/create", payload);
      const allAddress = req.data.address.address;
      setSelectedAddress(allAddress[allAddress.length - 1]);
      dispatch(addAddress(allAddress));
    } catch (error) {
      console.log(error);
    }
  };
  const setAddressForEdit = (address) => {
    const theChange = modifiedAddresses.map((e) => {
      return e._id == address
        ? { ...e, edit: true, selected: true }
        : { ...e, edit: false, selected: false };
    });
    setModifiedAddresses(theChange);
  };
  const placeAnOrder = async () => {
    const items = Object.keys(cart).map((item) => {
      return {
        productId: item,
        payablePrice: cart[item].price,
        purchasedQty: cart[item].qty,
      };
    });
    const totalAmount = Object.keys(cart).reduce((total, item) => {
      const { price, qty } = cart[item];
      return total + price * qty;
    }, 0);
    const payload = {
      addressId: selectedAddress,
      items,
      totalAmount,
      paymentStatus: "pending",
      paymentType: "cod",
    };
    try {
      const req = await axios.post("/addOrder", payload);
      setConfirmOrder(true);
      localStorage.removeItem("myCart");
    } catch (error) {
      console.log(error);
    }
  };
  if (confirmOrder) {
    return (
      <div
        style={{
          height: "100%",
          fontSize: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        thank you
      </div>
    );
  }
  return (
    <div
      style={{ display: "flex", backgroundColor: "#f2f2f6", minHeight: "84%" }}
    >
      <div className="cartItemsContainer" style={{ alignItems: "flex-start" }}>
        {/* check if user Logged in */}
        <CheckoutStep
          stepNumber="1"
          stepTitle="LOGIN"
          active={auth ? false : true}
        >
          {auth ? (
            <div className="loggedInId">
              <span style={{ fontWeight: "500" }}>username</span>
              <span style={{ margin: "0 5px" }}>{user.userName}</span>
            </div>
          ) : (
            <>
              <MaterialInput
                type="text"
                label="Enter Email/Enter Mobile Number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* 
              <MaterialInput
                type="password"
                label="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <MaterialButton
                title="submit"
                bgColor="#fb641b"
                style={{ width: "250px" }}
              /> */}
            </>
          )}
        </CheckoutStep>
        <CheckoutStep
          stepNumber="2"
          stepTitle="DELIVERY ADDRESS"
          active={Boolean(selectedAddress) ? false : true}
        >
          {selectedAddress ? (
            <div style={{ marginLeft: "60px", fontSize: "12px" }}>
              {selectedAddress.name}
            </div>
          ) : (
            modifiedAddresses.length > 0 &&
            modifiedAddresses.map((add, i) => {
              return add.edit ? (
                <AddressForm
                  theKey={i}
                  withoutLayout={true}
                  focus={true}
                  show={() => setChangingAddress(false)}
                  onSubmitForm={newAddress}
                  initialData={EditingAddress}
                  onCancel={() => {
                    console.log("cancel");
                  }}
                />
              ) : (
                <div key={i} className="flexRow addressContainer">
                  <div onClick={() => addSelectedProp(add._id)}>
                    <input
                      type="radio"
                      name="selectedAddress"
                      title="address"
                      id={`address${i + 1}`}
                      onChange={() => {}}
                      checked={add.selected}
                    />
                  </div>
                  <label
                    htmlFor={`address${i + 1}`}
                    className="flexRow sb addressInfo"
                  >
                    <div onClick={() => addSelectedProp(add._id)}>
                      <div>
                        <span>{add.name} </span>
                        <span className="WorkOrHome">{add.addressType} </span>
                        <span>{add.mobileNumber}</span>
                      </div>
                      <div>{add.address}</div>
                      {add.selected && !add.edit ? (
                        <MaterialButton
                          title="DELIVERY HERE"
                          handleClick={() => {
                            setSelectedAddress(add);
                            setOrderSummary(true);
                          }}
                          bgColor="#fb641b"
                          style={{ width: "250px" }}
                        />
                      ) : null}
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          setAddressForEdit(add._id);
                          setEditingAddress(add);
                        }}
                        className="editBtn"
                      >
                        edit
                      </button>
                    </div>
                  </label>
                </div>
              );
            })
          )}
        </CheckoutStep>
        {changingAddress ? (
          <AddressForm
            focus={true}
            show={() => setChangingAddress(false)}
            onSubmitForm={newAddress}
            initialData={EditingAddress}
            onCancel={() => {
              console.log("cancel");
            }}
          />
        ) : (
          <CheckoutStep
            style={{ cursor: "pointer" }}
            stepNumber="+"
            stepTitle="ADD NEW ADDRESS"
            active={false}
            handleClick={() => setChangingAddress((p) => !p)}
          />
        )}
        <CheckoutStep
          stepNumber="3"
          stepTitle="ORDER SUMMARY"
          body={
            orderSummary ? (
              <CartItem readOnly={true} />
            ) : paymentOptions ? (
              <div>({Object.keys(cart).length}) items</div>
            ) : null
          }
          active={orderSummary}
          bodyStyle={
            orderSummary
              ? { padding: "10px 10px 1px" }
              : { padding: "5px 15px", marginLeft: "45px", fontSize: "12px" }
          }
        />
        {orderSummary && (
          <Card style={{ margin: "10px 0" }}>
            <div
              className="flexRow sb"
              style={{ padding: "20px", alignItems: "center" }}
            >
              <p style={{ fontSize: "12px" }}>
                Order conformation email will be sent to{" "}
                <strong>{user.email}</strong>
              </p>
              <MaterialButton
                title={"CONTINUE"}
                style={{ width: "200px" }}
                bgColor={"#fb641b"}
                handleClick={() => {
                  setOrderSummary(false);
                  setPaymentOptions(true);
                }}
              />
            </div>
          </Card>
        )}
        <CheckoutStep
          stepNumber="4"
          stepTitle="PAYMENT OPTIONS"
          active={paymentOptions}
          style={{ paddingBottom: "5px" }}
        >
          {paymentOptions && (
            <div
              style={{
                fontSize: "12px",
                margin: "10px 30px 0px 60px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="radio"
                  id="cod"
                  name="paymentOptions"
                  value={"cod"}
                  onChange={() => {}}
                />
                <label style={{ marginLeft: "5px" }} htmlFor="cod">
                  Cash On Deliver
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                <MaterialButton
                  title={"CONFIRM ORDER"}
                  style={{ width: "200px" }}
                  bgColor={"#fb641b"}
                  handleClick={() => {
                    placeAnOrder();
                  }}
                />
              </div>
            </div>
          )}
        </CheckoutStep>
      </div>
      <PriceDetails
        style={{ marginTop: "20px", marginRight: "20px" }}
        totalItem={Object.keys(cart).reduce(function (qty, next) {
          return qty + cart[next].qty;
        }, 0)}
        totalPrice={Object.keys(cart).reduce(function (qty, next) {
          return qty + cart[next].price * cart[next].qty;
        }, 0)}
      />
    </div>
  );
};

export default index;
