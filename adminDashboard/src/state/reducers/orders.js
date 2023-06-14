import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  orders: [],
};
const ordersSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});
export default ordersSlice.reducer;
export const {} = ordersSlice.actions;
