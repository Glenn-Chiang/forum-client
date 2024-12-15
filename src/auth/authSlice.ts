import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"


interface AuthState {
  userId: number | null
}

const initialState : AuthState = {
  userId: 1
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<number>) {
      state.userId = action.payload
    },
    logout(state) {
      state.userId = null
    }
  }
})

export const { login, logout } = authSlice.actions

export const selectCurrentUserId = (state: RootState) => state.auth.userId

export const authReducer = authSlice.reducer
