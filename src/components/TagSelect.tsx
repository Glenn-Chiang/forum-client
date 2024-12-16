import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Topic } from "../api/models";

interface TagSelectProps {
  selectedTags: number[],
  setSelectedTags: (tagIds: number[]) => void
}

export default function TagSelect({selectedTags, setSelectedTags}: TagSelectProps) {
  const topics: Topic[] = [
    { id: 1, name: "Philosophy" },
    { id: 2, name: "Literature" },
  ];
  // const {data: topics, isLoading, isSuccess} = useGetTopicsQuery()

  // Update the state of selected topic IDs whenever new values are selected/unselected
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    // Get the selected topic IDs from the event target
    // event.target.value may be returned as a string, so we explicitly split the string into an array
    const value = event.target.value;
    const selectedIds = typeof value === "string" ? value.split(",") : value;
    setSelectedTags(selectedIds.map(id => Number(id)));
  };

  // Render the Chip UI component for the given tag
  const renderChip = (tagId: string) => {
    const topic = topics.find(topic => topic.id === Number(tagId))!
    return <Chip key={tagId} label={topic.name} />
  }

  return (
    <FormControl>
      <InputLabel>Tags</InputLabel>
      <Select
        multiple
        value={selectedTags.map(id => id.toString())}
        onChange={handleChange}
        input={<OutlinedInput label={"Tags"} />}
        MenuProps={{
          PaperProps: {
            style: {
              width: 250,
            },
          },
        }}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map(renderChip)}
          </Box>
        )}
      >
        {topics.map((topic) => (
          <MenuItem key={topic.id} value={topic.id}>
            {topic.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}