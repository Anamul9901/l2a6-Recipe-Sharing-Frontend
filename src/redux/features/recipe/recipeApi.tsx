import { baseApi } from "../../api/baseApi";

const recipeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRecipe: builder.query({
      query: () => {
        return {
          url: `/recipe`,
          method: "GET",
        };
      },
      providesTags: ["recipe"],
    }),

    getAllRecipeWithShort: builder.query({
      query: (args) => {
        return {
          url: `/recipe/short?page=${args?.page}&limit=${args?.limit}`,
          method: "GET",
        };
      },
      providesTags: ["recipe"],
    }),

    getSingleRecipe: builder.query({
      query: (id) => {
        return {
          url: `/recipe/${id}`,
          method: "GET",
        };
      },
      providesTags: ["recipe"],
    }),

    addRecipe: builder.mutation({
      query: (data) => {
        console.log("data", data);
        return {
          url: "/recipe",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["recipe"],
    }),

    updateRecipe: builder.mutation({
      query: (data) => {
        return {
          url: `/recipe/${data?.id}`,
          method: "PUT",
          body: data?.data,
        };
      },
      invalidatesTags: ["recipe"],
    }),

    deleteRecipe: builder.mutation({
      query: (id) => {
        return {
          url: `/recipe/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["recipe"],
    }),
  }),
});

export const {
  useGetAllRecipeQuery,
  useGetSingleRecipeQuery,
  useGetAllRecipeWithShortQuery,
  useAddRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} = recipeApi;
