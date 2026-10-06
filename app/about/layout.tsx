import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "About",
  description: "Education, skills and community work of Hari Nair, Mechatronics & Robotics Engineering student at Queen's University.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <section>
      <Navbar />
      {children}
    </section>
  );
}
