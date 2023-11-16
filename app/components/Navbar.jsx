"use client"

import React, { useState } from "react";
import { FaLinkedinIn, FaGithub, FaEnvelope } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";  
import { BsMoonStarsFill } from "react-icons/bs"
import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "../Providers";

function Navbar() {
  const { isDark, setIsDark } = useContext(ThemeContext);
  return (
    <main className="fixed w-full z-50 bg-dark/[.5]">
      <div className="text-white p-10">
        <div className="flex flex-row text-[30px] gap-10 justify-between items-center">
          <Link href={"/"} className="font-bold">Hari Nair</Link>
          <div id="items" className="flex flex-row gap-10">
            <a className="item" href="https://www.linkedin.com/in/hari-nair-0a1627251/" target="blank"><FaLinkedinIn /></a>
            <a className="item" href="https://github.com/itsNairr" target="blank"><FaGithub /></a>
            <a className="item" href="mailto:hariknair139@gmail.com"><FaEnvelope /></a>
            <button className="item" onClick={() => setIsDark((prev)=> !prev)}>{isDark && <BsMoonStarsFill />}{!isDark && <IoSunny/>}</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Navbar;
