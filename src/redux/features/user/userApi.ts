import { baseApi } from "../../api/baseApi";

const userInfoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => {
        return {
          url: "/user",
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),

    getMyData: builder.query({
      query: (data) => {
        return {
          url: "/user/me",
          method: "GET",
          body: data,
        };
      },
      providesTags: ["user"],
    }),

    getSingleUser: builder.query({
      query: (id) => {
        return {
          url: `/user/${id}`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),

    updateUser: builder.mutation({
      query: (data) => {
        return {
          url: `/user/${data.id}`,
          method: "PUT",
          body: data.data,
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useGetMyDataQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
} = userInfoApi;
