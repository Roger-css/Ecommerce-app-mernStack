import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { logout, login } from "../state/reducers/auth";
import { useDispatch } from "react-redux";
import axios from "../api/axios";
import jwtDecode from "jwt-decode";
const PersistLogin = () => {
  const [Loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const auth = JSON.parse(localStorage.getItem("authenticated"));
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
        console.log(err);
        logout({ error: err });
      } finally {
        setLoading(false);
      }
    };
    auth ? Check() : setLoading(false);
    return () => (isMounted = false);
  }, []);
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
