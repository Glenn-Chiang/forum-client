export interface User {
  id: string,
  username: string
}

export interface Post {
  id: string,
  title: string,
  content: string,
  authorId?: string,
  author?: User
}

export interface Comment {
  id: string, 
  content: string,
  authorId: string,
  author: User
}
