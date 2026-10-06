import type { Config } from "tailwindcss";

// Breakpoints are ranges (not min-width only): xs = phones, sm = large phones / small
// tablets, md = tablets / small laptops; unprefixed classes apply from 1200px up.
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      xs: { max: "575px" },
      sm: { min: "576px", max: "897px" },
      md: { min: "898px", max: "1199px" },
      xl: { min: "1159px" },
    },
    extend: {
      backgroundColor: {
        light: "rgb(255, 255, 255)",
        dark: "rgb(20, 20, 20)",
      },
      fontFamily: {
        sans: ["var(--font-raleway)"],
      },
    },
  },
  plugins: [],
};
export default config;
