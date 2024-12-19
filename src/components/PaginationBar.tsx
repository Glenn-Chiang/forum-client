import { Pagination, Stack } from "@mui/material";
import React from "react";

interface PaginationBarProps {
  page: number;
  setPage: (page: number) => void;
  count: number;
}

export default function PaginationBar({
  page,
  setPage,
  count,
}: PaginationBarProps) {
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination count={count} page={page} onChange={handleChange} />
    </Stack>
  );
}
