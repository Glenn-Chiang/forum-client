import { List } from "@mui/material";
import { Post } from "../api/models";
import PostItem from "./PostItem";

// List of posts displayed in the HomePage
export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <List sx={{ width: "100%" }}>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </List>
  );
}
