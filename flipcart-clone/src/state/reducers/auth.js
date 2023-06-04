import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: null,
  authenticated: localStorage.getItem("authenticated") || false,
  user: {
    userName: "",
    email: "",
  },
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user.userName = action.payload.username;
      state.user.email = action.payload.email;
      state.authenticated = true;
      localStorage.setItem("authenticated", true);
    },
    logout: (state) => {
      state.token = null;
      state.user.userName = "";
      state.authenticated = false;
      localStorage.removeItem("authenticated");
    },
  },
});
export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
