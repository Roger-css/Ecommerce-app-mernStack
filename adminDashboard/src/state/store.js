import { configureStore } from "@reduxjs/toolkit";
import auth from "./reducers/auth";
import apiSlice from "../api/baseQuery";
import category from "./reducers/category";
const store = configureStore({
  reducer: {
    auth: auth.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    category,
  },
  middleware: (def) => def().concat(apiSlice.middleware),
  devTools: true,
});
export { store };
