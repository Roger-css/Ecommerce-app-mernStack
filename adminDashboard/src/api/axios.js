import ax from "axios";
const axios = ax.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  headers: {},
});

export default axios;
