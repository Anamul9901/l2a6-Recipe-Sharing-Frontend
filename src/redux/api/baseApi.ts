import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://l2-a6-recipe-sharing-server.vercel.app/api',
    // baseUrl: "http://localhost:5000/api",
    // credentials: "include",
  }),
  tagTypes: ['recipe'],
  endpoints: () => ({}),
});
