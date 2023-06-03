import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  addresses: [],
};
const addressSlice = createSlice({
  initialState,
  name: "page",
  reducers: {
    addAddress: (state, action) => {
      state.addresses = action.payload;
    },
  },
});
export default addressSlice.reducer;
export const { addAddress } = addressSlice.actions;
