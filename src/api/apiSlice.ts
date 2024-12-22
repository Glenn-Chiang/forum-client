import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { AuthPayload } from "../auth/AuthPayload";
import {
  Comment,
  CommentList,
  CommentUpdate,
  CommentVoteUpdate,
  NewComment,
  NewPost,
  NewUser,
  Post,
  PostList,
  PostTagsUpdate,
  PostUpdate,
  PostVoteUpdate,
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
const buildGetPostsUrl = ({
  page = 1,
  limit = 10,
  sortBy,
  tags,
}: getPostsQueryArgs): string => {
  // Set query params
  const queryParams = new URLSearchParams();
  queryParams.set("page", page.toString());
  queryParams.set("limit", limit.toString());
  queryParams.set("sort", sortBy || "new");

  // Add multiple "tag" param values
  if (tags) {
    tags.forEach((tag) => queryParams.append("tag", tag.toString()));
  }

  return `/posts?${queryParams.toString()}`;
};

// Build the GET /posts/:id/comments url with the given query parameters
const buildGetPostCommentsUrl = ({
  postId,
  page = 1,
  limit = 10,
  sortBy,
}: getPostCommentsQueryArgs): string => {
  // Set query params
  const queryParams = new URLSearchParams();
  queryParams.set("page", page.toString());
  queryParams.set("limit", limit.toString());
  queryParams.set("sort", sortBy || "new");

  return `/posts/${postId}/comments?${queryParams.toString()}`;
};

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
      providesTags: (result) =>
        result
          ? // Assign a cache tag to each post in the list
            [
              "posts",
              ...result.data.map((post) => ({
                type: "posts" as const,
                id: post.id,
              })),
            ]
          : ["posts"],
      transformResponse: parsePosts,
    }),
    getPostComments: builder.query<CommentList, getPostCommentsQueryArgs>({
      query: buildGetPostCommentsUrl,
      providesTags: (result, _err, { postId }) =>
        result
          ? [
              // Assign a cache tag to the list of comments associated with this post
              { type: "comments", id: `post_${postId}` },
              // Assign a cache tag to each comment in the list
              ...result.data.map((comment) => ({
                type: "comments" as const,
                id: comment.id,
              })),
            ]
          : // Assign a cache tag to the list of comments associated with this post
            [{ type: "comments", id: `post_${postId}` }],
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
        { type: "comments", id: `post_${postId}` },
      ],
    }),
    updateComment: builder.mutation<Comment, CommentUpdate>({
      query: (comment) => ({
        url: `/comments/${comment.id}`,
        method: "PATCH",
        body: { content: comment.content },
      }),
      // When comment is updated, refetch the comment
      invalidatesTags: (_res, _err, { id }) => [
        { type: "comments", id },
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
        { type: "comments", id: `post_${postId}` },
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

    // Upvote/downvote post
    updatePostVote: builder.mutation<void, PostVoteUpdate>({
      query: (data) => ({
        url: `/posts/${data.postId}/votes/${data.userId}`,
        method: "PUT",
        body: { value: data.userVote },
      }),
      // Optimistic cache update for post votes
      async onQueryStarted(voteData, { dispatch, getState }) {
        // Update cache entry for "posts" tag
        for (const {
          endpointName,
          originalArgs,
        } of apiSlice.util.selectInvalidatedBy(getState(), ["posts"])) {
          // Update getPosts endpoint cache
          if (endpointName !== "getPosts") continue;
          dispatch(
            apiSlice.util.updateQueryData(
              endpointName,
              originalArgs,
              (postList) => {
                // Find the target post to update
                const posts = postList.data;
                const post = posts.find((post) => post.id === voteData.postId);
                if (!post) return;

                post.userVote = voteData.userVote;
                post.votes += voteData.voteChange;
              }
            )
          );
        }

        // Update cache entry for {type:"posts",id: post.id} tag
        for (const {
          endpointName,
          originalArgs,
        } of apiSlice.util.selectInvalidatedBy(getState(), [
          { type: "posts", id: voteData.postId },
        ])) {
          if (endpointName !== "getPost") continue;

          dispatch(
            apiSlice.util.updateQueryData(
              endpointName,
              originalArgs,
              (post) => {
                post.userVote = voteData.userVote;
                post.votes += voteData.voteChange;
              }
            )
          );
        }
      },
    }),

    // Upvote/downvote comment
    updateCommentVote: builder.mutation<void, CommentVoteUpdate>({
      query: (data) => ({
        url: `/comments/${data.commentId}/votes/${data.userId}`,
        method: "PUT",
        body: { value: data.userVote },
      }),

        // Optimistic cache update for comment votes
      async onQueryStarted(voteData, { dispatch, getState }) {
        // Update cache entry for "posts" tag
        for (const {
          endpointName,
          originalArgs,
        } of apiSlice.util.selectInvalidatedBy(getState(), [{type: "comments", id: `post_${voteData.postId}`}])) {
          // Update getPostComments endpoint cache
          if (endpointName !== "getPostComments") continue;
          dispatch(
            apiSlice.util.updateQueryData(
              endpointName,
              originalArgs,
              (commentList) => {
                // Find the target comment to update
                const comments = commentList.data;
                const comment = comments.find((comment) => comment.id === voteData.commentId);
                if (!comment) return;

                comment.userVote = voteData.userVote;
                comment.votes += voteData.voteChange;
              }
            )
          );
        }

      }
    }),

    // Register
    createUser: builder.mutation<User, NewUser>({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: serializeRequestBody(data),
      }),
    }),

    // Login
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
  useUpdatePostVoteMutation,

  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentVoteMutation,

  useCreateUserMutation,
  useLoginMutation,
} = apiSlice;
