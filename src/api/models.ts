export interface User {
  id: number,
  username: string
}

export interface Post {
  id: number,
  title: string,
  content: string,
  authorId?: number,
  author?: User
}

export interface NewPost {
  title: string,
  content: string,
  authorId: number
}

export interface Comment {
  id: string, 
  content: string,
  authorId: string,
  author: User
}
