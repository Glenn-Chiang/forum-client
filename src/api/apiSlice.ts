import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Comment, NewPost, Post } from "./models";
import { snakeCase } from "change-case/keys";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  tagTypes: ['post', 'comment'],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "/posts",
      providesTags: ['post']
    }),
    getPost: builder.query<Post, string>({
      query: (postId) => `/posts/${postId}`,
    }),
    createPost: builder.mutation<Post, NewPost>({
      query: (newPost) => ({
        url: "/posts",
        method: "POST",
        body: snakeCase(newPost),
      }),
      invalidatesTags: ['post']
    }),
    getPostComments: builder.query<Comment[], string>({
      query: (postId) => `/posts/${postId}/comments`,
      providesTags: ['comment']
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetPostCommentsQuery,
  useCreatePostMutation,
} = apiSlice;
