"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { FaChevronLeft, FaChevronRight, FaExpand, FaTimes } from "react-icons/fa";
import GlassCard from "./GlassCard";

const navButton =
  "absolute top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-black/45 text-white text-[14px] backdrop-blur-sm transition hover:bg-black/65 hover:scale-105";

const lightboxButton =
  "flex items-center justify-center w-11 h-11 xs:w-10 xs:h-10 rounded-full bg-white/10 text-white text-[16px] backdrop-blur-sm transition hover:bg-white/20";

// Full-screen view of one image. Rendered into <body> because the gallery card's
// backdrop-filter would otherwise trap a `position: fixed` overlay inside the card.
function Lightbox({
  images,
  active,
  title,
  onClose,
  onStep,
}: {
  images: string[];
  active: number;
  title: string;
  onClose: () => void;
  onStep: (step: number) => void;
}) {
  const count = images.length;

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onStep(-1);
      if (e.key === "ArrowRight") onStep(1);
    };
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose, onStep]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} image ${active + 1} of ${count}`}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-14 xs:p-3 animate-[gallery-fade_0.25s_ease]"
    >
      {/* Clicking the image itself keeps the viewer open; clicking anywhere around it closes it */}
      <Image
        key={images[active]}
        src={`/${images[active]}`}
        alt={`${title} image ${active + 1} of ${count}`}
        width={1920}
        height={1080}
        quality={90}
        sizes="100vw"
        onClick={(e) => e.stopPropagation()}
        className="w-auto h-auto max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-[gallery-fade_0.35s_ease]"
      />
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className={`${lightboxButton} absolute top-4 right-4`}
      >
        <FaTimes />
      </button>
      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              onStep(-1);
            }}
            className={`${lightboxButton} absolute left-4 xs:left-2 top-1/2 -translate-y-1/2`}
          >
            <FaChevronLeft />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              onStep(1);
            }}
            className={`${lightboxButton} absolute right-4 xs:right-2 top-1/2 -translate-y-1/2`}
          >
            <FaChevronRight />
          </button>
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-[13px] font-semibold text-white backdrop-blur-sm">
            {active + 1} / {count}
          </span>
        </>
      )}
    </div>,
    document.body
  );
}

// Viewer with arrows, keyboard support and a thumbnail strip, all in one card.
// Images use object-contain so screenshots are never cropped.
export default function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const count = images.length;
  const go = useCallback((step: number) => setActive((index) => (index + step + count) % count), [count]);
  const [expanded, setExpanded] = useState(false);
  const close = useCallback(() => setExpanded(false), []);
  const stripRef = useRef<HTMLDivElement>(null);

  // Keep the active thumbnail in view when paging with the arrows. Scrolls only the
  // strip sideways (scrollIntoView could also scroll the whole page).
  useEffect(() => {
    const strip = stripRef.current;
    const thumb = strip?.children[active] as HTMLElement | undefined;
    if (!strip || !thumb) return;
    const left = thumb.offsetLeft - strip.offsetLeft;
    if (left < strip.scrollLeft || left + thumb.offsetWidth > strip.scrollLeft + strip.clientWidth) {
      strip.scrollTo({ left: left - (strip.clientWidth - thumb.offsetWidth) / 2, behavior: "smooth" });
    }
  }, [active]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  };

  return (
    <GlassCard interactive={false} className="h-full p-4 xs:p-3 flex flex-col gap-3">
      <div
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-roledescription="carousel"
        aria-label={`${title} images`}
        className="relative flex-1 aspect-video overflow-hidden rounded-xl bg-black/80 outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
      >
        <Image
          key={images[active]}
          src={`/${images[active]}`}
          alt={`${title} image ${active + 1} of ${count}`}
          fill
          priority={active === 0}
          quality={90}
          sizes="(max-width: 897px) 100vw, 640px"
          className="object-contain animate-[gallery-fade_0.35s_ease]"
        />
        <button
          type="button"
          aria-label="View image full screen"
          onClick={() => setExpanded(true)}
          className="group/expand absolute inset-0 cursor-zoom-in"
        >
          <span className="absolute top-3 left-3 flex items-center justify-center w-9 h-9 rounded-full bg-black/45 text-white text-[13px] backdrop-blur-sm opacity-70 transition group-hover/expand:opacity-100 group-hover/expand:bg-black/65">
            <FaExpand />
          </span>
        </button>
        {count > 1 && (
          <>
            <button type="button" aria-label="Previous image" onClick={() => go(-1)} className={`${navButton} left-3`}>
              <FaChevronLeft />
            </button>
            <button type="button" aria-label="Next image" onClick={() => go(1)} className={`${navButton} right-3`}>
              <FaChevronRight />
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-black/55 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
              {active + 1} / {count}
            </span>
          </>
        )}
      </div>

      {count > 1 && (
        <div ref={stripRef} className="thumb-strip flex gap-2.5 overflow-x-auto snap-x snap-mandatory p-1.5 scroll-px-1.5">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              aria-label={`Show image ${index + 1}`}
              aria-current={index === active}
              onClick={() => setActive(index)}
              className={`relative shrink-0 snap-start w-24 xs:w-20 aspect-video overflow-hidden rounded-lg bg-black/80 transition duration-300 ${
                index === active ? "opacity-100" : "opacity-45 hover:opacity-90"
              }`}
            >
              <span aria-hidden="true" className="absolute inset-0 animate-pulse bg-white/10" />
              <Image src={`/${image}`} alt="" fill sizes="96px" className="object-cover" />
              {/* Highlight drawn on top of the image and inside its edge, so it can't be covered or clipped */}
              {index === active && (
                <span className="pointer-events-none absolute inset-0 rounded-lg ring-2 ring-inset ring-sky-500" />
              )}
            </button>
          ))}
        </div>
      )}
      {expanded && <Lightbox images={images} active={active} title={title} onClose={close} onStep={go} />}
    </GlassCard>
  );
}
