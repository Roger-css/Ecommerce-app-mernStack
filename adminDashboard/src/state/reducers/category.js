import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  categories: [],
  loading: true,
};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addAllCategories: (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    },
  },
});
export default categorySlice.reducer;
export const { addAllCategories } = categorySlice.actions;
