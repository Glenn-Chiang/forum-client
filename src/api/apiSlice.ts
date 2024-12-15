import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Comment, Post } from "./models";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "/posts",
    }),
    getPost: builder.query<Post, string>({
      query: (postId) => `/posts/${postId}`,
    }),
    getPostComments: builder.query<Comment[], string>({
      query: (postId) => `/posts/${postId}/comments`,
    }),
  }),
});

export const { useGetPostsQuery, useGetPostQuery, useGetPostCommentsQuery } =
  apiSlice;
