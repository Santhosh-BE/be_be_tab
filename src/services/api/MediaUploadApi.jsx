import { createApi } from '@reduxjs/toolkit/query/react';
import CustomFetchBase from './CustomFetchBase';

export const MediaUploadApi = createApi({
  reducerPath: 'MediaUploadApi',
  baseQuery: CustomFetchBase,
  endpoints: (builder) => ({
    singleImageUploadApi: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          url: `api/media/upload/single`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['mediaUpload'],
    }),
    multipleImageUploadApi: builder.mutation({
      query: (files) => {
        const formData = new FormData();
        files.forEach((file) => {
          formData.append('files', file);
        });

        return {
          url: `api/media/upload/multiple`,
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
      },
      invalidatesTags: ['mediaUpload'],
    }),
    singleVideoUploadApi: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          url: `api/media/upload/video`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['mediaUpload'],
    }),
  }),
});
export const {
  useSingleImageUploadApiMutation,
  useMultipleImageUploadApiMutation,
  useSingleVideoUploadApiMutation,
} = MediaUploadApi;
