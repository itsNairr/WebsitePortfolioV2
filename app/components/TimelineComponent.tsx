"use client";
import { useState } from "react";
import Image from "next/image";
import jobsData from "../data/jobs.json";
import GlassCard from "./GlassCard";
import "./timeline.css";
import { GoArrowUpRight } from "react-icons/go";

type Job = (typeof jobsData.jobs)[number];

// Bullets shown before "Show more" on longer entries.
const VISIBLE_BULLETS = 3;

function Bullet({ text }: { text: string }) {
  return (
    <li className="relative pl-5 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-gradient-to-r before:from-sky-400 before:to-violet-500">
      {/* `**text**` in jobs.json marks highlights, matching the resume's bold metrics */}
      {text.split("**").map((part, index) =>
        index % 2 === 1 ? (
          <strong key={index} className="font-semibold">
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </li>
  );
}

function LogoNode({ job, isCurrent }: { job: Job; isCurrent: boolean }) {
  return (
    <div
      className={`relative z-10 h-[var(--node)] w-[var(--node)] rounded-2xl shadow-md ${
        isCurrent
          ? "p-[2px] bg-gradient-to-br from-sky-400 via-violet-500 to-pink-500"
          : "ring-1 ring-black/10 dark:ring-white/15"
      }`}
    >
      <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-white p-2">
        <Image
          src={job.logo}
          alt={`${job.org} logo`}
          width={40}
          height={40}
          unoptimized
          className="h-full w-full object-contain"
        />
      </div>
      {isCurrent && (
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-[rgb(255,255,255)] dark:ring-[rgb(20,20,20)]" />
        </span>
      )}
    </div>
  );
}

function ExperienceCard({ job }: { job: Job }) {
  const [expanded, setExpanded] = useState(false);
  const isCurrent = job.date.includes("Present");
  const visible = job.description.slice(0, VISIBLE_BULLETS);
  const hidden = job.description.slice(VISIBLE_BULLETS);

  return (
    <li className="timeline-item reveal grid grid-cols-[var(--node)_1fr] gap-6 xs:gap-4">
      <LogoNode job={job} isCurrent={isCurrent} />
      <GlassCard as="article" className="p-6 xs:p-4">
        <header className="flex flex-row xs:flex-col items-start justify-between gap-3 xs:gap-2">
          <div>
            <h2 className="text-[20px] xs:text-[18px] font-bold leading-snug">{job.title}</h2>
            <a
              href={job.url}
              target="blank"
              className="inline-flex items-center gap-1 mt-1 text-[16px] opacity-80 hover:opacity-100 hover:text-sky-500 transition-colors"
            >
              {job.org}
              <GoArrowUpRight />
            </a>
          </div>
          <span
            className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1 text-[13px] font-semibold ${
              isCurrent
                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                : "bg-black/5 dark:bg-white/10"
            }`}
          >
            {job.date.replace(" - ", " – ")}
          </span>
        </header>

        <ul className="mt-4 flex flex-col gap-2 text-[15px] xs:text-[14px] leading-relaxed opacity-90">
          {visible.map((point, index) => (
            <Bullet key={index} text={point} />
          ))}
        </ul>
        {hidden.length > 0 && (
          <>
            <div
              className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
                expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <ul className="overflow-hidden flex flex-col gap-2 text-[15px] xs:text-[14px] leading-relaxed opacity-90">
                {hidden.map((point, index) => (
                  <Bullet key={index} text={point} />
                ))}
              </ul>
            </div>
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setExpanded(!expanded)}
              className="mt-3 text-[14px] font-semibold text-sky-600 dark:text-sky-400 hover:underline"
            >
              {expanded ? "Show less" : `Show ${hidden.length} more`}
            </button>
          </>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {job.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-2.5 py-1 text-xs font-medium bg-black/5 dark:bg-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </GlassCard>
    </li>
  );
}

function TimelineComponent() {
  const jobs = [...jobsData.jobs].sort((a, b) => b.id - a.id);

  return (
    <div className="timeline relative w-full max-w-[860px] mx-auto">
      <div className="timeline-rail" aria-hidden="true" />
      <div className="timeline-fill" aria-hidden="true" />
      <ol className="flex flex-col gap-10 xs:gap-8">
        {jobs.map((job) => (
          <ExperienceCard key={job.id} job={job} />
        ))}
      </ol>
    </div>
  );
}

export default TimelineComponent;
