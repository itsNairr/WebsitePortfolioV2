"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./swiper.css";

import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaGithub } from "react-icons/fa6";
import { FaGithub as GithubIcon } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";

type ProjectType = {
    id: number;
    title: string;
    description: string;
    tags: string[];
    github: string;
    url: string;
    paper: string;
    images: string[];
};

export default function ProjectView({ project }: { project: ProjectType }) {
    return (
        <div className="min-h-screen max-h-full pt-[120px] pb-[100px] flex flex-col justify-center items-center">
            <div className="absolute top-[120px] left-0 mx-5">
                <div className="text-[20px] xs:text-[18px] sm:text-[18px] font-semibold">
                    <Link href={"/skills-projects"} className="flex flex-row items-center">
                        <FaArrowLeft /> <span className="ml-2">Back</span>
                    </Link>
                </div>
            </div>

            <div className="">
                <div className="flex flex-row p-10 xs:p-7 mt-10 dark:bg-carddark bg-cardlight rounded-lg w-[80vw] xs:w-[90vw] flex-wrap">
                    <section
                        className={`flex flex-col mb-5 ${project.images ? "w-[50%]" : "w-[100%]"
                            } sm:w-full xs:w-full`}
                    >
                        <div>
                            <div className="text-[40px] xs:text-[30px] sm:text-[35px] mb-5">
                                {project.title}
                            </div>
                            {Array.isArray(project.tags) &&
                                project.tags.map((tag: string, index: number) => (
                                    <div key={index} className="mb-5 inline-flex">
                                        <span
                                            data-aos="zoom-in"
                                            data-aos-delay={(index + 1) * 400}
                                            className="p-2 mr-5 text-[15px] xs:text-[12px] xs:mr-3 dark:bg-zinc-700 bg-zinc-300 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    </div>
                                ))}
                            <div>
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
                                            Github <GithubIcon />
                                        </a>
                                    )}
                                    {project.paper && (
                                        <a
                                            href={project.paper}
                                            target="blank"
                                            className="text-[25px] flex flex-row items-center gap-1 font-semibold item"
                                        >
                                            <span className="text-[18px]">Research</span>{" "}
                                            <GoArrowUpRight />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                        <p
                            className="w-[95%] xs:w-full sm:w-full"
                            data-aos="zoom-in-right"
                            data-aos-delay={(project.tags.length + 1) * 400}
                        >
                            {project.description}
                        </p>
                    </section>
                    {project.images && (
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                            spaceBetween={50}
                            slidesPerView={1}
                            rewind
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            pagination={{ clickable: true }}
                            className="w-[45%] h-auto sm:h-[300px] xs:h-[350px] sm:w-full xs:w-full"
                        >
                            {Array.isArray(project.images) &&
                                project.images.map((image: string, index: number) => (
                                    <SwiperSlide key={index}>
                                        <div className="h-full flex flex-col items-center justify-center">
                                            <Image
                                                src={`/${image}`}
                                                alt="Image"
                                                width={400}
                                                height={400}
                                                className="rounded-lg"
                                                priority
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    )}
                </div>
            </div>
        </div>
    );
}