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
            src="/harinobg.png"
            width={450}
            height={450}
            className="rounded-[10%] pfp"
          />
        </div>
        <h1 className="text-[40px] font-bold mb-5">About Me</h1>
        <p className="text-lg mx-[10vw] text-center" data-aos="zoom-in">
          Currently in my second year of <b>Mechatronics and Robotics Engineering</b> at <b>Queen's University</b>, 
          I am a student from Barrie, Ontario,
          driven by a passion for robotics, software development, and artificial
          intelligence. My academic and personal endeavors are focused on the
          practical application of these disciplines to create solutions for
          real-world challenges. I am dedicated to staying at the forefront of
          technological innovation and constantly expand my knowledge within the
          field. Outside of my academic interests, I engage with the financial
          world through stock trading as a hobby and explore my creative side by
          playing guitar. As I continue to develop my expertise, I am actively
          seeking a 4-month internship in the summer of 2024, where I can
          contribute to and learn from a dynamic team. I am eager to apply my
          skills in a practical setting and make meaningful contributions to the
          field of engineering.
        </p>
      </div>
    </div>
  );
}

export default page;
