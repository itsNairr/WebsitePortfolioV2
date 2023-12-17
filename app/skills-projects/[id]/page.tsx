"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./swiper.css"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import projectsData from "@/app/data/projects.json";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";

type ProjectType = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  github: string;
  url: string;
  images: string[];
};

function page({ params }: any) {
  const [project, setProject] = useState<ProjectType>();
  const router = useRouter();
  const { id } = params;
  useEffect(() => {
    const foundProject = projectsData.projects.find(
      (project) => project.id == id
    ) as ProjectType;
    if (!foundProject) {
      router.push("/skills-projects");
    } else {
      setProject(foundProject);
    }
  }, [id]);
  return (
    <div className="min-h-screen max-h-full pt-[120px] pb-[100px] flex flex-col justify-center items-center">
      <div className="absolute top-[120px] left-0 mx-5">
        <div className="text-[20px] xs:text-[18px] sm:text-[18px] font-semibold">
          <Link href={"/skills-projects"} className="flex flex-row items-center"><FaArrowLeft/> <span className="ml-2">Back</span></Link>
        </div>
      </div>
      {project && (
        <>
          <div className="">
            <div className="flex flex-row p-10 xs:p-7 mx-5 mt-10 dark:bg-carddark bg-cardlight rounded-lg w-[80vw] flex-wrap">
              <section className="flex flex-col justify-between w-[50%] sm:w-full xs:w-full">
                <div> 
                  <div className="text-[40px] xs:text-[30px] sm:text-[35px] sm: mb-5">
                    {project.title}
                  </div>
                  <div className="mb-5">
                    {Array.isArray(project.tags) &&
                      project.tags.map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="p-2 mr-5 text-[15px] xs:text-[12px] xs:mr-3 dark:bg-zinc-700 bg-zinc-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                  <div
                    id="items"
                    className="inline-flex flex-row gap-10 text-[20px] items-center mb-5"
                  >
                    {project.url && (
                      <a
                        href={project.url}
                        target="blank"
                        className="text-[25px] flex flex-row items-center gap-1 font-semibold item"
                      >
                        <span className="text-[18px]">Website</span>{" "}
                        <GoArrowUpRight />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="blank"
                        className="flex flex-row items-center gap-2 font-semibold item"
                      >
                        Github <FaGithub />
                      </a>
                    )}
                  </div>
                </div>
                <p className="w-[90%] xs:w-full sm:w-full">{project.description}</p>
              </section>
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                rewind
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
                className="w-[45%] sm:h-[300px] xs:h-[300px] sm:w-full xs:w-full"
              >
                {Array.isArray(project.images) && project.images.map((image: string, index: number) => (
                  <SwiperSlide key={index}>
                    <div className="h-full flex flex-col items-center justify-center">
                      <Image
                        src={`/${image}`}
                        alt="Image"
                        width={375}
                        height={375}
                        className="rounded-lg"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default page;
