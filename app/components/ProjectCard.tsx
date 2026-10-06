import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { FaArrowRight, FaFileAlt, FaGithub } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import GlassCard from "./GlassCard";
import ProjectPlaceholder from "./ProjectPlaceholder";
import type { Project } from "../data/projects";

function ExternalLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="blank"
      aria-label={label}
      className="relative z-[4] flex items-center justify-center w-9 h-9 rounded-full text-[17px] bg-black/5 dark:bg-white/10 hover:bg-sky-500/20 hover:text-sky-500 transition-colors"
    >
      {children}
    </a>
  );
}

export default function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const preview = project.images?.[0];

  return (
    <div
      className={`reveal group ${featured ? "col-span-2 sm:col-span-1 xs:col-span-1" : ""}`}
    >
      <GlassCard className="relative h-full overflow-hidden flex flex-col">
        <div
          className={`relative overflow-hidden ${
            featured ? "aspect-[21/9] sm:aspect-video xs:aspect-video" : "aspect-video"
          }`}
        >
          {preview ? (
            <>
            <div aria-hidden="true" className="absolute inset-0 animate-pulse bg-black/10 dark:bg-white/10" />
            <Image
              src={`/${preview}`}
              alt={`${project.title} preview`}
              fill
              sizes={featured ? "(max-width: 897px) 100vw, 1200px" : "(max-width: 897px) 100vw, 600px"}
              quality={90}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            </>
          ) : (
            <ProjectPlaceholder
              project={project}
              className="text-[56px] transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent" />
        </div>

        <div className="relative z-[2] flex flex-1 flex-col gap-3 p-6 xs:p-5">
          <h2 className={`font-bold leading-snug ${featured ? "text-[26px] xs:text-[20px]" : "text-[20px] xs:text-[18px]"}`}>
            {/* Stretched link: makes the whole card open the project page */}
            <Link
              href={`/projects/${project.id}`}
              className="after:absolute after:inset-0 after:z-[3] after:content-['']"
            >
              {project.title}
            </Link>
          </h2>
          <p className={`text-[15px] xs:text-[14px] leading-relaxed opacity-80 ${featured ? "line-clamp-4" : "line-clamp-3"}`}>
            {project.description}
          </p>
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
          <div className="mt-auto pt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {project.url && (
                <ExternalLink href={project.url} label={`${project.title} live site`}>
                  <GoArrowUpRight />
                </ExternalLink>
              )}
              {project.github && (
                <ExternalLink href={project.github} label={`${project.title} on GitHub`}>
                  <FaGithub />
                </ExternalLink>
              )}
              {project.paper && (
                <ExternalLink href={project.paper} label={`${project.title} paper`}>
                  <FaFileAlt />
                </ExternalLink>
              )}
            </div>
            <span className="flex items-center gap-2 text-[13px] font-semibold text-sky-600 dark:text-sky-400">
              View project
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
