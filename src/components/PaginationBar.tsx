import { Pagination, Stack } from "@mui/material";
import React from "react";

interface PaginationBarProps {
  page: number;
  setPage: (page: number) => void;
  count: number; // How many pages
}

export default function PaginationBar({
  page,
  setPage,
  count,
}: PaginationBarProps) {
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({top: 0, behavior: "auto"});
  };

  return (
    <Stack spacing={2}>
      <Pagination count={count} page={page} onChange={handleChange} />
    </Stack>
  );
}
