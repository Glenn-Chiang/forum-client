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
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CommentFormSchema,
  commentFormSchema,
} from "../api/form_schemas";
import { useToast } from "./feedback/ToastProvider";

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

  // Form utils
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CommentFormSchema>({ resolver: zodResolver(commentFormSchema) });

  //  Global toast hook
  const toast = useToast();

  // On submit, send the comment update data to the api
  const onSubmit: SubmitHandler<CommentFormSchema> = async (data) => {
    try {
      await updateComment({
        ...data,
        id: comment.id,
        postId: comment.postId,
      }).unwrap();
      // Close the dialog
      handleClose();
      // Display toast to alert the user that the comment was successfully updated
      toast.display("Comment updated", "success");
    } catch (err) {
      handleClose()
      // Display toast to alert the user that there was an error
      toast.display("Error updating comment", "error");
    }
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
        PaperProps={{ component: "form", onSubmit: handleSubmit(onSubmit) }}
      >
        <DialogTitle>Edit Comment</DialogTitle>
        <DialogContent>
          <Controller
            name="content"
            control={control}
            defaultValue={comment.content}
            render={({ field }) => (
              <TextField
                autoFocus
                fullWidth
                multiline
                minRows={1}
                maxRows={5}
                {...field}
                error={!!errors.content}
                helperText={errors.content?.message}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
