// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/product" }), // Replace with your actual API base URL
  endpoints: (builder) => ({
    createProduct: builder.mutation<Product, any>({
      query: (product) => ({
        url: "/create",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: product,
      }),
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useCreateProductMutation } = productApi;
