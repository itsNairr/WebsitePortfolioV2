"use client";

import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn, FaGithub, FaEnvelope } from "react-icons/fa";

function LearnMore(props: any) {
  return (
    <div className="flex flex-col items-center justify-center">
    <h1 className="text-2xl font-bold mt-20">Learn More!</h1>
    <div id="items" className="flex flex-row gap-10 m-10 text-[30px]">
        <a className="item" href="https://www.linkedin.com/in/hari-nair-0a1627251/" target="blank"><FaLinkedinIn /></a>
        <a className="item" href="https://github.com/itsNairr" target="blank"><FaGithub /></a>
        <a className="item" href="https://www.instagram.com/harinairr/" target="blank"><FaInstagram /></a>
        <a className="item" href="mailto:hariknair139@gmail.com"><FaEnvelope /></a>
    </div>
  </div>
  );
}

export default LearnMore;
