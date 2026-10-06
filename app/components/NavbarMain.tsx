"use client";

import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import NavShell, { navItem } from "./NavShell";

const socials = [
  { href: "https://www.linkedin.com/in/harinairr", label: "LinkedIn", icon: <FaLinkedinIn /> },
  { href: "https://github.com/itsNairr", label: "GitHub", icon: <FaGithub /> },
  { href: "https://www.instagram.com/harinairr/", label: "Instagram", icon: <FaInstagram /> },
];

// Home page navbar: social links and the theme toggle (the page itself lists the sections).
function NavbarMain() {
  return (
    <NavShell
      right={socials.map((social) => (
        <a key={social.href} href={social.href} target="blank" aria-label={social.label} className={navItem}>
          {social.icon}
        </a>
      ))}
    />
  );
}

export default NavbarMain;
