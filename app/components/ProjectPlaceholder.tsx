import { FaCode, FaRobot } from "react-icons/fa";
import type { Project } from "../data/projects";

// Placeholder colours for projects without screenshots (same palette as the home page tiles).
const placeholderTiles = [
  "from-sky-400 to-blue-600",
  "from-violet-500 to-purple-700",
  "from-emerald-400 to-teal-600",
  "from-fuchsia-500 to-pink-600",
  "from-amber-400 to-orange-600",
];

const hardwareTags = ["Arduino", "ROS2", "SOLIDWORKS"];

// Colourful stand-in shown where a project has no images yet.
export default function ProjectPlaceholder({ project, className = "" }: { project: Project; className?: string }) {
  const isHardware = project.tags.some((tag) => hardwareTags.includes(tag));
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br text-white ${
        placeholderTiles[project.id % placeholderTiles.length]
      } ${className}`}
    >
      {isHardware ? <FaRobot /> : <FaCode />}
    </div>
  );
}
