import { Box, Button, TextField, Typography } from "@mui/material";
import { useAppSelector } from "../store";
import { selectCurrentUserId } from "../auth/authSlice";

export default function CreatePostPage() {
  const userId = useAppSelector(selectCurrentUserId)

  return (
    <Box padding={1} display="flex" flexDirection="column" gap={1}>
      <Typography variant="h6">Create a Post</Typography>
      <TextField fullWidth placeholder="Title" />
      <TextField
        fullWidth
        placeholder="Content"
        multiline
        minRows={5}
        maxRows={10}
      />
      <Button sx={{maxWidth: 100}} variant="contained">Post</Button>
    </Box>
  );
}
