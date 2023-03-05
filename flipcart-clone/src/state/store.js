import { configureStore } from "@reduxjs/toolkit";
import category from "./reducers/category";
import page from "./reducers/page";
import product from "./reducers/products";
page;
const store = configureStore({
  reducer: {
    category,
    product,
    page,
  },
  devTools: true,
});
export { store };
