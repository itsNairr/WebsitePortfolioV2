"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NavShell from "./NavShell";

const links = [
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// Navbar for the inner pages: page links on desktop, hamburger dropdown on mobile.
function Navbar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <NavShell
      right={links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={isActive(link.href) ? "page" : undefined}
          className="item text-[25px] sm:hidden xs:hidden"
        >
          {link.label}
        </Link>
      ))}
      menu={(close, open) => (
        // Same font, size and weight as the home page's section links, fading in one after another.
        <ul id="items" className="flex flex-col sm:text-[60px] xs:text-[50px] font-light">
          {links.map((link, index) => (
            <li
              key={link.href}
              className={`item transition duration-500 ease-out ${
                open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
              style={{ transitionDelay: open ? `${80 + index * 60}ms` : "0ms" }}
            >
              <Link
                href={link.href}
                onClick={close}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    />
  );
}

export default Navbar;
