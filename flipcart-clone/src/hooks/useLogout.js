import useAxios from "../hooks/usePrivate";
import { logout } from "../state/reducers/auth";
import { useDispatch } from "react-redux";

const useLogOut = () => {
  const axios = useAxios();
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    try {
      const req = await axios.post("/sign-out", null);
      console.log("done");
      localStorage.removeItem("authenticated");
      dispatch(logout());
    } catch (error) {
      console.log(error);
      dispatch(logout({ error: error.message }));
    }
  };
  return handleLogOut;
};

export default useLogOut;
