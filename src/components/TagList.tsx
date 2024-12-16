import { Chip, Stack } from "@mui/material";
import { Topic } from "../api/models";

export default function TagList({ tags }: { tags: Topic[] }) {
  return (
    <Stack direction={"row"} spacing={1} paddingX={2}>
      {tags.map((tag) => (
        <Chip key={tag.id} label={tag.name} />
      ))}
    </Stack>
  );
}
