"use client";

import Lottie from "react-lottie";
import Link from "next/link";
import animationDataLight from "../app/lotties/scroll-down-light.json";
import animationDataDark from "../app/lotties/scroll-down-dark.json";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import NavbarMain from "./components/NavbarMain";

export default function Home() {
  const isDark = useSelector((state: any) => state.themeReducer.isDark);
  const [greeting, setGreeting] = useState("Hello,");
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });
    AOS.refresh();
    const date = new Date();
    const hour = date.getHours();
    if (hour >= 0 && hour < 12) {
      setGreeting("Good Morning,");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Hey!");
    } else {
      setGreeting("Good Evening,");
    }
  }, []);

  useEffect(() => {
    function sleep(ms: number | undefined) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const titles = [
      "mechatronics engineering student",
      "software developer",
      "machine learning enthusiast",
      "tech nerd :)",
    ];
    const element = document.getElementById("typewriter");

    let sleepTime = 100;

    let curPhraseIndex = 0;

    const writeLoop = async () => {
      try {
        const element = document.getElementById("typewriter");
        await sleep(500);
        while (true) {
          let curWord = titles[curPhraseIndex];

          for (let i = 0; i < curWord.length; i++) {
            if (element) {
              element.innerText = curWord.substring(0, i + 1);
            }
            await sleep(sleepTime);
          }

          await sleep(sleepTime * 20);

          for (let i = curWord.length; i > 0; i--) {
            if (element) {
              element.innerText = curWord.substring(0, i - 1);
            }
            await sleep(sleepTime);
          }

          await sleep(sleepTime * 5);

          if (curPhraseIndex === titles.length - 1) {
            curPhraseIndex = 0;
          } else {
            curPhraseIndex++;
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    writeLoop();
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: isDark ? animationDataLight : animationDataDark,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  function handleScroll() {
    const element = document.getElementById("navscreen");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      <NavbarMain />
      <main className="min-h-screen max-h-full pt-10">
        <section className="min-h-screen text-[50px] sm:text-[40px] xs:text-[30px] flex items-center">
          <div className="flex flex-col items-center w-full">
            <div>
              <div className="text-center font-medium pb-[50px] px-5 z-10">
                {greeting} I'm <span className="font-bold">Hari Nair</span>
                <br />I am a <span id="typewriter"></span>
                <span id="cursor">|</span>
              </div>
            </div>
            <div onClick={handleScroll} className="absolute bottom-[5%]">
              <Lottie
                options={defaultOptions}
                height={50}
                width={50}
                isClickToPauseDisabled={true} // Disable click to pause
              />
            </div>
          </div>
        </section>

        <section className="min-h-screen flex items-center" id="navscreen">
          <div
            className="block ml-[10%] text-[75px] sm:text-[60px] xs:text-[50px] font-light"
            id="items"
          >
            <div data-aos="fade-right" className="item">
            <Link href={"/experience"}>Experience</Link>
            </div>
            <div data-aos="fade-right" className="item">
              <Link href={"/skills-projects"}>Skills & Projects</Link>
            </div>
            <div data-aos="fade-right" className="item">
              <Link href={"/about"}>About</Link>
            </div>
            <div data-aos="fade-right" className="item">
              <Link href={"/contact"}>Contact</Link>
            </div>
          </div>
        </section>
      </main>
      <div className="container">
        <div className="gradient"></div>
      </div>
    </>
  );
}
