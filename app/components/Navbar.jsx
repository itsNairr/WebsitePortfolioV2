"use client"

import React from "react";
import { FaLinkedinIn, FaGithub, FaEnvelope } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";  
import { BsMoonStarsFill } from "react-icons/bs"
import Link from "next/link";
import { toggleTheme } from "../redux/features/themeSlice"; 
import { useDispatch, useSelector } from "react-redux";
function Navbar() {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.themeReducer.isDark);
  return (
    <main className="fixed w-full z-50 dark:bg-dark/[.5] bg-light/[.5] duration-500">
      <div className="dark:text-white px-10 py-7">
        <div className="flex flex-row text-[30px] gap-10 justify-between items-center">
          <Link href={"/"} className="font-bold">Hari Nair</Link>
          <div id="items" className="flex flex-row gap-10">
            <a className="item" href="https://www.linkedin.com/in/hari-nair-0a1627251/" target="blank"><FaLinkedinIn /></a>
            <a className="item" href="https://github.com/itsNairr" target="blank"><FaGithub /></a>
            <a className="item" href="mailto:hariknair139@gmail.com"><FaEnvelope /></a>
            <button className="item" onClick={() => dispatch(toggleTheme())}>{isDark && <BsMoonStarsFill />}{!isDark && <IoSunny/>}</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Navbar;
