import { baseApi } from "./baseApi";

interface RegisterRequest {
  username: string;
  name: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  message: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshTokenId: number;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),

    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
