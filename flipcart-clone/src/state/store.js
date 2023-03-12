import { configureStore } from "@reduxjs/toolkit";
import category from "./reducers/category";
import page from "./reducers/page";
import product from "./reducers/products";
import auth from "./reducers/auth";
const store = configureStore({
  reducer: {
    category,
    product,
    page,
    auth,
  },
  devTools: true,
});
export { store };
