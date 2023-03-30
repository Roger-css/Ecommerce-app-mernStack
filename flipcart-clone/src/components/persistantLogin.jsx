import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { logout, login } from "../state/reducers/auth";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import usePrivate from "../hooks/usePrivate";
const PersistLogin = () => {
  const [Loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const auth = JSON.parse(localStorage.getItem("authenticated"));
  const axios = usePrivate();
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    let isMounted = true;
    const Check = async () => {
      try {
        const req = await axios.get("refresh");
        const {
          Userinfo: { username },
        } = jwtDecode(req.data.accessToken);
        dispatch(login({ token: req.data.accessToken, username }));
      } catch (err) {
        dispatch(logout());
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    auth ? Check() : setLoading(false);
    return () => (isMounted = false);
  }, []);
  useEffect(() => {
    const cartItems = async () => {
      try {
        const req = await axios.get("cart/user/getCartItems");
      } catch (error) {
        console.log(error);
      }
    };
    token && cartItems();
  }, [token]);
  const content = (
    <>
      {Loading ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "grid",
            placeContent: "center",
          }}
        >
          loading...
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
  return content;
};

export default PersistLogin;
