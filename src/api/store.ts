import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

// Set up redux store
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(createListenerMiddleware().middleware)
      .concat(apiSlice.middleware),
});

