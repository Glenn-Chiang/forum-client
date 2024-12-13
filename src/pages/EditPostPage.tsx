import { Box, Button, TextField, Typography } from "@mui/material";
import { Post, User } from "../data/models";

export default function EditPostPage() {
  // TODO: Fetch post based on id param
    const user: User = {
      id: 1,
      username: "Friedrich Nietzsche",
    };
  
    const post: Post = {
      id: 1,
      title: "God is Dead",
      content:
        "God is dead. God remains dead. And we have killed him. How shall we comfort ourselves, the murderers of all murderers?",
      authorId: 1,
      author: user,
    };

  return (
    <Box padding={1} display="flex" flexDirection="column" gap={1}>
      <Typography variant="h6">Edit Post</Typography>
      <TextField fullWidth placeholder="Title" defaultValue={post.title}/>
      <TextField
        fullWidth
        placeholder="Content"
        defaultValue={post.content}
        multiline
        rows={5}
        maxRows={20}
      />
      <Button sx={{maxWidth: 100}} variant="contained">Save</Button>
    </Box>
  )
}
