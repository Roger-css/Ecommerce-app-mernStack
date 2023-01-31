import { configureStore } from "@reduxjs/toolkit";
import auth from "./reducers/auth";
import { apiSlice } from "../api/baseQuery";
const store = configureStore({
  reducer: {
    auth: auth.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (def) => def().concat(apiSlice.middleware),
  devTools: true,
});
export { store };
