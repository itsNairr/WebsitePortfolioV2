import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./skills-projects/**/*.{js,ts,jsx,tsx,mdx}",
    
  ],
  theme: {
    screens: {
      "2xs": { min: "300px" },
      xs: { max: "575px" }, // Mobile (iPhone 3 - iPhone XS Max).
      sm: { min: "576px", max: "897px" }, // Mobile (matches max: iPhone 11 Pro Max landscape @ 896px).
      md: { min: "898px", max: "1199px" }, // Tablet (matches max: iPad Pro @ 1112px).
      lg: { min: "1200px" }, // Desktop smallest.
      xl: { min: "1159px" }, // Desktop wide.
      "2xl": { min: "1359px" }, // Desktop widescreen.
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        light: "rgb(255, 255, 255)",
        dark: "rgb(20, 20, 20)",
      },
      fontFamily: {
        sans: ['var(--font-raleway)'],
      },
    },
  },
  plugins: [],
};
export default config;
