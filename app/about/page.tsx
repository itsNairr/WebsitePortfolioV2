import Image from "next/image";
import type { ReactNode } from "react";
import {
  FaAws,
  FaBrain,
  FaCode,
  FaDatabase,
  FaGraduationCap,
  FaLayerGroup,
  FaTools,
  FaUsers,
} from "react-icons/fa";
import GalaxyBackground from "../components/GalaxyBackground";
import GlassCard from "../components/GlassCard";
import aboutData from "../data/about.json";

// Icon and tile colour per skill group, in the same order as about.json.
const skillStyles: { icon: ReactNode; tile: string }[] = [
  { icon: <FaCode />, tile: "from-sky-400 to-blue-600" },
  { icon: <FaLayerGroup />, tile: "from-violet-500 to-purple-700" },
  { icon: <FaDatabase />, tile: "from-emerald-400 to-teal-600" },
  { icon: <FaBrain />, tile: "from-fuchsia-500 to-pink-600" },
  { icon: <FaTools />, tile: "from-amber-400 to-orange-600" },
];

function IconTile({ tile, children }: { tile: string; children: ReactNode }) {
  return (
    <div
      className={`flex items-center justify-center shrink-0 w-10 h-10 rounded-xl text-white text-[18px] bg-gradient-to-br ${tile}`}
    >
      {children}
    </div>
  );
}

function LogoTile({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex items-center justify-center shrink-0 w-14 h-14 rounded-2xl bg-white p-2 ring-1 ring-black/10 dark:ring-white/15 shadow-md">
      <Image src={src} alt={alt} width={40} height={40} unoptimized className="h-full w-full object-contain" />
    </div>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full px-2.5 py-1 text-xs font-medium bg-black/5 dark:bg-white/10">
      {children}
    </span>
  );
}

function page() {
  const { education, community } = aboutData;

  return (
    <>
      <GalaxyBackground subtle />
      <div className="relative z-10 min-h-screen max-h-full pt-[120px] pb-[100px] w-full px-5">
        <header className="flex flex-col items-center text-center mb-12 xs:mb-8">
          <h1 className="text-[40px] xs:text-[30px] font-bold">About</h1>
        </header>
        <div className="grid grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-5 max-w-[1100px] mx-auto">
          {/* Education */}
          <GlassCard className="reveal col-span-2 sm:col-span-1 xs:col-span-1 p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wider opacity-70">
              <FaGraduationCap /> Education
            </div>
            <div className="flex items-center gap-4">
              <LogoTile src={education.logo} alt={`${education.school} logo`} />
              <div>
                <h2 className="text-[18px] font-bold leading-snug">{education.school}</h2>
                <p className="text-[14px] opacity-80">{education.degree}</p>
              </div>
            </div>
            <span className="w-fit rounded-full px-3 py-1 text-[13px] font-semibold bg-violet-500/10 text-violet-700 dark:text-violet-300">
              {education.date}
            </span>
            <div className="flex flex-wrap gap-2">
              {education.coursework.map((course) => (
                <Chip key={course}>{course}</Chip>
              ))}
            </div>
          </GlassCard>

          {/* Skills */}
          <GlassCard className="reveal col-span-2 sm:col-span-1 xs:col-span-1 p-8 xs:p-6">
            <h2 className="text-[24px] font-bold mb-6">Skills</h2>
            <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-6">
              {aboutData.skills.map((skill, index) => (
                <div key={skill.group} className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <IconTile tile={skillStyles[index].tile}>{skillStyles[index].icon}</IconTile>
                    <h3 className="text-[16px] font-bold">{skill.group}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <Chip key={item}>{item}</Chip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Certification */}
          <GlassCard className="reveal p-6 flex items-center gap-4">
            <IconTile tile="from-amber-400 to-orange-600">
              <FaAws />
            </IconTile>
            <div>
              <div className="text-[13px] font-semibold uppercase tracking-wider opacity-70">Certification</div>
              <div className="text-[16px] font-bold leading-snug">{aboutData.certification}</div>
            </div>
          </GlassCard>

          {/* Community */}
          <GlassCard className="reveal p-6 flex items-center gap-4">
            <IconTile tile="from-rose-500 to-red-600">
              <FaUsers />
            </IconTile>
            <div>
              <div className="text-[13px] font-semibold uppercase tracking-wider opacity-70">{community.role}</div>
              <div className="text-[16px] font-bold leading-snug">{community.org}</div>
            </div>
          </GlassCard>
        </div>
      </div>
    </>
  );
}

export default page;
