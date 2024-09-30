import { baseApi } from '../../api/baseApi';

const recipeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRecipe: builder.query({
      query: () => {
        return {
          url: '/recipe',
          method: 'GET',
        };
      },
      providesTags: ['recipe'],
    }),

    addRecipe: builder.mutation({
      query: (data) => {
        return {
          url: '/recipe',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['recipe'],
    }),
  }),
});

export const { useGetAllRecipeQuery, useAddRecipeMutation } = recipeApi;
