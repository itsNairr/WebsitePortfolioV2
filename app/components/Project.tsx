"use client";

import React from "react";
import projectsData from "../data/projects.json";
import { FaGithub } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { GoArrowUpRight } from "react-icons/go";
import Link from "next/link";

type ProjectType = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  github: string;
  url: string;
};

export default function Project(props: any) {
  return (
    <>
      {projectsData.projects.map((project: any) => (
        <div
          key={project.id}
          className="xs:w-full"
        >
          <div className="p-5 h-[175px] dark:border-white border-black border-[2px] rounded-lg flex flex-col justify-between">
            <section>
              <div className="text-[20px] mb-1">{project.title}</div>
              <div className="flex flex-row gap-1">
                {Array.isArray(project.tags) &&
                  project.tags.map((tag: string, index: number) => (
                    <span
                      className="p-1.5 text-[12px] dark:bg-gray-500 bg-slate-200 rounded-full"
                      key={index}
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </section>
            <div className="flex flex-row gap-3 text-[20px] items-center justify-between">
              <div className="flex flex-row gap-3 text-[20px] items-center">
              {project.url && <a href={project.url} target="blank" className="text-[25px]">
                <GoArrowUpRight/>
              </a>}
              <a href={project.github} target="blank">
                <FaGithub />
              </a>
              </div>
              <Link href={`/skills-projects/${project.id}`}><FaArrowRight/></Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
