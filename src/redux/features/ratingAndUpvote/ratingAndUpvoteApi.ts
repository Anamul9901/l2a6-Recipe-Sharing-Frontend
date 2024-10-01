import { baseApi } from "../../api/baseApi";

const ratingAndUpvoteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRatingAndUpvote: builder.query({
      query: () => {
        return {
          url: "/rating",
          method: "GET",
        };
      },
      providesTags: ["rating"],
    }),

    addRatingOrUpvote: builder.mutation({
      query: (data) => {
        return {
          url: "/rating",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["rating"],
    }),

    deleteRatingOrUpvote: builder.mutation({
      query: (id) => {
        return {
          url: `/rating/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["rating"],
    }),
  }),
});

export const {
  useGetAllRatingAndUpvoteQuery,
  useAddRatingOrUpvoteMutation,
  useDeleteRatingOrUpvoteMutation,
} = ratingAndUpvoteApi;
