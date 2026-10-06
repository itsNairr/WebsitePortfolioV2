import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send me a message!",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <section>
      <Navbar />
      {children}
    </section>
  );
}
