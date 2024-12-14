import {
  Button,
  ButtonBaseProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import React, { ReactElement, useState } from "react";

interface AlertDialogProps {
  triggerButton: ReactElement<ButtonBaseProps>;
  title: string;
  text: string;
  handleOk: () => void;
  handleCancel: () => void;
}

export default function AlertDialog({
  triggerButton,
  title,
  text,
  handleOk,
  handleCancel,
}: AlertDialogProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleCancel()
  };

  const handleClickOk = () => {
    handleOk();
    handleClose();
  };

  const TriggerButton = React.cloneElement(triggerButton, {
    onClick: handleClickOpen,
  });

  return (
    <>
      {TriggerButton}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClickOk}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
