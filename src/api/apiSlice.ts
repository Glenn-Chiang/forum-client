import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "./models";

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080'}),
  endpoints: builder => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts'
    })
  })
})

export const { useGetPostsQuery } = apiSlice
