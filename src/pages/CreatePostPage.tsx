import { Box, Button, TextField, Typography } from "@mui/material";

export default function CreatePostPage() {
  return (
    <Box padding={1} display="flex" flexDirection="column" gap={1}>
      <Typography variant="h6">Create a Post</Typography>
      <TextField fullWidth placeholder="Title" />
      <TextField
        fullWidth
        placeholder="Content"
        multiline
        rows={5}
        maxRows={20}
      />
      <Button sx={{maxWidth: 100}} variant="contained">Post</Button>
    </Box>
  );
}
