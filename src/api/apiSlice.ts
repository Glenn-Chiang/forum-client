import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { AuthPayload } from "../auth/AuthPayload";
import {
  Comment,
  CommentList,
  CommentUpdate,
  NewComment,
  NewPost,
  NewUser,
  Post,
  PostList,
  PostTagsUpdate,
  PostUpdate,
  Topic,
  User,
} from "./models";
import {
  parseComments,
  parsePost,
  parsePosts,
  parseTopics,
} from "./response_schemas";
import { serializeRequestBody } from "./serialization";

interface getPostsQueryArgs {
  page?: number;
  limit?: number;
  sortBy?: string;
  tags?: string[];
}

interface getPostCommentsQueryArgs {
  postId: number;
  limit?: number;
  page?: number;
  sortBy?: string;
}

// Build the GET /posts url with the given query parameters
const buildGetPostsUrl = ({ page = 1, limit = 10, sortBy, tags }: getPostsQueryArgs): string => {
  // Set query params
  const queryParams = new URLSearchParams()
  queryParams.set("page", page.toString())
  queryParams.set("limit", limit.toString())
  queryParams.set("sort", sortBy || "new")

  // Add multiple "tag" param values
  if (tags) {
    tags.forEach(tag => queryParams.append("tag", tag.toString()))
  }

  return `/posts?${queryParams.toString()}`
}

// Build the GET /posts/:id/comments url with the given query parameters
const buildGetPostCommentsUrl = ({ postId, page = 1, limit = 10, sortBy}: getPostCommentsQueryArgs): string => {
  // Set query params
  const queryParams = new URLSearchParams()
  queryParams.set("page", page.toString())
  queryParams.set("limit", limit.toString())
  queryParams.set("sort", sortBy || "new")

  return `/posts/${postId}/comments?${queryParams.toString()}`
}

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
    // Queries

    getPosts: builder.query<PostList, getPostsQueryArgs>({
      query: buildGetPostsUrl,
      providesTags: ["posts"],
      transformResponse: parsePosts,
    }),
    getPostComments: builder.query<CommentList, getPostCommentsQueryArgs>({
      query: buildGetPostCommentsUrl,
      providesTags: (_res, _err, { postId }) => [
        { type: "comments", id: postId },
      ],
      transformResponse: parseComments,
    }),
    getTopics: builder.query<Topic[], void>({
      query: () => "/topics",
      providesTags: ["topics"],
      transformResponse: parseTopics,
    }),
    getPost: builder.query<Post, string>({
      query: (id) => `/posts/${id}`,
      providesTags: (_res, _err, id) => [{ type: "posts", id }],
      transformResponse: parsePost,
    }),

    // Mutations

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
