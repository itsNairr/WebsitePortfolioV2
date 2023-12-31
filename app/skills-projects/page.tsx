"use client";
import Project from "../components/Project";
import React from "react";
import "./skills-projects.css";
import {
  SiTailwindcss,
  SiReact,
  SiNextdotjs,
  SiTensorflow,
  SiRedux,
  SiJavascript,
  SiTypescript,
  SiCplusplus,
  SiPython,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiPandas,
  SiNumpy,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiBun,
} from "react-icons/si";

function page(prop: any) {
  const handleOnMouseMove = (e: any) => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect(),
    x = e.clientX - rect.left,
    y = e.clientY - rect.top; 
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }
  
  React.useEffect(() => {
    for (const card of document.querySelectorAll(".card") as any) {
      card.onmousemove = (e: any) => handleOnMouseMove(e);
    }
  }, []);
  return (
    <div className="min-h-screen max-h-full pt-[120px] pb-[100px] w-full">
      <div className="flex flex-col items-center">
        <h1 className="text-[40px] font-bold mb-5">Projects</h1>
          <div className="mx-5 mb-10 flex flex-row flex-wrap justify-around gap-10" id="cards">
            <Project />
          </div>
        <h1 className="text-[40px] font-bold">Skills</h1>
        <h1 className="text-[30px] mb-5">Languages</h1>
        <div className="flex flex-row flex-wrap text-[60px] sm:text-[50px] xs:text-[40px] gap-[50px] justify-evenly w-[90%]">
          <SiJavascript data-aos="zoom-in" className="iconshadow" />{" "}
          <SiTypescript data-aos="zoom-in" className="iconshadow" />{" "}
          <SiCplusplus data-aos="zoom-in" className="iconshadow" />{" "}
          <SiPython data-aos="zoom-in" className="iconshadow" />{" "}
          <SiHtml5 data-aos="zoom-in" className="iconshadow" />{" "}
          <SiCss3 data-aos="zoom-in" className="iconshadow" />
        </div>
        <h1 className="text-[30px] my-5">Frameworks & Libraries</h1>
        <div className="flex flex-row flex-wrap text-[60px] sm:text-[50px] xs:text-[40px] gap-[50px] justify-evenly w-[90%]">
          <SiNextdotjs data-aos="zoom-in" className="iconshadow" />{" "}
          <SiReact data-aos="zoom-in" className="iconshadow" />{" "}
          <SiTailwindcss data-aos="zoom-in" className="iconshadow" />{" "}
          <SiTensorflow data-aos="zoom-in" className="iconshadow" />{" "}
          <SiRedux data-aos="zoom-in" className="iconshadow" />{" "}
          <SiNodedotjs data-aos="zoom-in" className="iconshadow" />
          <SiBun data-aos="zoom-in" className="iconshadow" />
          <SiPandas data-aos="zoom-in" className="iconshadow" />
          <SiNumpy data-aos="zoom-in" className="iconshadow" />
        </div>
        <h1 className="text-[30px] my-5">Databases</h1>
        <div className="flex flex-row flex-wrap text-[60px] sm:text-[50px] xs:text-[40px] gap-[50px] justify-evenly w-[90%]">
          {" "}
          <SiMongodb data-aos="zoom-in" className="iconshadow" />
          <SiPostgresql data-aos="zoom-in" className="iconshadow" />
          <SiFirebase data-aos="zoom-in" className="iconshadow" />
        </div>
      </div>
    </div>
  );
}

export default page;
