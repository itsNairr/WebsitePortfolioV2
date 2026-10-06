import projectsData from "./projects.json";

export type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  url?: string;
  github?: string;
  paper?: string;
  images?: string[];
  featured?: boolean;
};

// Display order used everywhere: the project marked `"featured": true` first,
// then newest (highest id) first.
export const orderedProjects: Project[] = [...(projectsData.projects as Project[])].sort(
  (a, b) => Number(!!b.featured) - Number(!!a.featured) || b.id - a.id
);
