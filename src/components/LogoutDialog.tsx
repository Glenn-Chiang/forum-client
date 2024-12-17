import { ReactElement } from "react";
import AlertDialog from "./AlertDialog";
import { ButtonBaseProps } from "@mui/material";

interface LogoutDialogProps {
  triggerButton: ReactElement<ButtonBaseProps>;
  handleCancel: () => void;
}

export default function LogoutDialog({
  triggerButton,
  handleCancel,
}: LogoutDialogProps) {
  const handleLogout = () => {};

  return (
    <AlertDialog
      title=""
      text="Do you want to logout?"
      triggerButton={triggerButton}
      handleOk={handleLogout}
      handleCancel={handleCancel}
    />
  );
}
