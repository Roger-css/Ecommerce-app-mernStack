import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  allProducts: [],
  productsByPrice: {
    productsUnder10k: [],
    productsUnder15k: [],
    productsUnder20k: [],
  },
};
const productSlice = createSlice({
  initialState,
  name: "product",
  reducers: {
    addProducts: (state, action) => {
      state.products = action.payload.allProducts;
      state.productsUnder10k = action.payload.productsUnder10k;
      state.productsUnder15k = action.payload.productsUnder15k;
      state.productsUnder20k = action.payload.productsUnder20k;
    },
  },
});
