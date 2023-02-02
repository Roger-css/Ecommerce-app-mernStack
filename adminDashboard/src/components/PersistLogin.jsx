import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { logout, login } from "../state/reducers/auth";
import { useDispatch, useSelector } from "react-redux";
import axios from "../api/axios";
import jwtDecode from "jwt-decode";
const PersistLogin = () => {
  const [Loading, setLoading] = useState(true);
  const persistent = useSelector((state) => state.auth.persistent);
  const dispatch = useDispatch();
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
        Navigate({ to: "sign-in" });
      } finally {
        isMounted && setLoading(false);
      }
    };
    persistent ? Check() : setLoading(false);
    return () => (isMounted = false);
  }, []);
  const content = (
    <>{!persistent ? <Outlet /> : Loading ? <>loading...</> : <Outlet />}</>
  );
  return content;
};

export default PersistLogin;