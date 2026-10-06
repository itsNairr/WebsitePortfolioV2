import type { Metadata } from "next";
import { redirect } from "next/navigation";
import ProjectView from "@/app/components/ProjectView";
import { orderedProjects } from "@/app/data/projects";

type Params = { params: Promise<{ id: string }> };

// Prebuild every project page at build time (unknown ids still render on demand and redirect).
export function generateStaticParams() {
  return orderedProjects.map((project) => ({ id: String(project.id) }));
}

// Each project gets its own title and description in search results and link previews.
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const project = orderedProjects.find((p) => p.id === Number(id));
  if (!project) return {};
  return {
    title: project.title,
    description: project.description.length > 160 ? `${project.description.slice(0, 157)}...` : project.description,
  };
}

export default async function Page({ params }: Params) {
  const { id } = await params;

  // Previous/next follow the same order as the Projects page.
  const index = orderedProjects.findIndex((project) => project.id === Number(id));
  if (index === -1) {
    redirect("/projects");
  }

  return (
    <ProjectView
      project={orderedProjects[index]}
      previous={orderedProjects[index - 1]}
      next={orderedProjects[index + 1]}
    />
  );
}
