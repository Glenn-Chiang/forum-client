import { Add } from "@mui/icons-material";
import { AppBar, Button, Link, Stack, Toolbar } from "@mui/material";
import { Link as RouterLink } from "react-router";
import { selectCurrentUserId } from "../auth/authSlice";
import { useAppSelector } from "../store";
import AccountMenu from "./AccountMenu";

export default function NavBar() {
  const userId = useAppSelector(selectCurrentUserId);
  const authenticated = userId !== null;

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Link
          component={RouterLink}
          to={"/"}
          variant="h6"
          color="inherit"
          underline="none"
          sx={{ flexGrow: 1 }}
        >
          Forum
        </Link>
        {authenticated ? (
          <Stack direction={"row"} spacing={2}>
            <Button
              component={RouterLink}
              to="/posts/create"
              color="inherit"
              startIcon={<Add />}
            >
              Create post
            </Button>
            <AccountMenu />
          </Stack>
        ) : (
          <Button component={RouterLink} to="/login" color="inherit">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
