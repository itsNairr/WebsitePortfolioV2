import React from "react";
import { FaLinkedinIn, FaGithub, FaEnvelope } from "react-icons/fa";
import Link from "next/link";

function Navbar() {
  return (
    <main className="fixed w-full z-50 bg-dark/[.5]">
      <div className="text-white p-10">
        <div className="flex flex-row text-[30px] gap-10 justify-between items-center">
          <Link href={"/"} className="font-bold">Hari Nair</Link>
          <div id="items" className="flex flex-row gap-10">
            <a className="item" href="https://www.linkedin.com/in/hari-nair-0a1627251/" target="blank"><FaLinkedinIn /></a>
            <a className="item" href="https://github.com/itsNairr" target="blank"><FaGithub /></a>
            <a className="item" href="mailto:hariknair139@gmail.com"><FaEnvelope /></a>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Navbar;
