import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MaterialButton, MaterialInput } from "../../components/materialUI";
import usePrivate from "../../hooks/usePrivate";
import { addAddress } from "../../state/reducers/address";
import AddressForm from "./address";
import "./style.css";
const CheckoutStep = ({
  stepNumber,
  stepTitle,
  active,
  children,
  handleClick,
}) => (
  <div
    onClick={handleClick}
    className="checkoutStep"
    style={{ marginBottom: "10px" }}
  >
    <div className={`checkoutHeader ${active ? "active" : ""}`}>
      <div>
        <span className="stepNumber">{stepNumber}</span>
        <span className="stepTitle">{stepTitle}</span>
      </div>
    </div>
    {children}
  </div>
);
const index = () => {
  const axios = usePrivate();
  const dispatch = useDispatch();
  const name = useSelector((state) => state.auth.user.userName);
  const auth = useSelector((state) => state.auth.authenticated);
  const addresses = useSelector((state) => state.address.addresses);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editOrNewAddress, setEditOrNewAddress] = useState(false);
  useEffect(() => {
    async function promise() {
      const req = await axios.post("user/getaddress").catch((error) => {
        throw console.error(error);
      });
      if (req.status >= 200) {
        const {
          userAddress: { address },
        } = req.data;
        addresses ?? dispatch(addAddress(address));
      }
    }
    auth && promise();
  }, [auth]);
  const newAddress = async (payload) => {
    try {
      const req = await axios.post("user/address/create", payload);
      console.log(req);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="cartContainer" style={{ alignItems: "flex-start" }}>
      {/* check if user Logged in */}
      <div className="checkoutContainer">
        <CheckoutStep
          stepNumber="1"
          stepTitle="LOGIN"
          active={auth ? false : true}
        >
          {auth ? (
            <div className="loggedInId">
              <span style={{ fontWeight: "500" }}>username</span>
              <span style={{ margin: "0 5px" }}>{name}</span>
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
          active={auth ? true : false}
        >
          {addresses.length > 0 &&
            addresses.map((add, i) => {
              return (
                <div key={i} className="flexBox addressContainer">
                  <div>
                    <input type="radio" title="address" />
                  </div>
                  <div className="flexRow sb addressInfo">
                    <div>
                      <div>
                        <span>{add.name} </span>
                        <span>{add.addressType} </span>
                        <span>{add.mobileNumber}</span>
                      </div>
                      <div>{add.address}</div>
                      <MaterialButton
                        title="DELIVERY HERE"
                        bgColor="#fb641b"
                        style={{ width: "250px" }}
                      />
                    </div>
                    <div>edit</div>
                  </div>
                </div>
              );
            })}
        </CheckoutStep>
        {editOrNewAddress ? (
          <AddressForm
            show={() => setEditOrNewAddress(false)}
            onSubmitForm={newAddress}
            onCancel={() => {
              console.log("cancel");
            }}
          />
        ) : (
          <CheckoutStep
            stepNumber="+"
            stepTitle="ADD NEW ADDRESS"
            active={false}
            handleClick={() => setEditOrNewAddress(true)}
          />
        )}
      </div>
    </div>
  );
};

export default index;
