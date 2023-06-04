import useAxios from "../hooks/usePrivate";
import { logout } from "../state/reducers/auth";
import { useDispatch } from "react-redux";

const useLogOut = () => {
  const axios = useAxios();
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    try {
      await axios.post("/sign-out", null);
      localStorage.removeItem("authenticated");
      dispatch(logout());
    } catch (error) {
      dispatch(logout({ error: error.message }));
    }
  };
  return handleLogOut;
};

export default useLogOut;
