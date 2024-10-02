import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrder: builder.query({
      query: () => {
        return {
          url: "/order",
          method: "GET",
        };
      },
      providesTags: ["order"],
    }),

    createOrder: builder.mutation({
      query: (data) => {
        return {
          url: "/order/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["order"],
    }),
  }),
});

export const { useGetAllOrderQuery, useCreateOrderMutation } = orderApi;
