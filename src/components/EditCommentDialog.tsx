import {
  Button,
  ButtonBaseProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { ReactElement, useState } from "react";
import { Comment } from "../api/models";
import { useUpdateCommentMutation } from "../api/apiSlice";

interface EditCommentDialogProps {
  comment: Comment;
  triggerButton: ReactElement<ButtonBaseProps>;
  handleCancel: () => void;
}

export default function EditCommentDialog({
  comment,
  triggerButton,
  handleCancel,
}: EditCommentDialogProps) {
  // Handle dialog UI state
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    handleCancel();
  };

  // Hook to send comment update to api
  const [updateComment, { isLoading }] = useUpdateCommentMutation();

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
    
    handleClose();
  };

  const TriggerButton = React.cloneElement(triggerButton, {
    onClick: handleClickOpen,
  });

  return (
    <>
      {TriggerButton}
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        PaperProps={{ component: "form", onSubmit: handleSubmit }}
      >
        <DialogTitle>Edit Comment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            fullWidth
            multiline
            minRows={1}
            maxRows={5}
            defaultValue={comment.content}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
