import React from "react";
import Image from "next/image";
import LearnMore from "../components/LearnMore";

function page(prop: any) {
  return (
    <div className="min-h-screen max-h-full pt-[120px] pb-[100px] w-full">
      <div className="flex flex-col items-center justify-center">
        <div
          className="pb-[70px] sm:pb-[70px] xs:pb-[60px] xs:w-[300px] xs:h-[250px] sm:w-[350px] sm:h-[300px]"
          data-aos="zoom-in"
        >
          <Image
            alt=""
            src="/hari.jpg"
            width={500}
            height={500}
            className="rounded-[10%] pfp"
          />
        </div>
        <h1 className="text-[40px] font-bold mb-10">About Me</h1>
        <div className="flex flex-row justify-evenly w-screen flex-wrap">
          <div className="flex flex-col w-[40%] text-lg xs:w-full xs:text-base mb-5 xs:p-5" data-aos="fade-right">
            <h1 className="text-[40px] font-bold xs:text-[30px] sm:text-[35px] mb-5">Education</h1>
            <h2 className="font-bold" >Queen's University</h2>
            <h3>BASc Mechatronics & Robotics Engineering</h3>
            <h3 className="mb-5">Graduation Year: 2026</h3>
            <h2 className="font-semibold" >Relevent Coursework</h2>
            <h3 className="mb-5">Data Structures and Algorithms, Computer Architecture, Digital Systems, Mechatronics Design, Linear Algebra, Signals and Systems, Introduction to Robotics, Numerical Methods, Computer Networks</h3>
            <h2 className="font-semibold" >Clubs and Societies</h2>
            <h3><span className="underline">Co-founder:</span> Queen's University Malayalee Association</h3>
          </div>
          <div className="w-[2px] bg-white sm:hidden xs:hidden"></div>
          <div className="flex flex-col w-[40%] text-lg xs:w-full xs:p-5 xs:text-base" data-aos="fade-left">
          <h1 className="text-[40px] font-bold xs:text-[30px] sm:text-[35px] mb-5">Internships & Employment</h1>
          <p>As of May 2025, I am working at <strong> Scotiabank: Global Banking and Markets</strong> as a Trade Floor Technology Consultant for the next 16 months as part of my Professional Placement (QUIP).</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
