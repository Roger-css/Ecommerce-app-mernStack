import { configureStore } from "@reduxjs/toolkit";
import category from "./reducers/category";
import product from "./reducers/products";
const store = configureStore({
  reducer: {
    category,
    product,
  },
  devTools: true,
});
export { store };
