"use client";

import { useEffect, type ReactNode } from "react";
import { useSelector } from "react-redux";
import CardGlow from "../components/CardGlow";
import NavigationProgress from "../components/NavigationProgress";
import type { RootState } from "./store";

export default function WebsiteProvider({ children }: { children: ReactNode }) {
  const isDark = useSelector((state: RootState) => state.themeReducer.isDark);
  // The `dark` class lives on <html> (set before first paint by app/layout.tsx).
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    document.querySelector("meta[name=theme-color]")?.setAttribute("content", isDark ? "#141414" : "#FFFFFF");
  }, [isDark]);

  return (
    <main>
      <CardGlow />
      <NavigationProgress />
      {/* Rendered on the server too: nothing here depends on the saved theme during render,
          because light/dark styling comes from the `dark` class on <html>. */}
      <div className="dark:text-white dark:bg-dark text-black bg-light duration-500 overflow-hidden">{children}</div>
    </main>
  );
}
