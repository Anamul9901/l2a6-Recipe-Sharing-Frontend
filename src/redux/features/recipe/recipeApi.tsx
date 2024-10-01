import { baseApi } from "../../api/baseApi";

const recipeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRecipe: builder.query({
      query: () => {
        return {
          url: "/recipe",
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
        console.log("data", data);
        return {
          url: `/recipe/${data?.id}`,
          method: "PUT",
          body: data?.data,
        };
      },
      invalidatesTags: ["recipe"],
    }),
  }),
});

export const {
  useGetAllRecipeQuery,
  useAddRecipeMutation,
  useUpdateRecipeMutation,
} = recipeApi;
