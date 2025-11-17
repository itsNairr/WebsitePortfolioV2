"use client";
import TimelineComponent from "../components/TimelineComponent";

function page(prop: any) {
  return (
    <div className="min-h-screen max-h-full pt-[120px] pb-[100px] w-full">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-[40px] font-bold mb-5 xs:text-[30px]">Technical Experience</h1>
          <TimelineComponent />
      </div>
    </div>
  );
}

export default page;
