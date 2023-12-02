"use client";

import React from "react";

import { useSelector } from "react-redux";

export default function TailwindProvider({ children }: { children: any }) {
  const isDark = useSelector((state: any) => state.themeReducer.isDark);
  return (
    <main className={isDark ? "dark" : ""}>
      <div className="dark:text-white dark:bg-dark text-black bg-light duration-500 overflow-hidden">{children}</div>
    </main>
  );
}
