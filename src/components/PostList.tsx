import { Divider, List } from "@mui/material";
import { Post } from "../data/models";
import PostItem from "./PostItem";

export default function PostList() {
  return (
    <List sx={{ width: "100%" }}>
      {posts.map((post) => (
        <>
          <PostItem post={post} />
          <Divider variant="middle" component={"li"}/>
        </>
      ))}
    </List>
  );
}

const posts: Post[] = [
  { id: 1, title: "Post 1", content: "Hello world" },
  { id: 2, title: "Post 2", content: "Hello world" },
  { id: 3, title: "Post 3", content: "Hello world" },
];
