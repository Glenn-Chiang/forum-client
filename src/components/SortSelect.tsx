import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useSearchParams } from "react-router";

export default function SortSelect() {
  const sortOptions = ["new", "old"];

  // Get sortBy option from URL search param
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sort_by") || "new";

  // Set URL search param when option is selected
  const handleChange = (event: SelectChangeEvent) => {
    const params = new URLSearchParams();
    params.set("sort_by", event.target.value);
    setSearchParams(params);
  };

  return (
    <FormControl
      size="small"
      sx={{ textTransform: "capitalize", m: 1, minWidth: 120 }}
    >
      <InputLabel id="sort-select">Sort</InputLabel>
      <Select
        labelId="sort-select"
        label="Sort"
        value={sortBy}
        onChange={handleChange}
      >
        {sortOptions.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{ textTransform: "capitalize" }}
          >
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
