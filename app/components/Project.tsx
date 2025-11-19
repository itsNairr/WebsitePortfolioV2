"use client";

import React from "react";
import projectsData from "../data/projects.json";
import { FaGithub } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { GoArrowUpRight } from "react-icons/go";
import Link from "next/link";

export default function Project(props: any) {
  const handleOnMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Set the CSS variables directly on the element
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };
  return (
    <>
      {projectsData.projects.map((project: any) => (
        <div key={project.id} className="xs:w-full card relative rounded-lg overflow-hidden dark:bg-carddark bg-cardlight" data-aos="flip-up" data-aos-delay={screen.width > 575 ? project.id * 250 : 0} onMouseMove={handleOnMouseMove}>
          <div className="p-5 h-[175px] flex flex-col justify-between relative z-10">
            <section>
              <div className="text-[20px] mb-1">{project.title}</div>
              <div className="flex flex-row gap-1">
                {Array.isArray(project.tags) &&
                  project.tags.map((tag: string, index: number) => (
                    <span
                      className="p-1.5 text-[12px] dark:bg-zinc-700 bg-zinc-300 rounded-full"
                      key={index}
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </section>
            <div
              id="items"
              className="flex flex-row gap-3 text-[20px] items-center justify-between"
            >
              <div className="flex flex-row gap-3 text-[20px] items-center item">
                {project.url && (
                  <a href={project.url} target="blank" className="text-[25px]">
                    <GoArrowUpRight />
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="blank">
                    <FaGithub />
                  </a>
                )}
              </div>
              <Link
                href={`/skills-projects/${project.id}`}
                className="flex flex-row items-center gap-2 item"
              >
                <b className="text-[13px]">Learn More</b> <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
