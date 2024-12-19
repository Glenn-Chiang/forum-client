import { useParams } from "react-router";
import { useGetPostCommentsQuery } from "../api/apiSlice";
import LoadingSkeleton from "./LoadingSkeleton";
import ErrorAlert from "./feedback/ErrorAlert";
import { Box, Typography } from "@mui/material";
import CommentList from "./CommentList";
import { useState } from "react";

export default function CommentSection() {
  const { id: postId } = useParams();

  const [page, setPage] = useState(1);

  const {
    data: commentList,
    isLoading,
    isError,
  } = useGetPostCommentsQuery({ postId: Number(postId)!, page });

  const comments = commentList?.data || [];
  const commentCount = commentList?.total_count || 0;

  if (isLoading) {
    return <LoadingSkeleton />;
  }
  if (isError) {
    return <ErrorAlert />;
  }

  return (
    <Box>
      {comments.length > 0 ? (
        <CommentList comments={comments} />
      ) : (
        <Box padding={1}>
          <Typography color="text.secondary">No comments</Typography>
        </Box>
      )}
    </Box>
  );
}
