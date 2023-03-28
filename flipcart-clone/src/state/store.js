import { configureStore } from "@reduxjs/toolkit";
import category from "./reducers/category";
import page from "./reducers/page";
import product from "./reducers/products";
import auth from "./reducers/auth";
import cart from "./reducers/cart";
const store = configureStore({
  reducer: {
    category,
    product,
    page,
    auth,
    cart,
  },
  devTools: true,
});
export { store };
