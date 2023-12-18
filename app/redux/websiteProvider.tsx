"use client";

import React from "react";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";

export default function WebsiteProvider({ children }: { children: any }) {
  const isDark = useSelector((state: any) => state.themeReducer.isDark);
  const [theme, setTheme] = React.useState('');
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  React.useEffect(() => {
    setTheme(isDark ? 'dark' : '');
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    metaThemeColor ? metaThemeColor.setAttribute("content", isDark ? '#141414' : '#FFFFFF') : null;
  }, [isDark]);
  return (
    <>
    <main className={theme}>
      <meta name="theme-color" content={isDark ? '#141414' : '#FFFFFF'}/>
      {!isLoaded ? <div className="min-h-screen max-h-full pt-[120px] pb-[100px] w-full flex flex-col items-center justify-center"><Loader /></div> : <><div className="dark:text-white dark:bg-dark text-black bg-light duration-500 overflow-hidden">{children}</div></>}
    </main>
    </>
  );
}
