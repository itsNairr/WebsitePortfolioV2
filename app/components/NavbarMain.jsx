"use client"

import React from "react";
import { TbFileCv } from "react-icons/tb";
import { FaLinkedinIn, FaGithub, FaEnvelope } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";  
import { BsMoonStarsFill } from "react-icons/bs"
import Link from "next/link";
import { toggleTheme } from "../redux/features/themeSlice"; 
import { useDispatch, useSelector } from "react-redux";
function NavbarMain() {

  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.themeReducer.isDark);
  return (
    <main className="fixed w-full z-50 duration-500">
      <div className="dark:text-white px-10 py-7">
        <div className="flex flex-row text-[30px] gap-10 justify-between items-center">
          <Link href={"/"} className="font-bold xs:hidden" data-aos="zoom-in">Hari Nair</Link>
          <Link href={"/"} className="font-bold hidden xs:contents" data-aos="zoom-in">HN</Link>
          <div id="items" className="flex flex-row gap-10">
            <a className="item" data-aos="zoom-in" href="https://www.linkedin.com/in/hari-nair-0a1627251/" target="blank"><FaLinkedinIn /></a>
            <a className="item" data-aos="zoom-in" href="https://github.com/itsNairr" target="blank"><FaGithub /></a>
            <a className="item" data-aos="zoom-in" href="mailto:hariknair139@gmail.com"><TbFileCv /></a>
            <button className="item" data-aos="zoom-in" onClick={() => dispatch(toggleTheme())}>{isDark && <BsMoonStarsFill />}{!isDark && <IoSunny/>}</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default NavbarMain;
