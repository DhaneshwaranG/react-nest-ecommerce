import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { RootState } from "../../Redux/Store";

export const baseApi = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3003",

    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;

      const accessToken = state.auth.accessToken;

      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }

      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),

  tagTypes: ["Auth", "Product", "Cart"],

  endpoints: () => ({}),
});
