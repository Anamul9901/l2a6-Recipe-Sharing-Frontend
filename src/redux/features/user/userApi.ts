import { baseApi } from "../../api/baseApi";

const userInfoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: (email) => {
        return {
          url: "/user",
          method: "GET",
          params: { email },
        };
      },
    }),

    getSingleUser: builder.query({
      query: (data) => {
        return {
          url: "/user",
          method: "GET",
          body: data,
        };
      },
    }),
  }),
});

export const { useGetAllUserQuery, useGetSingleUserQuery } = userInfoApi;
