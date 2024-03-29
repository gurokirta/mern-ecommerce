import { createSlice } from "@reduxjs/toolkit";

export interface User {
  currentUser: null | UserSchema;
  isError: null | boolean;
  isLoading: null | boolean;
}

const initialState: User = {
  currentUser: null,
  isLoading: null,
  isError: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.isLoading = true;
    },
    signInFailed: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    signInSuccess: (state, action) => {
      state.isError = null;
      state.isLoading = false;
      state.currentUser = action.payload;
    },
    signOutStart: (state) => {
      state.isLoading = true;
    },
    signOutFailed: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    signOutSuccess: (state) => {
      state.isLoading = false;
      state.isError = null;
      state.currentUser = null;
    },
    updateStart: (state) => {
      state.isLoading = true;
    },
    updateFailed: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    updateSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = null;
      state.currentUser = action.payload;
    },
  },
});

export const {
  signInStart,
  signInFailed,
  signInSuccess,
  signOutStart,
  signOutFailed,
  signOutSuccess,
  updateStart,
  updateFailed,
  updateSuccess,
} = userSlice.actions;

export default userSlice.reducer;
