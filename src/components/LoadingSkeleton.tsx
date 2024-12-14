import { Skeleton, Stack } from "@mui/material";

export default function LoadingSkeleton() {
  return (
    <Stack spacing={1}>
      <Skeleton variant="text" height={60} />
      <Skeleton variant="rounded" height={200} />
      <Skeleton variant="text" height={60} />
      <Skeleton variant="rounded" height={200} />
      <Skeleton variant="text" height={60} />
      <Skeleton variant="rounded" height={200} />
    </Stack>
  );
}
