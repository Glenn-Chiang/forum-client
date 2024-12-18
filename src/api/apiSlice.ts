import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { AuthPayload } from "../auth/AuthPayload";
import {
  Comment,
  CommentUpdate,
  NewComment,
  NewPost,
  NewUser,
  Post,
  PostTagsUpdate,
  PostUpdate,
  Topic,
  User,
} from "./models";
import { parseComments, parsePost, parsePosts, parseTopics } from "./response_schemas";
import { serializeRequestBody } from "./serialization";

// Redux slice to handle data fetching and caching
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080", // API domain
    prepareHeaders: (headers) => {
      // Retrieve token from localStorage and set Authorization header using Bearer scheme
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  // Cache tags for automatic invalidation
  tagTypes: ["posts", "comments", "topics"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "/posts",
      providesTags: ["posts"],
      transformResponse: parsePosts
    }),
    getPost: builder.query<Post, string>({
      query: (id) => `/posts/${id}`,
      providesTags: (_res, _err, id) => [{ type: "posts", id }],
      transformResponse: parsePost
    }),
    getPostComments: builder.query<Comment[], string>({
      query: (postId) => `/posts/${postId}/comments`,
      providesTags: (_res, _err, postId) => [{ type: "comments", id: postId }],
      transformResponse: parseComments
    }),
    getTopics: builder.query<Topic[], void>({
      query: () => "/topics",
      providesTags: ["topics"],
      transformResponse: parseTopics
    }),

    createPost: builder.mutation<Post, NewPost>({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: serializeRequestBody(post),
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

    createComment: builder.mutation<Comment, NewComment>({
      query: (comment) => ({
        url: "/comments",
        method: "POST",
        body: serializeRequestBody(comment),
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
      invalidatesTags: (_res, _err, { postId }) => [
        //
        { type: "comments", id: postId },
      ],
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

    createUser: builder.mutation<User, NewUser>({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: serializeRequestBody(data),
      }),
    }),

    login: builder.mutation<AuthPayload, NewUser>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
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
  useCreateUserMutation,
  useLoginMutation,
} = apiSlice;
