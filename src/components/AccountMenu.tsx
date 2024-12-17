import { AccountCircle } from "@mui/icons-material";
import { IconButton, Link, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router";
import { selectCurrentUserId } from "../auth/authSlice";
import { useAppSelector } from "../store";
import LogoutDialog from "./LogoutDialog";

export default function AccountMenu() {
  const userId = useAppSelector(selectCurrentUserId);

  // Menu UI state
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(anchor);
  const handleClickOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <>
      <IconButton onClick={handleClickOpen} color="inherit">
        <AccountCircle />
      </IconButton>
      <Menu open={open} onClose={handleClose} anchorEl={anchor}>
        <Link
          component={RouterLink}
          to={`/profiles/${userId}`}
          color="inherit"
          underline="none"
        >
          <MenuItem>Profile</MenuItem>
        </Link>
        <LogoutDialog
          triggerButton={<MenuItem>Logout</MenuItem>}
          handleCancel={handleClose}
        />
      </Menu>
    </>
  );
}
