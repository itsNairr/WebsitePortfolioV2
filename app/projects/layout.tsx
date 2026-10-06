import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Projects",
  description: "Software, AI and robotics projects by Hari Nair.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <section>
      <Navbar />
      {children}
    </section>
  );
}
