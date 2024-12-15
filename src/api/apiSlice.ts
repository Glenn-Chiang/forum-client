import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Comment,
  CommentUpdate,
  NewComment,
  NewPost,
  Post,
  PostUpdate,
} from "./models";
import { snakeCase } from "change-case/keys";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  tagTypes: ["posts", "comments"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "/posts",
      providesTags: ["posts"],
    }),
    getPost: builder.query<Post, string>({
      query: (id) => `/posts/${id}`,
      providesTags: (_res, _err, id) => [{ type: "posts", id }],
    }),
    createPost: builder.mutation<Post, NewPost>({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: snakeCase(post),
      }),
      invalidatesTags: ["posts"],
    }),
    updatePost: builder.mutation<Post, PostUpdate>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: "PATCH",
        body: { title: post.title, content: post.content },
      }),
      invalidatesTags: (_res, _err, { id }) => [{ type: "posts", id }],
    }),
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_res, _err, id) => ['posts', { type: "posts", id }],
    }),
    getPostComments: builder.query<Comment[], string>({
      query: (postId) => `/posts/${postId}/comments`,
      providesTags: (_res, _err, postId) => [{ type: "comments", id: postId }],
    }),
    createComment: builder.mutation<Comment, NewComment>({
      query: (comment) => ({
        url: "/comments",
        method: "POST",
        body: snakeCase(comment),
      }),
      invalidatesTags: ["comments"],
    }),
    updateComment: builder.mutation<Comment, CommentUpdate>({
      query: (comment) => ({
        url: `/comments/${comment.id}`,
        method: "PATCH",
        body: { content: comment.content },
      }),
      invalidatesTags: (_res, _err, { postId }) => [
        { type: "comments", id: postId },
      ],
    }),
    deleteComment: builder.mutation<void, Comment>({
      query: (comment) => ({
        url: `/comments/${comment.id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_res, _err, {postId}) => [{ type: "comments", id: postId }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetPostCommentsQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = apiSlice;
