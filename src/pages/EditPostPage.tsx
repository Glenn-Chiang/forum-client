import { Box, Button, TextField, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useGetPostQuery } from "../api/apiSlice";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ErrorAlert from "../components/feedback/ErrorAlert";

export default function EditPostPage() {
  const { id: postId } = useParams();
  const { data: post, isLoading, isSuccess } = useGetPostQuery(postId!);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!isSuccess) {
    return <ErrorAlert />;
  }

  return (
    <Box
      component={"form"}
      padding={1}
      display="flex"
      flexDirection="column"
      gap={1}
    >
      <Typography variant="h6">Edit Post</Typography>
      <TextField fullWidth placeholder="Title" defaultValue={post.title} />
      <TextField
        fullWidth
        placeholder="Content"
        defaultValue={post.content}
        multiline
        minRows={5}
        maxRows={20}
      />
      <Button type="submit" sx={{ maxWidth: 100 }} variant="contained">
        Save
      </Button>
    </Box>
  );
}
