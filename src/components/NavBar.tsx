import { AppBar, Box, Button, Link, Toolbar } from "@mui/material";
import { Link as RouterLink } from "react-router";
import NavMenu from "./NavMenu";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <NavMenu/>
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
          <Button component={RouterLink} to="/login" color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
