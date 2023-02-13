import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: null,
  user: {},
  authenticated: false,
  persistent: JSON.parse(localStorage.getItem("persist")) || false,
  error: "",
};
const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.authenticated = true;
      state.token = action.payload.token;
      state.user.userName = action.payload.user?.userName;
    },

    logout(state, action) {
      state.token = null;
      state.user = {};
      state.authenticated = false;
      state.error = action.payload?.error || "";
    },
  },
});
export const authenticated = (state) => state.auth.authenticated;
export default auth;
export const { login, logout } = auth.actions;
