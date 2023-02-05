import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getAllCategories: (state, action) => {
      state.categories = action.payload;
    },
    addNewCategory: (state, action) => {
      state.categories += action.payload;
    },
  },
});
export default categorySlice.reducer;
export const { getAllCategories, addNewCategory } = categorySlice.actions;
