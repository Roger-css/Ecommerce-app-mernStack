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
    updateCat: builder.mutation({
      query: (credential) => ({
        url: "/category/update",
        method: "POST",
        body: credential,
        headers: {
          "content-type": "multipart/form-data",
        },
      }),
    }),
  }),
});
export const { useCreateCatMutation, useUpdateCatMutation } =
  categoriesEndPoints;
