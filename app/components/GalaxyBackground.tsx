import type { CSSProperties } from "react";

const blobs = [
  { top: "-5%", left: "0%", size: "clamp(260px, 45vw, 680px)", from: "hsl(158, 82%, 57%, 0.85)", to: "hsl(252, 82%, 57%)" },
  { top: "35%", left: "50%", size: "clamp(280px, 50vw, 760px)", from: "hsl(330, 90%, 60%, 0.85)", to: "hsl(25, 95%, 58%)" },
  { top: "-15%", left: "55%", size: "clamp(220px, 40vw, 600px)", from: "hsl(195, 95%, 55%, 0.85)", to: "hsl(225, 90%, 60%)" },
  { top: "50%", left: "-10%", size: "clamp(240px, 42vw, 640px)", from: "hsl(48, 96%, 58%, 0.85)", to: "hsl(340, 85%, 60%)" },
  { top: "20%", left: "25%", size: "clamp(200px, 34vw, 520px)", from: "hsl(275, 85%, 62%, 0.85)", to: "hsl(185, 85%, 50%)" },
  { top: "65%", left: "30%", size: "clamp(180px, 30vw, 460px)", from: "hsl(210, 90%, 60%, 0.85)", to: "hsl(290, 80%, 60%)" },
  { top: "5%", left: "80%", size: "clamp(160px, 26vw, 400px)", from: "hsl(140, 70%, 50%, 0.85)", to: "hsl(200, 90%, 55%)" },
];

// Deterministic pseudo-random star field so server and client render the same markup.
const stars = Array.from({ length: 90 }, (_, i) => {
  const rand = (n: number) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
  return {
    top: `${(rand(1) * 100).toFixed(2)}%`,
    left: `${(rand(2) * 100).toFixed(2)}%`,
    size: rand(3) < 0.8 ? 2 : 3,
    duration: `${(2 + rand(4) * 4).toFixed(2)}s`,
    delay: `${(-rand(5) * 6).toFixed(2)}s`,
  };
});

// `subtle` tones the galaxy down for content-heavy pages.
export default function GalaxyBackground({ subtle = false }: { subtle?: boolean }) {
  return (
    <>
      <div className="blobs galaxy-layer" style={subtle ? { opacity: 0.2 } : undefined}>
        {blobs.map((blob, index) => (
          <div
            key={index}
            className="blob"
            style={
              {
                top: blob.top,
                left: blob.left,
                "--size": blob.size,
                "--from": blob.from,
                "--to": blob.to,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div
        className="galaxy-layer fixed inset-0 z-0 pointer-events-none hidden dark:block"
        style={subtle ? { opacity: 0.5 } : undefined}
        aria-hidden="true"
      >
        {(subtle ? stars.slice(0, 40) : stars).map((star, index) => (
          <span
            key={index}
            className="absolute rounded-full bg-white"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animation: `twinkle ${star.duration} ease-in-out ${star.delay} infinite`,
            }}
          />
        ))}
      </div>
    </>
  );
}
