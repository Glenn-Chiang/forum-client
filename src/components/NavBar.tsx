import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Button, IconButton, Link, Toolbar } from "@mui/material";
import { Link as RouterLink } from "react-router";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
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
