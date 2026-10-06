import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshTokenId: number | null;
}

const savedAccessToken =
    localStorage.getItem("accessToken");

const savedRefreshTokenId =
    localStorage.getItem("refreshTokenId");

const initialState: AuthState = {
    isAuthenticated: !!savedAccessToken,

    accessToken:
        savedAccessToken,

    refreshTokenId:
        savedRefreshTokenId
            ? Number(savedRefreshTokenId)
            : null
};

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        setCredentials: (
            state,
            action: {
                payload: {
                    accessToken: string;
                    refreshTokenId: number;
                };
            }
        ) => {
            const {
                accessToken,
                refreshTokenId
            } = action.payload;

            state.isAuthenticated = true;
            state.accessToken = accessToken;
            state.refreshTokenId =
                refreshTokenId;

            localStorage.setItem(
                "accessToken",
                accessToken
            );

            localStorage.setItem(
                "refreshTokenId",
                String(refreshTokenId)
            );

            localStorage.removeItem("token");
        },

        logout: (state) => {
            localStorage.removeItem(
                "accessToken"
            );

            localStorage.removeItem(
                "refreshTokenId"
            );

            localStorage.removeItem("token");

            state.isAuthenticated = false;
            state.accessToken = null;
            state.refreshTokenId = null;
        }
    }
});

export const {
    setCredentials,
    logout
} = authSlice.actions;

export default authSlice.reducer;
