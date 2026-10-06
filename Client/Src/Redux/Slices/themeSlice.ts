import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  theme: "dark" | "light";
}

const savedTheme = localStorage.getItem("theme");

const initialState: ThemeState = {
  theme: savedTheme === "light" ? "light" : "dark",
};

const themeSlice = createSlice({
  name: "theme",

  initialState,

  reducers: {
    setTheme: (state, action: PayloadAction<"dark" | "light">) => {
      state.theme = action.payload;

      localStorage.setItem("theme", action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
