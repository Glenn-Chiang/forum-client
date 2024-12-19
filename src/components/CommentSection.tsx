import { useParams, useSearchParams } from "react-router";
import { useGetPostCommentsQuery } from "../api/apiSlice";
import LoadingSkeleton from "./LoadingSkeleton";
import ErrorAlert from "./feedback/ErrorAlert";
import { Box, Typography } from "@mui/material";
import CommentList from "./CommentList";
import { useState } from "react";
import PaginationBar from "./PaginationBar";
import SortSelect from "./SortSelect";

export default function CommentSection() {
  const { id: postId } = useParams();

  const [page, setPage] = useState(1);
  const maxCommentsPerPage = 10;

  // Get sorting order from search params
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get("sort_by") || undefined;

  const {
    data: commentList,
    isLoading,
    isError,
  } = useGetPostCommentsQuery({
    postId: Number(postId)!,
    page,
    limit: maxCommentsPerPage,
    sortBy,
  });

  const comments = commentList?.data || [];
  const totalComments = commentList?.total_count || 0;

  // Total number of pages required to display all comments
  const numPages = Math.ceil(totalComments / maxCommentsPerPage);

  if (isLoading) {
    return <LoadingSkeleton />;
  }
  if (isError) {
    return <ErrorAlert />;
  }

  if (comments.length <= 0) {
    return (
      <Box padding={2}>
        <Typography color="text.secondary">No comments</Typography>
      </Box>
    );
  }

  return (
    <>
      <Box padding={1}>
        <SortSelect />
      </Box>
      <CommentList comments={comments} />
      <Box padding={1}>
        <PaginationBar page={page} setPage={setPage} count={numPages} />
      </Box>
    </>
  );
}
