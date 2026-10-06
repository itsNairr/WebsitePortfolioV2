import { createSlice } from "@reduxjs/toolkit";

// Dark by default; "false" in localStorage means the visitor chose light.
// (app/layout.tsx applies the same rule before first paint.)
const initialIsDark = typeof window === "undefined" || localStorage.getItem("isDark") !== "false";

const themeSlice = createSlice({
  name: "theme",
  initialState: { isDark: initialIsDark },
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
      localStorage.setItem("isDark", String(state.isDark));
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
