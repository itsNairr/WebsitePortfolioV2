"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { IoSunny } from "react-icons/io5";
import { BsMoonStarsFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../redux/features/themeSlice";

// Items in the nav use the site's hover-dim effect (#items:hover > .item:not(:hover) in globals.css).
export const navItem = "item flex items-center";

export function ThemeToggle() {
  const dispatch = useDispatch();
  // The icon is picked by CSS from the `dark` class on <html> (set before first paint),
  // so server-rendered HTML is correct for every visitor without reading the saved theme.
  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={() => dispatch(toggleTheme())}
      className={navItem}
    >
      <BsMoonStarsFill className="hidden dark:block" />
      <IoSunny className="dark:hidden" />
    </button>
  );
}

// Fixed header shared by both navbars, so they sit in exactly the same place. `menu`
// renders the mobile full-screen menu and receives `close` and whether it's `open`.
export default function NavShell({
  right,
  menu,
}: {
  right?: ReactNode;
  menu?: (close: () => void, open: boolean) => ReactNode;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Picking a page closes the menu instantly (no exit animation) so navigation feels immediate.
  const [instantClose, setInstantClose] = useState(false);
  const toggleMenu = () => {
    setInstantClose(false);
    setOpen(!open);
  };
  const closeForNavigation = () => {
    setInstantClose(true);
    setOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation and on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Lock page scrolling behind the open mobile menu.
  useEffect(() => {
    if (!open) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Always transparent; once scrolled, a light blur keeps the links readable. The blur
          lives on its own layer: blur on the header itself would stop the menu overlay's blur
          from rendering until it faded out, which flashed when opening the menu. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 backdrop-blur-md transition-opacity duration-500 ${
          scrolled && !open ? "opacity-100" : "opacity-0"
        }`}
      />
      {menu && (
        <div
          onClick={() => setOpen(false)}
          inert={!open}
          className={`fixed inset-0 -z-10 flex flex-col justify-center px-10 sm:px-8 xs:px-6 bg-light/40 dark:bg-dark/40 backdrop-blur-2xl dark:text-white ${
            instantClose ? "transition-none [&_*]:transition-none" : "transition-opacity duration-300"
          } ${
            open ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          {menu(closeForNavigation, open)}
        </div>
      )}
      <nav className="flex items-center justify-between px-10 sm:px-8 xs:px-6 h-[72px] xs:h-[64px] dark:text-white">
        <Link href="/" className="text-[30px] xs:text-[26px] font-bold">
          <span className="xs:hidden">Hari Nair</span>
          <span className="hidden xs:inline">HN</span>
        </Link>
        <div id="items" className="flex items-center gap-10 sm:gap-7 xs:gap-6 text-[30px] sm:text-[24px] xs:text-[22px]">
          {right}
          <ThemeToggle />
          {menu && (
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={toggleMenu}
              className="item relative hidden sm:flex xs:flex items-center justify-center w-[24px] h-[24px] xs:w-[22px] xs:h-[22px]"
            >
              <span
                className={`absolute h-[2px] w-[22px] xs:w-[20px] rounded-full bg-current transition-transform duration-300 ease-out ${
                  open ? "rotate-45" : "-translate-y-[4px]"
                }`}
              />
              <span
                className={`absolute h-[2px] w-[22px] xs:w-[20px] rounded-full bg-current transition-transform duration-300 ease-out ${
                  open ? "-rotate-45" : "translate-y-[4px]"
                }`}
              />
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
