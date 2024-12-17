import { AppBar, Box, Button, Link, Toolbar } from "@mui/material";
import { Link as RouterLink } from "react-router";
import NavMenu from "./NavMenu";
import { useAppSelector } from "../store";
import { selectCurrentUserId } from "../auth/authSlice";
import AccountMenu from "./AccountMenu";

export default function NavBar() {
  const userId = useAppSelector(selectCurrentUserId);
  const authenticated = userId !== null;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <NavMenu />
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
            <AccountMenu />
          ) : (
            <Button component={RouterLink} to="/login" color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
