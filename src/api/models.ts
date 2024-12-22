import { z } from "zod"
import { commentListSchema, commentSchema, postListSchema, postSchema, topicSchema, userSchema, userVoteSchema } from "./response_schemas"

export type User = z.infer<typeof userSchema>
export type Post = z.infer<typeof postSchema>
export type PostList = z.infer<typeof postListSchema>
export type Comment = z.infer<typeof commentSchema>
export type CommentList = z.infer<typeof commentListSchema>
export type Topic = z.infer<typeof topicSchema>

export type VoteValue = z.infer<typeof userVoteSchema>

export interface PostVoteUpdate {
  postId: number,
  userId: number,
  userVote: VoteValue, // Whether the user has upvoted, downvoted or not voted
  voteChange: number // Change in total number of votes, used for optimistic UI update
}

export interface NewUser {
  username: string,
  password: string
}
export interface NewPost {
  title: string,
  content: string,
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
}

export interface CommentUpdate {
  id: number
  postId: number,
  content: string
}

