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

export interface Comment {
  id: number, 
  content: string,
  authorId: number,
  author: User
}
