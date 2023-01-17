import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
// a fetch api to make a new user in the database
const authUser = createAsyncThunk("auth/authUser", (payload) => {
  return fetch("api/sign-up", {
    method: "POST",
    body: payload,
  });
});

const initialState = {
  token: null,
  user: {},
  authenticated: false,
  authenticating: false,
  error: "",
};
const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.authenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state, action) => {
      state.token = null;
      state.user = {};
      state.authenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authUser.pending, (state, action) => {
      state.authenticating = true;
    });
    builder.addCase(authUser.fulfilled, (state, action) => {
      state.authenticated = true;
      state.authenticating = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
    });
    builder.addCase(authUser.rejected, (state, action) => {
      state.authenticating = false;
      state.error = action.error.message;
    });
  },
});
export default auth;
export { authUser };
