import { Box, Typography } from "@mui/material";
import CommentList from "../components/CommentList";
import PostCard from "../components/PostCard";
import { Comment, Post, User } from "../data/models";

export default function PostPage() {
  // TODO: Fetch post based on id param
  const user: User = {
    id: 1,
    username: "Friedrich Nietzsche",
  };

  const post: Post = {
    id: 1,
    title: "God is dead",
    content:
      "God is dead. God remains dead. And we have killed him. How shall we comfort ourselves, the murderers of all murderers?",
    authorId: 1,
    author: user,
  };

  const comments: Comment[] = [
    {
      id: 1,
      content: "What was holiest and mightiest of all that the world has ever owned has bled to death under our knives. Who will wipe this blood off us?",
      authorId: 1,
      author: user,
    },
    {
      id: 2,
      content: "What water is there to wash ourselves?",
      authorId: 1,
      author: user,
    },
  ];

  return (
    <>
      <PostCard post={post} />
      <Box padding={1}>
        {comments.length > 0 ? (
          <CommentList comments={comments} />
        ) : (
          <Typography color="text.secondary">No comments</Typography>
        )}
      </Box>
    </>
  );
}
