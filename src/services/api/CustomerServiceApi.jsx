import { createApi } from '@reduxjs/toolkit/query/react';
import CustomFetchBase from './CustomFetchBase';

export const CustomerServiceApi = createApi({
  reducerPath: 'CustomerServiceApi',
  baseQuery: CustomFetchBase,
  endpoints: (builder) => ({
    customerCareCreateApi: builder.mutation({
      query: (body) => ({
        url: `api/customerCare`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['customerCare'],
    }),
    getCustomerListApi: builder.query({
      query: () => ({
        url: `api/customerCare`,
      }),
      providesTags: ['customerCare'],
    }),
    getCustomerCareByIdApi: builder.query({
      query: ({ id }) => ({
        url: `api/customerCare/${id}`,
      }),
    }),
    updateCustomerCareApi: builder.mutation({
      query: ({ body, id }) => ({
        url: `api/customerCare/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['customerCare'],
    }),
    deleteCustomerCareApi: builder.mutation({
      query: ({ id }) => ({
        url: `api/customerCare/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['customerCare'],
    }),
  }),
});
export const {
  useGetCustomerListApiQuery,
  useCustomerCareCreateApiMutation,
  useGetCustomerCareByIdApiQuery,
  useUpdateCustomerCareApiMutation,
} = CustomerServiceApi;
