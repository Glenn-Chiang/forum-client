export interface User {
  id: number,
  username: string
}

export interface NewUser {
  username: string,
  password: string
}

export interface Post {
  id: number,
  title: string,
  content: string,
  authorId: number,
  author?: User,
  topics: Topic[],
  createdAt: string,
  updatedAt: string
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

export interface Comment {
  id: number, 
  content: string,
  postId: number,
  authorId: number,
  author: User,
  createdAt: string,
  updatedAt: string
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

export interface Topic {
  id: number
  name: string
}
