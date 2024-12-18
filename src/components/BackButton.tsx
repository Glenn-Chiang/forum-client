import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <IconButton onClick={() => navigate(-1)}>
      <ArrowBack />
    </IconButton>
  );
}
