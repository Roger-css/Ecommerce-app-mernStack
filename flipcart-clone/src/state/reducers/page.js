import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  pages: {},
};
const pageSlice = createSlice({
  initialState,
  name: "page",
  reducers: {
    addPage: (state, action) => {
      state.pages = action.payload;
    },
  },
});
export default pageSlice.reducer;
export const { addPage } = pageSlice.actions;
