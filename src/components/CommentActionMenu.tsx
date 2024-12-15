import { Delete, Edit, MoreVert } from "@mui/icons-material";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import {
  useDeleteCommentMutation
} from "../api/apiSlice";
import { Comment } from "../api/models";
import AlertDialog from "./AlertDialog";
import EditCommentDialog from "./EditCommentDialog";
import { useToast } from "./feedback/ToastProvider";

export default function CommentActionMenu({ comment }: { comment: Comment }) {
  // Handle menu UI
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(anchor);
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };

  // Hooks to edit and delete comment
  const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();

  // Global toast hook
  const toast = useToast()

  const handleDelete = async () => {
    try {
      await deleteComment(comment).unwrap()
      handleClose();
    } catch (err) {
      toast.display("Error deleting comment", "error")
    }
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
          handleOk={handleDelete}
          handleCancel={handleClose}
          pending={isDeleting}
        />
      </Menu>
    </>
  );
}
