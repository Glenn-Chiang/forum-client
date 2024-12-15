import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./routes";
import { Provider } from "react-redux";
import { store } from "./store";
import { ToastProvider } from "./components/feedback/ToastProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <AppRouter />
      </ToastProvider>
    </Provider>
  </StrictMode>
);
