import projectsData from "@/app/data/projects.json";
import { redirect } from "next/navigation";
import ProjectView from "@/app/components/ProjectView";

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

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const foundProject = projectsData.projects.find(
    (project) => project.id == Number(id)
  ) as ProjectType | undefined;

  if (!foundProject) {
    redirect("/skills-projects");
  }

  return <ProjectView project={foundProject} />;
}