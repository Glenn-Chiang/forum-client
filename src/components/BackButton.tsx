import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Link } from "react-router";

export default function BackButton() {
  return (
    <IconButton component={Link} to="/">
      <ArrowBack />
    </IconButton>
  );
}
