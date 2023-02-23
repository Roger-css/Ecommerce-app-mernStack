import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { logout, login } from "../state/reducers/auth";
import { useDispatch, useSelector } from "react-redux";
import axios from "../api/axios";
import jwtDecode from "jwt-decode";
import { InfinitySpin } from "react-loader-spinner";
const PersistLogin = () => {
  const [Loading, setLoading] = useState(true);
  const persistent = useSelector((state) => state.auth.persistent);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    let isMounted = true;
    const Check = async () => {
      try {
        const req = await axios.get("refresh");
        const {
          Userinfo: { username },
        } = jwtDecode(req.data.accessToken);
        dispatch(login({ token: req.data.accessToken, user: { username } }));
      } catch (err) {
        console.log(err);
        logout({ error: err });
        navigate("sign-in");
      } finally {
        isMounted && setLoading(false);
      }
    };
    persistent ? Check() : setLoading(false);
    return () => (isMounted = false);
  }, []);
  const content = (
    <>
      {!persistent ? (
        <Outlet />
      ) : Loading ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "grid",
            placeContent: "center",
          }}
        >
          <InfinitySpin width="200" color="black" />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
  return content;
};

export default PersistLogin;
