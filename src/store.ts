import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { authReducer } from "./auth/authSlice";

// Set up redux store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(createListenerMiddleware().middleware)
      .concat(apiSlice.middleware),
});

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
