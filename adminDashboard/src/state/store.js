import { configureStore } from "@reduxjs/toolkit";
import auth from "./reducers/auth";
import apiSlice from "../api/baseQuery";
import category from "./reducers/category";
import products from "./reducers/products";
const store = configureStore({
  reducer: {
    auth: auth.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    category,
    product: products,
  },
  middleware: (def) => def().concat(apiSlice.middleware),
  devTools: true,
});
export { store };
