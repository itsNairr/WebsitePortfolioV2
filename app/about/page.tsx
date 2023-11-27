import React from "react";
import Image from "next/image";

function page(prop: any) {
  return (
    <div className="min-h-screen max-h-full pt-[120px] w-full">
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
        <h1 className="text-2xl font-bold">About Me</h1>
        <p className="text-lg">I am a </p>
      </div>
    </div>
  );
}

export default page;
