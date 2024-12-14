import { Delete, Edit, MoreVert } from "@mui/icons-material";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import AlertDialog from "./AlertDialog";
import { Comment } from "../data/models";
import EditCommentDialog from "./EditCommentDialog";

export default function CommentActionMenu({ comment }: { comment: Comment }) {
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
        <EditCommentDialog
          comment={comment}
          triggerButton={
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Edit />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
          }
          handleCancel={handleClose}
        />
        <AlertDialog
          triggerButton={
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Delete />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          }
          title="Delete this comment?"
          text="This action cannot be undone"
          handleOk={handleClose}
          handleCancel={handleClose}
        />
      </Menu>
    </>
  );
}
