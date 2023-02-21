import { configureStore } from "@reduxjs/toolkit";
import category from "./reducers/category";
const store = configureStore({
  reducer: {
    category,
  },
  devTools: true,
});
export { store };
