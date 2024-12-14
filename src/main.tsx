import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./routes";
import { Provider } from "react-redux";
import { store } from "./api/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </StrictMode>
);
