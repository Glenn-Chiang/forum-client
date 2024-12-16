import {
  Button,
  ButtonBaseProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { ReactElement, useState } from "react";
import { useUpdatePostTagsMutation } from "../api/apiSlice";
import { Post } from "../api/models";
import { useToast } from "./feedback/ToastProvider";
import TagSelect from "./TagSelect";

interface EditTagsDialogProps {
  post: Post;
  triggerButton: ReactElement<ButtonBaseProps>;
}

export default function EditTagsDialog({
  post,
  triggerButton,
}: EditTagsDialogProps) {
  // Initial post tags IDs
  const initialTags = post.topics.map((topic) => topic.id.toString());

  // Dialog UI state
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedTags(initialTags);
  };

  // The button that opens this dialog
  const TriggerButton = React.cloneElement(triggerButton, {
    onClick: handleClickOpen,
  });

  // Keep track of currently selected tags
  // The post's current tags are selected by default
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);

  // Redux mutation hook to update tags
  const [updateTags, { isLoading }] = useUpdatePostTagsMutation();

  // Global toast hook
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      await updateTags({
        postId: post.id,
        topicIds: selectedTags.map((id) => Number(id)),
      }).unwrap();
      toast.display("Tags updated", "success");
    } catch (err) {
      toast.display("Error updating tags", "error");
    }
    handleClose(); // Close the dialog regardless of success/error
  };

  return (
    <>
      {TriggerButton}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <DialogTitle>Edit tags</DialogTitle>
        <DialogContent >
          <TagSelect
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
