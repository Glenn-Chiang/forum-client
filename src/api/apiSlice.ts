import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Comment, NewPost, Post } from "./models";
import { snakeCase } from "change-case/keys";

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
    createPost: builder.mutation<Post, NewPost>({
      query: (newPost) => ({
        url: "/posts",
        method: "POST",
        body: snakeCase(newPost),
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetPostCommentsQuery,
  useCreatePostMutation,
} = apiSlice;
