import GalaxyBackground from "../components/GalaxyBackground";
import TimelineComponent from "../components/TimelineComponent";

function page() {
  return (
    <>
      <GalaxyBackground subtle />
      <div className="relative z-10 min-h-screen max-h-full pt-[120px] pb-[100px] w-full">
        <header className="flex flex-col items-center text-center px-5 mb-12 xs:mb-8">
          <h1 className="text-[40px] xs:text-[30px] font-bold">Technical Experience</h1>
        </header>
        <TimelineComponent />
      </div>
    </>
  );
}

export default page;
