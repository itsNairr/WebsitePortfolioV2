"use client";

import React, { useEffect, useState } from "react";
import projectsData from "../data/projects.json";
import { FaGithub } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { GoArrowUpRight } from "react-icons/go";

type ProjectType = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  github: string;
  url: string;
};

// {Array.isArray(project.tags) &&
//     project.tags.map((tag: string, index: number) => (
//       <span className="p-1" key={index}>
//         {tag}
//       </span>
//     ))}

export default function Project(props: any) {
  return (
    <>
      {projectsData.projects.map((project: any) => (
        <div
          key={project.id}
          className="flex flex-col items-center justify-center"
        >
          <div className="p-10 dark:border-white border-black border-[2px] rounded-lg">
            <div className="text-[20px] ">{project.title}</div>
            <div className="flex flex-row gap-5">
              <a href={project.github} target="blank">
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
