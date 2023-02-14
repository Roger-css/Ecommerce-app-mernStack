import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: {},
};
const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addAllProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});
export default productsSlice.reducer;

export const { addAllProducts } = productsSlice.actions;
