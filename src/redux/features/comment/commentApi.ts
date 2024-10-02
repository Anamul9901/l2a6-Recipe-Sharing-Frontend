import { baseApi } from "../../api/baseApi";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllComment: builder.query({
      query: () => {
        return {
          url: "/comment",
          method: "GET",
        };
      },
      providesTags: ["comment"],
    }),

    getSingleComment: builder.query({
      query: (id) => {
        return {
          url: `/comment/${id}`,
          method: "GET",
        };
      },
      providesTags: ["comment"],
    }),

    addComment: builder.mutation({
      query: (data) => {
        return {
          url: "/comment",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["comment"],
    }),

    updateComment: builder.mutation({
      query: (data) => {
        return {
          url: `/comment/${data?.id}`,
          method: "Put",
          body: data?.data,
        };
      },
      invalidatesTags: ["comment"],
    }),

    deleteComment: builder.mutation({
      query: (id) => {
        return {
          url: `/comment/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["comment"],
    }),
  }),
});

export const {
  useGetAllCommentQuery,
  useAddCommentMutation,
  useGetSingleCommentQuery,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
