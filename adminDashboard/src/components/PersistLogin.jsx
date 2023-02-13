import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { logout, login } from "../state/reducers/auth";
import { useDispatch, useSelector } from "react-redux";
import axios from "../api/axios";
import useAxios from "../hooks/usePrivate";
import jwtDecode from "jwt-decode";
const PersistLogin = () => {
  const [Loading, setLoading] = useState(true);
  const persistent = useSelector((state) => state.auth.persistent);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const privateAxios = useAxios();
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
      try {
        const req2 = await privateAxios.get("/initialData");
        console.log(req2);
      } catch (err) {
        console.log(err);
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
