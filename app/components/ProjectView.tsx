import Link from "next/link";
import type { ReactNode } from "react";
import { FaArrowLeft, FaArrowRight, FaFileAlt, FaGithub } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import GalaxyBackground from "./GalaxyBackground";
import GlassCard from "./GlassCard";
import ProjectGallery from "./ProjectGallery";
import ProjectPlaceholder from "./ProjectPlaceholder";
import type { Project } from "../data/projects";

function ActionLink({ href, icon, children }: { href: string; icon: ReactNode; children: ReactNode }) {
  return (
    <a
      href={href}
      target="blank"
      className="liquid-glass liquid-glass-hover inline-flex items-center gap-2 rounded-full px-4 py-2 text-[14px] font-semibold hover:-translate-y-0.5"
    >
      {icon}
      {children}
    </a>
  );
}

function SiblingLink({ project, direction }: { project: Project; direction: "previous" | "next" }) {
  const isNext = direction === "next";
  const label = isNext ? "Next" : "Previous";
  return (
    <Link
      href={`/projects/${project.id}`}
      aria-label={`${label} project: ${project.title}`}
      className="group block h-full"
    >
      <GlassCard
        className={`h-full p-5 xs:px-4 xs:py-3.5 flex flex-col gap-1 xs:justify-center ${
          isNext ? "items-end text-right" : ""
        }`}
      >
        <span className="flex items-center gap-2 text-[12px] xs:text-[13px] font-semibold uppercase tracking-wider opacity-60 xs:opacity-80">
          {!isNext && <FaArrowLeft className="transition-transform group-hover:-translate-x-1" />}
          {label}
          <span className="xs:hidden">project</span>
          {isNext && <FaArrowRight className="transition-transform group-hover:translate-x-1" />}
        </span>
        {/* Titles are hidden on phones so both buttons fit on one row */}
        <span className="text-[17px] font-bold leading-snug xs:hidden">{project.title}</span>
      </GlassCard>
    </Link>
  );
}

export default function ProjectView({
  project,
  previous,
  next,
}: {
  project: Project;
  previous?: Project;
  next?: Project;
}) {
  const images = project.images ?? [];

  return (
    <>
      <GalaxyBackground subtle />
      <main className="relative z-10 min-h-screen w-full max-w-[1100px] mx-auto px-5 pt-[120px] pb-[100px] flex flex-col gap-8 xs:gap-6">
        <Link
          href="/projects"
          className="group inline-flex w-fit items-center gap-2 text-[14px] font-semibold opacity-75 hover:opacity-100 transition-opacity"
        >
          <FaArrowLeft className="transition-transform group-hover:-translate-x-1" />
          All projects
        </Link>

        <header className="reveal flex flex-col gap-5">
          <h1 className="text-[44px] md:text-[40px] sm:text-[34px] xs:text-[28px] font-bold leading-tight">
            {project.title}
          </h1>
          {(project.url || project.github || project.paper) && (
            <div className="flex flex-wrap gap-3">
              {project.url && (
                <ActionLink href={project.url} icon={<GoArrowUpRight className="text-[18px]" />}>
                  Live site
                </ActionLink>
              )}
              {project.github && (
                <ActionLink href={project.github} icon={<FaGithub />}>
                  GitHub
                </ActionLink>
              )}
              {project.paper && (
                <ActionLink href={project.paper} icon={<FaFileAlt />}>
                  Research paper
                </ActionLink>
              )}
            </div>
          )}
        </header>

        {/* Overview + tech stack on the left, gallery on the right; both columns stretch to the same height */}
        <div className="grid grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-6 items-stretch">
          <div className="reveal flex flex-col gap-6 sm:order-2 xs:order-2">
            <GlassCard interactive={false} className="flex-1 p-8 xs:p-6">
              <h2 className="text-[13px] font-semibold uppercase tracking-wider opacity-60 mb-3">Overview</h2>
              <p className="text-[16px] xs:text-[15px] leading-relaxed opacity-90">{project.description}</p>
            </GlassCard>
            <GlassCard interactive={false} className="p-8 xs:p-6">
              <h2 className="text-[13px] font-semibold uppercase tracking-wider opacity-60 mb-3">Tech stack</h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-2.5 py-1 text-xs font-medium bg-black/5 dark:bg-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </GlassCard>
          </div>

          <section className="reveal sm:order-1 xs:order-1">
            {images.length > 0 ? (
              <ProjectGallery images={images} title={project.title} />
            ) : (
              <GlassCard interactive={false} className="h-full p-3">
                <div className="relative h-full min-h-[260px] overflow-hidden rounded-2xl">
                  <ProjectPlaceholder project={project} className="text-[64px] xs:text-[48px]" />
                </div>
              </GlassCard>
            )}
          </section>
        </div>

        {(previous || next) && (
          // A lone previous/next link stretches across the full width.
          <nav
            aria-label="More projects"
            className={`grid gap-6 xs:gap-3 ${previous && next ? "grid-cols-2" : "grid-cols-1"}`}
          >
            {previous && <SiblingLink project={previous} direction="previous" />}
            {next && <SiblingLink project={next} direction="next" />}
          </nav>
        )}
      </main>
    </>
  );
}
