import GalaxyBackground from "../components/GalaxyBackground";
import ProjectCard from "../components/ProjectCard";
import { orderedProjects } from "../data/projects";

function page() {
  return (
    <>
      <GalaxyBackground subtle />
      <div className="relative z-10 min-h-screen max-h-full pt-[120px] pb-[100px] w-full px-5">
        <header className="flex flex-col items-center text-center mb-12 xs:mb-8">
          <h1 className="text-[40px] xs:text-[30px] font-bold">Projects</h1>
        </header>
        <div className="grid grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-8 xs:gap-6 max-w-[1200px] mx-auto">
          {orderedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} featured={!!project.featured} />
          ))}
        </div>
      </div>
    </>
  );
}

export default page;
