import { Chip, Stack } from "@mui/material";
import { Topic } from "../api/models";

interface TagListProps {
  tags: Topic[];
}

export default function TagList({ tags }: TagListProps) {
  return (
    <Stack direction={"row"} spacing={1}>
      {tags.map((tag) => (
        <Chip key={tag.id} label={tag.name} />
      ))}
    </Stack>
  );
}
