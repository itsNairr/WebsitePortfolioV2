"use client";

import Image from "next/image";
import Lottie from "react-lottie";
import animationDataLight from "../app/lotties/scroll-down-light.json";
import animationDataDark from "../app/lotties/scroll-down-dark.json";
import { ThemeContext } from "./Providers";
import { useEffect, useState, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  const { isDark } = useContext(ThemeContext);
  const [greeting, setGreeting] = useState("Hey,");
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  useEffect(() => {
    function sleep(ms: number | undefined) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const titles = [
      "mechatronics engineer",
      "software developer",
      "machine learning enthusiast",
      "tech nerd :)",
    ];
    const element = document.getElementById("typewriter");

    let sleepTime = 100;

    let curPhraseIndex = 0;

    const writeLoop = async () => {
      try {
        await sleep(1000);
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

  useEffect(() => {
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

  return (
    <main className="min-h-screen max-h-full pt-10 dark:text-white dark:bg-dark">
      <section className="min-h-screen text-[50px] flex items-center">
        <div className="flex flex-col items-center w-full">
          <div className="pb-[80px]" data-aos="zoom-in">
            <Image
              alt=""
              src="/harinobg.png"
              width={450}
              height={450}
              className=" rounded-[10%] pfp"
            />
          </div>
          <div>
            <div className="text-center font-medium pb-[50px]">
              {greeting} I'm Hari Nair
              <br />I am a <span id="typewriter"></span>
              <span id="cursor">|</span>
            </div>
          </div>
          <div onClick={handleScroll}>
            <Lottie options={defaultOptions} height={50} width={50} />
          </div>
        </div>
      </section>
      <section className="min-h-screen flex items-center" id="navscreen">
        <div className="block ml-[200px] text-[75px] font-light" id="items">
          <div data-aos="fade-right" data-aos-duration="1000" className="item">Experience</div>
          <div data-aos="fade-right" data-aos-duration="1200" className="item">Projects</div>
          <div data-aos="fade-right" data-aos-duration="1400" className="item">About</div>
          <div data-aos="fade-right" data-aos-duration="1600" className="item">Contact</div>
        </div>
      </section>
    </main>
  );
}
