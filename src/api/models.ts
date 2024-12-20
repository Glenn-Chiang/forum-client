import { z } from "zod"
import { commentListSchema, commentSchema, postListSchema, postSchema, topicSchema, userSchema } from "./response_schemas"

export type User = z.infer<typeof userSchema>
export type Post = z.infer<typeof postSchema>
export type PostList = z.infer<typeof postListSchema>
export type Comment = z.infer<typeof commentSchema>
export type CommentList = z.infer<typeof commentListSchema>
export type Topic = z.infer<typeof topicSchema>

export interface NewUser {
  username: string,
  password: string
}
export interface NewPost {
  title: string,
  content: string,
  authorId: number,
  topicIds: number[]
}

export interface PostUpdate {
  id: number,
  title: string,
  content: string
}

export interface PostTagsUpdate {
  postId: number,
  topicIds: number[]
}

export interface NewComment {
  content: string,
  postId: number,
  authorId: number
}

export interface CommentUpdate {
  id: number
  postId: number,
  content: string
}


