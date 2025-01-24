import { AccountCircle } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import LogoutDialog from "./LogoutDialog";

export default function AccountMenu() {
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
        <LogoutDialog
          triggerButton={<MenuItem>Logout</MenuItem>}
          handleCancel={handleClose}
        />
      </Menu>
    </>
  );
}
