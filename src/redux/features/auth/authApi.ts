import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/user/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/signup",
        method: "POST",
        body: userInfo,
      }),
    }),

    forgetPassword: builder.mutation({
      query: (userInfo) => ({
        url: "/user/forgate-password",
        method: "POST",
        body: userInfo,
      }),
    }),

    resitPassword: builder.mutation({
      query: (data) => ({
        url: `/user/reset-password/${data?.token}`,
        method: "PATCH",
        body: data?.data,
      }),
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: `/user/change-password`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgetPasswordMutation,
  useResitPasswordMutation,
  useChangePasswordMutation,
} = authApi;
