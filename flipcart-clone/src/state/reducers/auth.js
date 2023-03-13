import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: null,
  authenticated: false,
  user: {
    userName: "",
  },
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user.userName = action.payload.username;
      state.authenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.user.userName = "";
      state.authenticated = false;
    },
  },
});
export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
