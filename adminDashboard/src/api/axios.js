import ax from "axios";
const axios = ax.create({
  baseURL: "http://localhost:3000/api/admin",
  withCredentials: true,
  headers: {},
});

export default axios;
