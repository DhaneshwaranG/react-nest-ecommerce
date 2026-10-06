import { useDispatch, useSelector } from "react-redux";

import { setTheme } from "../Redux/Slices/themeSlice";

import type { RootState, AppDispatch } from "../Redux/Store";

function ThemeToggle() {
  const dispatch = useDispatch<AppDispatch>();

  const theme = useSelector((state: RootState) => state.theme.theme);

  const handleThemeToggle = () => {
    dispatch(setTheme(theme === "dark" ? "light" : "dark"));
  };

  return (
    <button className="theme-toggle" type="button" onClick={handleThemeToggle}>
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}

export default ThemeToggle;
