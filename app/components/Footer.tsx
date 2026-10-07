import { FaEnvelope, FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <div className="relative z-10 flex flex-col items-center dark:text-white p-10 gap-10">
        <div id="items" className="flex flex-row flex-wrap gap-10 sm:gap-7 xs:gap-6 text-[30px] sm:text-[24px] xs:text-[22px]">
          <a
            className="item"
            href="https://www.linkedin.com/in/harinairr"
            target="blank"
          >
            <FaLinkedinIn />
          </a>
          <a className="item" href="https://github.com/itsNairr" target="blank">
            <FaGithub />
          </a>
          <a className="item" href="https://www.instagram.com/harinairr/" target="blank">
            <FaInstagram />
          </a>
          <a className="item" href="mailto:hariknair139@gmail.com" aria-label="Email">
            <FaEnvelope />
          </a>
        </div>
        <div className="text-center">
          &copy; {year} Harikrishna Nair{" "}
        </div>
      </div>
    </>
  );
}

export default Footer;
