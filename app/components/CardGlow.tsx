"use client";

import { useEffect } from "react";

// One page-wide listener that points the glow (see .liquid-glass::after in
// globals.css) at the cursor, for whichever card is under the pointer.
export default function CardGlow() {
  useEffect(() => {
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const card = (e.target as Element | null)?.closest?.(".liquid-glass") as HTMLElement | null;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);
      });
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
