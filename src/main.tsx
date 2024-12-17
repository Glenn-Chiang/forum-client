import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./routes";
import { Provider } from "react-redux";
import { store } from "./store";
import { ToastProvider } from "./components/feedback/ToastProvider";
import { GlobalStyles } from "@mui/material";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <GlobalStyles
          styles={{
            body: {
              margin: 0, // Override browser default margin
            },
          }}
        />
        <AppRouter />
      </ToastProvider>
    </Provider>
  </StrictMode>
);
