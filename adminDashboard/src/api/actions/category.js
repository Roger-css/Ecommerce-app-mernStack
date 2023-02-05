import apiSlice from "../baseQuery";

const categoriesEndPoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCats: builder.query({
      query: () => "/category/getAllCategories",
    }),
    createCat: builder.mutation({
      query: (credential) => ({
        url: "/category/create",
        method: "POST",
        body: { ...credential },
      }),
    }),
  }),
});
export const { useGetAllCatsQuery, useCreateCatMutation } = categoriesEndPoints;
