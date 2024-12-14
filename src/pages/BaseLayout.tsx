import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import { Box } from "@mui/material";

export default function BaseLayout() {
  return (
    <div>
      <NavBar />
      <Box paddingY={1}>
        <Outlet />
      </Box>
    </div>
  );
}
