"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import animationDataLight from "./lotties/scroll-down-light.json";
import animationDataDark from "./lotties/scroll-down-dark.json";
import { useSelector } from "react-redux";
import { useEffect, useState, type ReactNode } from "react";
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
import GalaxyBackground from "./components/GalaxyBackground";
import projectsData from "./data/projects.json";
import jobsData from "./data/jobs.json";
import type { RootState } from "./redux/store";

const Lottie = dynamic(() => import("lottie-react").then((m) => m.Lottie), {
  ssr: false,
});

const links = [
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

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
        className="liquid-glass flex items-center gap-4 xs:gap-3 rounded-3xl px-5 py-4 xs:px-3 xs:py-2"
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
  const isDark = useSelector((state: RootState) => state.themeReducer.isDark);
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
      <GalaxyBackground />
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
          <div className="md:flex sm:flex xs:flex flex-wrap justify-center gap-x-4 gap-y-6 xs:gap-x-3 mt-10 max-w-[800px]">
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
