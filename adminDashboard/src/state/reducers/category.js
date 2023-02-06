import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};
const buildNewCategories = (parentId, categories, category) => {
  let myCategories = [];

  if (parentId == undefined) {
    return [
      ...categories,
      {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        children: [],
      },
    ];
  }

  for (let cat of categories) {
    if (cat._id == parentId) {
      myCategories.push({
        ...cat,
        children: cat.children
          ? buildNewCategories(
              parentId,
              [
                ...cat.children,
                {
                  _id: category._id,
                  name: category.name,
                  slug: category.slug,
                  parentId: category.parentId,
                  children: category.children,
                },
              ],
              category
            )
          : [],
      });
    } else {
      myCategories.push({
        ...cat,
        children: cat.children
          ? buildNewCategories(parentId, cat.children, category)
          : [],
      });
    }
  }

  return myCategories;
};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addAllCategories: (state, action) => {
      state.categories = action.payload;
    },
    addNewCategory: (state, action) => {
      state.categories += action.payload;
    },
  },
});
export default categorySlice.reducer;
export const { addAllCategories, addNewCategory } = categorySlice.actions;
