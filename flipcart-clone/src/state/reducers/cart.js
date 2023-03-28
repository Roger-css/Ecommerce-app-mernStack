import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProducts: JSON.parse(localStorage.getItem("myCart")) || {},
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      const keys = Object.keys(state.cartProducts);
      const qtyPlus = keys.find((item) => item == action.payload._id);
      qtyPlus
        ? (state.cartProducts[qtyPlus].qty += 1)
        : (state.cartProducts[action.payload._id] = action.payload);
      localStorage.setItem("myCart", JSON.stringify(state.cartProducts));
    },
    decreaseQty: (state, action) => {
      const keys = Object.keys(state.cartProducts);
      const alreadyThere = keys.find((item) => item == action.payload._id);
      alreadyThere
        ? (state.cartProducts[alreadyThere].qty -= 1)
        : (state.cartProducts[action.payload._id] = action.payload);
      localStorage.setItem("myCart", JSON.stringify(state.cartProducts));
    },
    removeProductFromCart: (state, action) => {
      const keys = Object.keys(state.cartProducts);
      const alreadyThere = keys.find((item) => item == action.payload._id);
      delete state.cartProducts[alreadyThere];
      localStorage.setItem("myCart", JSON.stringify(state.cartProducts));
    },
  },
});

export default cartSlice.reducer;
export const { addProductToCart, decreaseQty, removeProductFromCart } =
  cartSlice.actions;
