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
    signInStart: state => {
      state.isLoading = true;
    },
    signInFailed: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    signInSuccess: (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.currentUser = action.payload;
    },
  },
});

export const { signInStart, signInFailed, signInSuccess } = userSlice.actions;

export default userSlice.reducer;
