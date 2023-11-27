"use client"

import React, {useRef, useEffect, useState} from "react";
import { IoSunny } from "react-icons/io5";  
import { BsMoonStarsFill } from "react-icons/bs"
import Link from "next/link";
import { toggleTheme } from "../redux/features/themeSlice"; 
import { useDispatch, useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import "./navbar.css"
function Navbar() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);
  const [tog, setToggle] = useState(false);
  const checkBoxRef = useRef(null);

  useEffect(() => {
    if (checkBoxRef.current) {
      checkBoxRef.current.checked = tog;
    }
  }, [tog]);

  const handleToggle = () => {
    setToggle(!tog);
  };

  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.themeReducer.isDark);
  return (
    <main className="fixed w-full z-50 dark:bg-dark/[.5] bg-light/[.5] duration-500">
      <div className="dark:text-white px-10 py-7">
        <div className="flex flex-row text-[30px] gap-10 justify-between items-center">
          <Link href={"/"} className="font-bold" data-aos="zoom-in" >Hari Nair</Link>
          <div id="items" className="flex flex-row gap-10">
            <div className="text-[25px] item sm:hidden xs:hidden" data-aos="zoom-in">Experience</div>
            <div className="text-[25px] item sm:hidden xs:hidden" data-aos="zoom-in">Projects</div>
            <div className="text-[25px] item sm:hidden xs:hidden" data-aos="zoom-in">About</div>
            <div className="text-[25px] item sm:hidden xs:hidden" data-aos="zoom-in">Contact</div>
            <div className="hidden xs:contents sm:contents item" >
            <input
              ref={checkBoxRef}
              id="checkbox"
              type="checkbox"
              onClick={handleToggle}
              className="hidden xs:block"
            />
            <label className="toggle" htmlFor="checkbox">
              <div id="bar1" className="bars" />
              <div id="bar2" className="bars" />
              <div id="bar3" className="bars" />
            </label>
          </div>
            <button data-aos="zoom-in"  className="item" onClick={() => dispatch(toggleTheme())}>{isDark && <BsMoonStarsFill />}{!isDark && <IoSunny/>}</button>
          </div>
        </div>
        {tog && (
          <div className="hidden xs:contents sm:contents">
          <div className="flex flex-col gap-10 items-end text-[20px] mt-10">
            <Link onClick={handleToggle} href={"/experience"} data-aos="zoom-in">Experience</Link>
            <Link onClick={handleToggle} href={"/projects"} data-aos="zoom-in">Projects</Link>
            <Link onClick={handleToggle} href={"/about"} data-aos="zoom-in">About</Link>
            <Link onClick={handleToggle} href={"/contact"} data-aos="zoom-in">Contact</Link>
          </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Navbar;
