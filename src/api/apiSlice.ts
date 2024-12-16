import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { snakeCase, camelCase } from "change-case/keys";

import {
  Comment,
  CommentUpdate,
  NewComment,
  NewPost,
  Post,
  PostTagsUpdate,
  PostUpdate,
  Topic,
} from "./models";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  tagTypes: ["posts", "comments", "topics"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "/posts",
      providesTags: ["posts"],
    }),
    getPost: builder.query<Post, string>({
      query: (id) => `/posts/${id}`,
      providesTags: (_res, _err, id) => [{ type: "posts", id }],
      transformResponse: (res, _meta, _arg) => camelCase(res) as Post, // Transform json from snake_case to camelCase
    }),
    createPost: builder.mutation<Post, NewPost>({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: snakeCase(post),
      }),
      // When post is created, refetch the list of all posts
      invalidatesTags: ["posts"],
    }),
    updatePost: builder.mutation<Post, PostUpdate>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: "PATCH",
        body: { title: post.title, content: post.content },
      }),
      // When post is updated, refetch the post
      invalidatesTags: (_res, _err, { id }) => [{ type: "posts", id }],
    }),
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      // When post is deleted, refetch the list of all posts
      invalidatesTags: ["posts"],
    }),
    getPostComments: builder.query<Comment[], string>({
      query: (postId) => `/posts/${postId}/comments`,
      providesTags: (_res, _err, postId) => [{ type: "comments", id: postId }],
      transformResponse: (res: Comment[], _meta, _arg) =>
        res.map((comment) => camelCase(comment)) as Comment[], // Transform json from snake_case to camelCase
    }),
    createComment: builder.mutation<Comment, NewComment>({
      query: (comment) => ({
        url: "/comments",
        method: "POST",
        body: snakeCase(comment),
      }),
      // When new comment is created, refetch all comments for the post
      invalidatesTags: (_res, _err, { postId }) => [
        { type: "comments", id: postId },
      ],
    }),
    updateComment: builder.mutation<Comment, CommentUpdate>({
      query: (comment) => ({
        url: `/comments/${comment.id}`,
        method: "PATCH",
        body: { content: comment.content },
      }),
      // When comment is updated, refetch all comments for the post
      invalidatesTags: (_res, _err, { postId }) => [
        { type: "comments", id: postId },
      ],
    }),
    deleteComment: builder.mutation<void, Comment>({
      query: (comment) => ({
        url: `/comments/${comment.id}`,
        method: "DELETE",
      }),
      // When comment is deleted, refetch all comments for the post
      invalidatesTags: (_res, _err, { postId }) => [ //
        { type: "comments", id: postId },
      ],
    }),
    getTopics: builder.query<Topic[], void>({
      query: () => "/topics",
      providesTags: ["topics"],
    }),
    updatePostTags: builder.mutation<void, PostTagsUpdate>({
      query: (data) => ({
        url: `/posts/${data.postId}/topics`,
        method: "PUT",
        body: { topic_ids: data.topicIds },
      }),
      // When post tags are updated, refetch the post
      invalidatesTags: (_res, _err, { postId: id }) => [{ type: "posts", id }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetPostCommentsQuery,
  useGetTopicsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useUpdatePostTagsMutation,
  useDeletePostMutation,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = apiSlice;
