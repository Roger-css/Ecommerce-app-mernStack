import React, { useState } from "react";
import "../app.css";
import flipKartLogo from "../assets/flipkart.png";
import goldenStar from "../assets/golden-star.png";
import { useDispatch, useSelector } from "react-redux";
import { IoArrowDown, IoCart, IoSearch } from "react-icons/io5";
import decode from "jwt-decode";
import { login } from "../state/reducers/auth";
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu,
} from "../components/materialUI";
import Logo from "../assets/login-image.png";
import axios from "../api/axios";

const Header = (props) => {
  const [loginModal, setLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const submitLogin = async () => {
    try {
      const req = await axios.post("sign-in", { email, password });
      const info = decode(req.data);
      const {
        Userinfo: { username },
      } = info;
      dispatch(login({ token: req.data, username }));
    } catch (error) {
      console.log(error);
    }
  };
  const renderMenuForNonLoggedIn = () => {
    return (
      <DropdownMenu
        menu={
          <a className="loginButton" onClick={() => setLoginModal(true)}>
            Login
          </a>
        }
        menus={[
          { label: "My Profile", href: "", icon: null },
          { label: "Flipkart Plus Zone", href: "", icon: null },
          { label: "Orders", href: "", icon: null },
          { label: "Wishlist", href: "", icon: null },
          { label: "Rewards", href: "", icon: null },
          { label: "Gift Cards", href: "", icon: null },
        ]}
        firstMenu={
          <div className="firstmenu">
            <span>New Customer?</span>
            <a style={{ color: "#2874f0" }}>Sign Up</a>
          </div>
        }
      />
    );
  };
  const renderMenuForLoggedIn = () => {
    return (
      <DropdownMenu
        menu={<a className="fullName">{user.user.userName}</a>}
        menus={[
          { label: "My Profile", href: "", icon: null },
          { label: "SuperCoin zone", href: "", icon: null },
          { label: "Flipkart Plus Zone", href: "", icon: null },
          { label: "Orders", href: "", icon: null },
          { label: "Wishlist", href: "", icon: null },
          { label: "My chats", href: "", icon: null },
          { label: "Coupons", href: "", icon: null },
          { label: "Rewards", href: "", icon: null },
          { label: "Notifications", href: "", icon: null },
          { label: "Gift Cards", href: "", icon: null },
          { label: "LogOut", href: "", icon: null },
        ]}
      />
    );
  };
  return (
    <div className="header">
      <Modal visible={loginModal} onClose={() => setLoginModal(false)}>
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <div>
                <h2>Login</h2>
                <p>Get access to your Orders, Wishlist and Recommendations</p>
              </div>
              <img src={Logo} alt="" />
            </div>
            <div className="rightspace" style={{ paddingTop: "40px" }}>
              <MaterialInput
                type="text"
                label="Enter Email/Enter Mobile Number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <MaterialInput
                type="password"
                label="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // rightElement={<a href="#">Forgot?</a>}
              />
              <p className="pptof">
                By continuing, you agree to Flipkart's <span>Terms of Use</span>{" "}
                and <span>Privacy Policy</span>.
              </p>
              <MaterialButton
                style={{ margin: "20px 0" }}
                title="Login"
                bgColor="#fb641b"
                textColor="#ffffff"
                handleClick={submitLogin}
              />
              <p>or</p>
              <MaterialButton
                style={{ margin: "20px 0" }}
                title="request OTP"
                bgColor="#fff"
                textColor="#2874f0"
              />
            </div>
          </div>
        </div>
      </Modal>
      <div className="subHeader">
        <div className="logo">
          <a href="/">
            <img src={flipKartLogo} className="logoimage" alt="" />
          </a>
          <a style={{ marginTop: "-10px" }}>
            <span style={{ color: "#fff" }} className="exploreText">
              Explore
            </span>
            <span className="plusText">Plus</span>
            <img src={goldenStar} className="goldenStar" alt="" />
          </a>
        </div>
        <div
          style={{
            padding: "0 10px",
          }}
        >
          <div className="searchInputContainer">
            <input
              className="searchInput"
              placeholder={"search for products, brands and more"}
            />
            <div className="searchIconContainer">
              <IoSearch
                style={{
                  color: "#2874f0",
                }}
              />
            </div>
          </div>
        </div>
        <div className="rightMenu">
          {user.authenticated
            ? renderMenuForLoggedIn()
            : renderMenuForNonLoggedIn()}
          <DropdownMenu
            menu={
              <a className="more">
                <span>More</span>
                <IoArrowDown />
              </a>
            }
            menus={[
              { label: "Notification Preference", href: "", icon: null },
              { label: "Sell on flipkart", href: "", icon: null },
              { label: "24x7 Customer Care", href: "", icon: null },
              { label: "Advertise", href: "", icon: null },
              { label: "Download App", href: "", icon: null },
            ]}
          />
          <div>
            <a className="cart">
              <IoCart />
              <span style={{ margin: "0 10px" }}>Cart</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
