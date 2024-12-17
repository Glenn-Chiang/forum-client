import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "../api/models";
import { AuthPayload } from "./AuthPayload";

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  // Retrieve user from localStorage, if already logged in
  user: localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")!),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<AuthPayload>) {
      state.user = action.payload.user;
      // Store jwt in localStorate to keep user logged in
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    logout(state) {
      state.user = null;
      // Remove the user and token from localStorage
      localStorage.removeItem("user")
      localStorage.removeItem("token")
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectCurrentUserId = (state: RootState) =>
  state.auth.user?.id || null;

export const authReducer = authSlice.reducer;
