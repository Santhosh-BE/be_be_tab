import { createApi } from '@reduxjs/toolkit/query/react';
import CustomFetchBase from './CustomFetchBase';

export const AuthApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery: CustomFetchBase,
  endpoints: (builder) => ({
    loginApi: builder.mutation({
      query: (body) => ({
        url: `api/auth/login`,
        method: 'POST',
        body: body,
      }),
    }),
    signUpApi: builder.mutation({
      query: (body) => ({
        url: `api/auth/signup`,
        method: 'POST',
        body: body,
      }),
    }),
  }),
});
export const { useLoginApiMutation, useSignUpApiMutation } = AuthApi;
