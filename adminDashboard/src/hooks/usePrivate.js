import axios from "axios";
import { useSelector } from "react-redux";

const usePrivate = () => {
  const token = useSelector((state) => state.auth.token);
  const ax = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return ax;
};

export default usePrivate;
