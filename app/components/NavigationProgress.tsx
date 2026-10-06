"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Slim gradient bar at the top of the screen while a page loads after clicking a link
// (or using back/forward). Purely client-side, so it doesn't affect the server HTML.
export default function NavigationProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const trickle = useRef<ReturnType<typeof setInterval> | null>(null);
  const hide = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const start = () => {
      if (hide.current) clearTimeout(hide.current);
      if (trickle.current) clearInterval(trickle.current);
      setVisible(true);
      setProgress(8);
      // Creep towards 90% (never reaching it) until the new page arrives.
      trickle.current = setInterval(() => setProgress((p) => p + (90 - p) * 0.08), 200);
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a");
      if (!link || (link.target && link.target !== "_self") || link.hasAttribute("download")) return;
      const url = new URL(link.href, location.href);
      // Only internal links to a different page (not the same page or an in-page #anchor).
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      start();
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", start);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", start);
    };
  }, []);

  // The new page has rendered: finish the bar and fade it out.
  useEffect(() => {
    if (trickle.current) {
      clearInterval(trickle.current);
      trickle.current = null;
    }
    setProgress(100);
    hide.current = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 350);
    return () => {
      if (hide.current) clearTimeout(hide.current);
    };
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-sky-400 via-violet-500 to-pink-500 shadow-[0_0_10px_rgb(139_92_246/0.7)] transition-transform duration-200 ease-out"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}
