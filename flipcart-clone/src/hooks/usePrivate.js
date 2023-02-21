import axios from "axios";

const usePrivate = () => {
  const ax = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
  });
  return ax;
};

export default usePrivate;
