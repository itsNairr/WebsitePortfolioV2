import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./redux/reduxProvider";

const raleway = Raleway({ subsets: ["latin"], weight: ["300", "500", "400", "700", "800", "600"], variable: "--font-raleway" });

export const metadata: Metadata = {
  title: "Hari Nair's Portfolio",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${raleway.variable} font-sans`}>
      <body>
        <ReduxProvider>
        {children}
      </ReduxProvider>
        </body>
    </html>
  );
}
