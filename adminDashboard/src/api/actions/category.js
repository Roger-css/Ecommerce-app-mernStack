import apiSlice from "../baseQuery";

const categoriesEndPoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCat: builder.mutation({
      query: (credential) => ({
        url: "/category/create",
        method: "POST",
        body: { ...credential },
      }),
    }),
  }),
});
export const { useCreateCatMutation, useUpdateCatMutation } =
  categoriesEndPoints;
