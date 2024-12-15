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
import { Link as RouterLink, useNavigate } from "react-router";
import AlertDialog from "./AlertDialog";
import { useDeletePostMutation } from "../api/apiSlice";
import { useToast } from "./feedback/ToastProvider";

export default function PostActionMenu({ postId }: { postId: number }) {
  // Handle menu UI state
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(anchor);
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };

  // Hook to delete post
  const [deletePost, {isLoading: isDeleting}] = useDeletePostMutation()

  // Navigation hook
  const navigate = useNavigate()

  // Global toast hook
  const toast = useToast()

  const handleDelete = async () => {
    try {
      await deletePost(postId).unwrap()
      // Display toast to alert the user that the comment was successfully deleted
      toast.display("Post deleted", 'success')
      handleClose();
      // Redirect to home
      navigate("/")
    } catch (err) {
      toast.display("Error deleting post", "error")
    }
  }

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
        <AlertDialog
          triggerButton={
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Delete />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          }
          title="Delete this post?"
          text="This action cannot be undone"
          handleOk={handleDelete}
          handleCancel={handleClose}
          pending={isDeleting}
        />
      </Menu>
    </>
  );
}
