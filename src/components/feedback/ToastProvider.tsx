import { Alert, AlertColor, Snackbar } from "@mui/material";
import React, { createContext, useContext, useState } from "react";

interface ToastManager {
  display: (message: string, severity: AlertColor) => void;
}
const ToastContext = createContext<ToastManager | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("success");

  const display = (message: string, severity: AlertColor) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toastManager: ToastManager = { display };

  return (
    <ToastContext.Provider value={toastManager}>
      <Snackbar open={open} onClose={handleClose} autoHideDuration={5000}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      {children}
    </ToastContext.Provider>
  );
}

export const useToast = (): ToastManager => {
  const toastManager = useContext(ToastContext);

  if (!toastManager) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return toastManager;
};
