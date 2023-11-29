"use client";

import { TbFileCv } from "react-icons/tb";
import { FaLinkedinIn, FaGithub, FaEnvelope } from "react-icons/fa";

import React from "react";
function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <div className="flex flex-col items-center dark:text-white p-10 gap-10 dark:bg-black bg-light">
        <div id="items" className="flex flex-row gap-10 text-[30px]">
          <a
            className="item"
            href="https://www.linkedin.com/in/hari-nair-0a1627251/"
            target="blank"
          >
            <FaLinkedinIn />
          </a>
          <a className="item" href="https://github.com/itsNairr" target="blank">
            <FaGithub />
          </a>
          <a className="item" href="mailto:hariknair139@gmail.com">
            <TbFileCv />
          </a>
        </div>
        <div className="text-centerduration-500">
          &copy; {year} Harikrishna Nair{" "}
        </div>
      </div>
    </>
  );
}

export default Footer;
