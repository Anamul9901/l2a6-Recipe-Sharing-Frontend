import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://l2-a6-recipe-sharing-server.vercel.app/api' }),
  endpoints: (builder) => ({
    getAllRecipe: builder.query({
      query: () => `/recipe`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllRecipeQuery } = baseApi