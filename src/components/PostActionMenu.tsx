import { Delete, Edit, MoreVert } from "@mui/icons-material";
import {
  IconButton,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router";

export default function PostActionMenu({ postId }: { postId: number }) {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(anchor);
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{ position: "absolute", top: 4, right: 4 }}
      >
        <MoreVert />
      </IconButton>
      <Menu anchorEl={anchor} open={open} onClose={handleClose}>
        <Link
          component={RouterLink}
          to={`/posts/${postId}/edit`}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
        </Link>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
