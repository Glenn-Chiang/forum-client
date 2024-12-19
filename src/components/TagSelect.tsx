import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent
} from "@mui/material";
import { useGetTopicsQuery } from "../api/apiSlice";
import ErrorAlert from "./feedback/ErrorAlert";

interface TagSelectProps {
  selectedTags: string[];
  setSelectedTags: (tagIds: string[]) => void;
}

export default function TagSelect({
  selectedTags,
  setSelectedTags,
}: TagSelectProps) {
  const { data: topics = [], isError } = useGetTopicsQuery();

  // Update the state of selected topic IDs whenever new values are selected/unselected
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    // Get the selected topic IDs from the event target
    // event.target.value may be returned as a string, so we explicitly split the string into an array
    const value = event.target.value;
    const selectedIds = typeof value === "string" ? value.split(",") : value;
    setSelectedTags(selectedIds);
  };

  // Render the Chip UI component to display the selected tag
  const renderChip = (tagId: string) => {
    const topic = topics.find((topic) => topic.id === Number(tagId))!;
    return <Chip key={tagId} label={topic.name} />;
  };

  return (
    <FormControl fullWidth sx={{ mt: 1 }}>
      <InputLabel>Tags</InputLabel>
      <Select
        multiple
        value={selectedTags}
        onChange={handleChange}
        input={<OutlinedInput label={"Tags"} />}
        MenuProps={{
          PaperProps: {
            style: {
              width: 250,
            },
          },
        }}
        renderValue={(selectedTags) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selectedTags.map(renderChip)}
          </Box>
        )}
      >
        {isError ? (
          <ErrorAlert message="Error fetching topics" />
        ) : (
          topics.map((topic) => (
            <MenuItem key={topic.id} value={topic.id.toString()}>
              {topic.name}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
}
