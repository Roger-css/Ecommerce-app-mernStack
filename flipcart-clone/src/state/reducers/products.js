import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  allProducts: [],
  productsByPrice: {
    productsUnder5k: [],
    productsUnder10k: [],
    productsUnder15k: [],
    productsUnder20k: [],
    productsUnder25k: [],
    productsUnder30k: [],
  },
};
const productSlice = createSlice({
  initialState,
  name: "product",
  reducers: {
    addProducts: (state, action) => {
      state.allProducts = action.payload.products;
      state.productsByPrice.productsUnder5k =
        action.payload.productsByPrice.under5k;

      state.productsByPrice.productsUnder10k =
        action.payload.productsByPrice.under10k;

      state.productsByPrice.productsUnder15k =
        action.payload.productsByPrice.under15k;

      state.productsByPrice.productsUnder20k =
        action.payload.productsByPrice.under20k;

      state.productsByPrice.productsUnder25k =
        action.payload.productsByPrice.under25k;
      state.productsByPrice.productsUnder30k =
        action.payload.productsByPrice.under30k;
    },
  },
});

export default productSlice.reducer;
export const { addProducts } = productSlice.actions;
