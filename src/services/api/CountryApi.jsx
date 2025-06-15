import { createApi } from '@reduxjs/toolkit/query/react';
import CustomFetchBase from './CustomFetchBase';

export const CountryApi = createApi({
  reducerPath: 'CountryApi',
  baseQuery: CustomFetchBase,
  tagTypes: ['Country'],
  endpoints: (builder) => ({
    countryCreateApi: builder.mutation({
      query: (body) => ({
        url: `api/countries`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Country'],
    }),
    getCountryListApi: builder.query({
      query: () => ({
        url: `api/countries`,
      }),
      providesTags: ['Country'],
    }),
    getCountryByIdApi: builder.query({
      query: ({ id }) => ({
        url: `api/countries/${id}`,
      }),
    }),
    updateCountryApi: builder.mutation({
      query: ({ body, id }) => ({
        url: `api/countries/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Country'],
    }),
    deleteCountryApi: builder.mutation({
      query: ({ id }) => ({
        url: `api/countries/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Country'],
    }),
  }),
});
export const {
  useCountryCreateApiMutation,
  useGetCountryListApiQuery,
  useGetCountryByIdApiQuery,
  useUpdateCountryApiMutation,
  useDeleteCountryApiMutation,
} = CountryApi;
