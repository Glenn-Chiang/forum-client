import { GlobalStyles } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ToastProvider } from "./components/feedback/ToastProvider";
import AppRouter from "./routes";
import { store } from "./store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <GlobalStyles styles={{ body: { margin: 0 } }} />
        <AppRouter />
      </ToastProvider>
    </Provider>
  </StrictMode>
);
