import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_ENDPOINT = '/comments';
const BASE_URL = 'https://6393b5f2ab513e12c514f63c.mockapi.io/api';

export const commentApi = createApi({
  reducerPath: 'comments',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['Comments'],
  endpoints: (builder) => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getComments: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: () => API_ENDPOINT,
      providesTags: ['Comments'],
    }),
    addNewComment: builder.mutation({
      query: (newComment) => ({
        url: API_ENDPOINT,
        method: 'POST',
        // Include the entire post object as the body of the request
        body: newComment,
      }),
      invalidatesTags: ['Comments'],
    }),
    updateComment: builder.mutation({
      query: ({ id, ...comment }) => ({
        url: `${API_ENDPOINT}/${id}`,
        method: 'PUT',
        body: comment,
      }),
      invalidatesTags: ['Comments'],
    }),
  }),
});

export const { useGetCommentsQuery, useAddNewCommentMutation, useUpdateCommentMutation } = commentApi;
