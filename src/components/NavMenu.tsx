import {
  IconButton,
  Menu,
  MenuItem,
  Link,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Link as RouterLink } from "react-router";
import { Add } from "@mui/icons-material";

export default function NavMenu() {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(anchor);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="large"
        edge="start"
        color="inherit"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Menu anchorEl={anchor} open={open} onClose={handleClose}>
        <Link
          component={RouterLink}
          to={"/posts/create"}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <ListItemText>Create post</ListItemText>
          </MenuItem>
        </Link>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
      </Menu>
    </>
  );
}
