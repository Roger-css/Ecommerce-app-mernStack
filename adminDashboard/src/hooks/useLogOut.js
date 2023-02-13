import axios from "../api/axios";
import { logout } from "../state/reducers/auth";
import { useDispatch, useSelector } from "react-redux";

const useLogOut = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    try {
      const req = await axios.post("/sign-out", null, {
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
      });
      console.log(req);
      localStorage.removeItem("persist");
      dispatch(logout());
    } catch (error) {
      console.log(error);
      console.log("wtf");
      dispatch(logout({ error: error.message }));
    }
  };
  return handleLogOut;
};

export default useLogOut;
