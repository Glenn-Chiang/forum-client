import { useParams } from "react-router";
import { useGetPostCommentsQuery } from "../api/apiSlice";
import LoadingSkeleton from "./LoadingSkeleton";
import ErrorAlert from "./alerts/ErrorAlert";
import { Box, Typography } from "@mui/material";
import CommentList from "./CommentList";

export default function CommentSection() {
  const { id: postId } = useParams();

  const {
    data: comments,
    isLoading,
    isSuccess,
    isError,
  } = useGetPostCommentsQuery(postId!);

  if (isLoading) {
    return <LoadingSkeleton />;
  }
  if (isError) {
    return <ErrorAlert />;
  }
  if (isSuccess) {
    return (
      <Box padding={1}>
        {comments.length > 0 ? (
          <CommentList comments={comments} />
        ) : (
          <Typography color="text.secondary">No comments</Typography>
        )}
      </Box>
    );
  }
}
