import apiSlice from "../baseQuery";

const authActions = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/admin/sign-in",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/admin/sign-up",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});
export const { useLoginMutation, useRegisterMutation } = authActions;
