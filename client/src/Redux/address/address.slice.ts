import { createSlice } from "@reduxjs/toolkit";

export interface Address {
  billingAddress: null | BillingAddress;
  isError: null | boolean;
  isLoading: null | boolean;
}

const initialState: Address = {
  billingAddress: null,
  isError: null,
  isLoading: null,
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    creatingStart: state => {
      state.isLoading = true;
    },
    creatingSuccess: (state, action) => {
      state.isLoading = null;
      state.isError = null;
      state.billingAddress = action.payload;
    },
    creatingFailure: (state, action) => {
      state.isError = action.payload;
      state.billingAddress = null;
      state.isLoading = null;
    },
  },
});

export const { creatingFailure, creatingStart, creatingSuccess } =
  addressSlice.actions;

export default addressSlice.reducer;
