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
        // const userName = jwtDecode(req.data)
        // dispatch(login({ token: req.data, user: { userName } }));
        console.log(req);
      } catch (err) {
        console.log(err);
        // logout({ error: err });
        // Navigate({ to: "sign-in" });
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
        /*<Outlet />*/ <h1>fuck u</h1>
      ) : Loading ? (
        <>loading...</>
      ) : (
        /*<Outlet />*/ <h1>failed</h1>
      )}
    </>
  );
  return content;
};

export default PersistLogin;
