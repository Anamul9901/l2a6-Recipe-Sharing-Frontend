import { baseApi } from "../../api/baseApi";

const followerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFollower: builder.query({
      query: () => {
        return {
          url: "/follower",
          method: "GET",
        };
      },
      providesTags: ["follower"],
    }),

    addFollower: builder.mutation({
      query: (data) => {
        return {
          url: "/follower",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["follower"],
    }),

    deleteFollower: builder.mutation({
      query: (id) => {
        return {
          url: `/follower/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["follower"],
    }),
  }),
});

export const {
  useGetAllFollowerQuery,
  useAddFollowerMutation,
  useDeleteFollowerMutation,
} = followerApi;
