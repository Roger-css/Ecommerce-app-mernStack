import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  addresses: [
    {
      _id: "12321",
      name: "mustafa",
      mobileNumber: "07813789596",
      pinCode: 1234,
      locality: "middleEastern",
      address: "iraq",
      cityDistrictTown: "nassiryah",
      state: "shattrah",
      landmark: "null",
      alternatePhone: null,
      addressType: "I donno man",
    },
  ],
};
const addressSlice = createSlice({
  initialState,
  name: "page",
  reducers: {
    addAddress: (state, action) => {
      state.addresses.push(action.payload);
    },
  },
});
export default addressSlice.reducer;
export const { addAddress } = addressSlice.actions;
