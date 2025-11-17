"use client";
import jobsData from "../data/jobs.json";
import "./timeline.css";
import { GoArrowUpRight } from "react-icons/go";

type Job = {
  id: number;
  title: string;
  org: string;
  date: string;
  description: string;
};

function TimelineComponent() {
  return (
    <div className="timeline w-screen">
      {jobsData.jobs
        .sort((a, b) => b.id - a.id)
        .map((job: any, index: number) => (
          <div
            key={job.id}
            className={`timeline-item ${index % 2 === 0 ? "left" : "right "}`}
          >
            <div data-aos={index % 2 === 0 ? "fade-left" : "fade-right"} className="p-5 gap-5 dark:bg-carddark bg-cardlight rounded-lg flex flex-col justify-between mx-5 xs:z-10">
              <div>
                <div className="flex flex-row items-center justify-between">
                  <h1 className="text-[20px] font-bold">{job.title}</h1>
                  <a href={job.url} target="blank" className="text-[25px]">
                    <GoArrowUpRight />
                  </a>
                </div>
                <h2 className="text-[17px]">{job.org}</h2>
                <h3 className="xs:text-[14px]">{job.date}</h3>
              </div>
              <div className="xs:hidden">
                {Array.isArray(job.description) &&
                  job.description.map((point: string, index: number) => (
                    <li key={index}>{point}</li>
                  ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default TimelineComponent;
