import { ReactElement } from "react";
import AlertDialog from "./AlertDialog";
import { ButtonBaseProps } from "@mui/material";
import { useAppDispatch } from "../store";
import { logout } from "../auth/authSlice";
import { useNavigate } from "react-router";
import { useToast } from "./feedback/ToastProvider";

interface LogoutDialogProps {
  triggerButton: ReactElement<ButtonBaseProps>;
  handleCancel: () => void;
}

export default function LogoutDialog({
  triggerButton,
  handleCancel,
}: LogoutDialogProps) {
  // Redux action dispatch hook
  const dispatch = useAppDispatch();
  
  // Navigation hook
  const navigate = useNavigate()
  
  // Global toast hook
  const toast = useToast()

  const handleLogout = () => {
    dispatch(logout());
    navigate('/')
    toast.display("Logged out", 'info')
  };

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
