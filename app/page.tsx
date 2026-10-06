"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import animationDataLight from "./lotties/scroll-down-light.json";
import animationDataDark from "./lotties/scroll-down-dark.json";
import { useSelector } from "react-redux";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import {
  FaEye,
  FaBriefcase,
  FaCode,
  FaFolderOpen,
  FaRobot,
  FaLayerGroup,
  FaUserGraduate,
} from "react-icons/fa";
import "aos/dist/aos.css";
import NavbarMain from "./components/NavbarMain";
import projectsData from "./data/projects.json";
import jobsData from "./data/jobs.json";

const Lottie = dynamic(() => import("lottie-react").then((m) => m.Lottie), {
  ssr: false,
});

const links = [
  { href: "/experience", label: "Experience" },
  { href: "/skills-projects", label: "Skills & Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const blobs = [
  { top: "-5%", left: "0%", size: "clamp(260px, 45vw, 680px)", from: "hsl(158, 82%, 57%, 0.85)", to: "hsl(252, 82%, 57%)", speed: "5s" },
  { top: "35%", left: "50%", size: "clamp(280px, 50vw, 760px)", from: "hsl(330, 90%, 60%, 0.85)", to: "hsl(25, 95%, 58%)", speed: "7s" },
  { top: "-15%", left: "55%", size: "clamp(220px, 40vw, 600px)", from: "hsl(195, 95%, 55%, 0.85)", to: "hsl(225, 90%, 60%)", speed: "6s" },
  { top: "50%", left: "-10%", size: "clamp(240px, 42vw, 640px)", from: "hsl(48, 96%, 58%, 0.85)", to: "hsl(340, 85%, 60%)", speed: "8s" },
  { top: "20%", left: "25%", size: "clamp(200px, 34vw, 520px)", from: "hsl(275, 85%, 62%, 0.85)", to: "hsl(185, 85%, 50%)", speed: "9s" },
  { top: "65%", left: "30%", size: "clamp(180px, 30vw, 460px)", from: "hsl(210, 90%, 60%, 0.85)", to: "hsl(290, 80%, 60%)", speed: "6.5s" },
  { top: "5%", left: "80%", size: "clamp(160px, 26vw, 400px)", from: "hsl(140, 70%, 50%, 0.85)", to: "hsl(200, 90%, 55%)", speed: "7.5s" },
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

type Highlight = {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  tile: string;
  position: string;
};

// `position` places each card around the name on wide screens (lg and up);
// on smaller screens the cards wrap into a cluster below the name instead.
const highlights: Highlight[] = [
  { icon: <FaRobot />, title: "Mechatronics Engineering", subtitle: "Queen's University", tile: "from-emerald-400 to-teal-600", position: "top-[20%] left-[5%]" },
  { icon: <FaCode />, title: "Software Developer", tile: "from-sky-400 to-blue-600", position: "top-[27%] left-[31%]" },
  { icon: <FaEye />, title: "Computer Vision", subtitle: "Robotics & Perception", tile: "from-violet-500 to-purple-700", position: "top-[21%] right-[28%]" },
  { icon: <FaFolderOpen />, title: `${projectsData.projects.length}+`, subtitle: "Projects", tile: "from-fuchsia-500 to-pink-600", position: "top-[28%] right-[6%]" },
  { icon: <FaBriefcase />, title: `${jobsData.jobs.length}+`, subtitle: "Roles", tile: "from-cyan-400 to-sky-600", position: "bottom-[22%] left-[9%]" },
  { icon: <FaLayerGroup />, title: "Full-Stack Development", tile: "from-amber-400 to-orange-600", position: "bottom-[15%] left-[33%]" },
  { icon: <FaUserGraduate />, title: "Seeking New Grad Roles", subtitle: "Open to opportunities", tile: "from-rose-500 to-red-600", position: "bottom-[20%] right-[8%]" },
];

function getGreeting(hour: number) {
  if (hour < 12) return "Good Morning,";
  if (hour < 18) return "Hey!";
  return "Good Evening,";
}

function HighlightCard({ highlight, index }: { highlight: Highlight; index: number }) {
  return (
    <div
      className={`absolute md:static sm:static xs:static ${highlight.position}`}
      data-aos="zoom-in"
      data-aos-delay={200 + index * 100}
    >
      <div
        className="flex items-center gap-4 xs:gap-3 rounded-2xl bg-cardlight/80 dark:bg-carddark/80 backdrop-blur-md shadow-lg px-5 py-4 xs:px-3 xs:py-2"
        style={{ animation: `float 6s ease-in-out ${-index * 1.3}s infinite` }}
      >
        <div
          className={`flex items-center justify-center shrink-0 w-12 h-12 xs:w-9 xs:h-9 rounded-xl text-white text-[22px] xs:text-[16px] bg-gradient-to-br ${highlight.tile}`}
        >
          {highlight.icon}
        </div>
        <div className="leading-tight text-left">
          <div className="text-[20px] xs:text-[15px] font-bold">{highlight.title}</div>
          {highlight.subtitle && (
            <div className="text-[14px] xs:text-[12px] opacity-70">{highlight.subtitle}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const isDark = useSelector((state: any) => state.themeReducer.isDark);
  const [greeting, setGreeting] = useState("Hello,");

  useEffect(() => {
    import("aos").then((AOS) => {
      AOS.init({
        duration: 1200,
        once: true,
      });
      AOS.refresh();
    });
    setGreeting(getGreeting(new Date().getHours()));
  }, []);

  function handleScroll() {
    document.getElementById("navscreen")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <NavbarMain />
      <div className="blobs">
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
                "--speed": blob.speed,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        {stars.map((star, index) => (
          <span
            key={index}
            className="absolute rounded-full bg-slate-500 dark:bg-white"
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
      <main className="relative z-10 min-h-screen max-h-full pt-10">
        <section className="relative min-h-screen flex flex-col items-center justify-center px-5 pt-[80px] pb-[120px]">
          <h1 className="flex flex-col items-center text-center">
            <span className="text-[30px] sm:text-[26px] xs:text-[22px] font-medium opacity-80">
              {greeting} I'm
            </span>
            <span className="text-[96px] md:text-[84px] sm:text-[68px] xs:text-[50px] font-extrabold leading-none mt-2">
              Hari Nair
            </span>
          </h1>
          <div className="md:flex sm:flex xs:flex flex-wrap justify-center gap-4 xs:gap-3 mt-10 max-w-[800px]">
            {highlights.map((highlight, index) => (
              <HighlightCard key={highlight.title} highlight={highlight} index={index} />
            ))}
          </div>
          <div onClick={handleScroll} className="absolute bottom-[5%] cursor-pointer">
            <Lottie
              src={isDark ? animationDataLight : animationDataDark}
              autoplay
              loop={true}
              style={{ width: 50, height: 50 }}
            />
          </div>
        </section>

        <section className="min-h-screen flex items-center" id="navscreen">
          <div
            className="block ml-[10%] text-[75px] sm:text-[60px] xs:text-[50px] font-light"
            id="items"
          >
            {links.map((link) => (
              <div key={link.href} data-aos="fade-right" className="item">
                <Link href={link.href}>{link.label}</Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
