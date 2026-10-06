import type { Metadata, Viewport } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./redux/reduxProvider";

const raleway = Raleway({ subsets: ["latin"], weight: ["300", "500", "400", "700", "800", "600"], variable: "--font-raleway" });

export const viewport: Viewport = {
  themeColor: "#141414",
};

export const metadata: Metadata = {
  title: "Hari Nair's Portfolio",
  description: "Built in Next.js with TypeScript, Tailwind CSS, and Redux Toolkit.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <html lang="en" className={`${raleway.variable} font-sans`} suppressHydrationWarning>
      <head>
        {/* Matches themeSlice: dark unless the visitor chose light (localStorage isDark === "false") */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("isDark")!=="false")document.documentElement.classList.add("dark")}catch(e){document.documentElement.classList.add("dark")}`,
          }}
        />
      </head>
      <body>
        <ReduxProvider>
        {children}
      </ReduxProvider>
        </body>
    </html>
}
