import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavLinkElement from "./NavLinkElement";

const Navbar = () => {
  return (
    <nav
      style={
        {
          // backdropFilter: "blur(10px)",
          // WebkitBackdropFilter: "blur(10px)"
        }
      }
      className="py-3 px-3 md:px-9 fixed top-0 left-0 right-0 flex justify-center items-center z-50 bg-[rgba(255,255,255,0.035)]"
    >
      <span
        aria-hidden="true"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(177,155,55,0.25) 12%, rgba(227,201,109,0.85) 50%, rgba(177,155,55,0.25) 88%, transparent 100%)" }}
        className="absolute top-0 left-0 right-0 h-[1px]"
      />
      <span
        aria-hidden="true"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(177,155,55,0.25) 12%, rgba(227,201,109,0.85) 50%, rgba(177,155,55,0.25) 88%, transparent 100%)" }}
        className="absolute bottom-0 left-0 right-0 h-[1px]"
      />
      {/* <Link href={"/"}>
                <Image
                    src={"/logo.png"}
                    width={50}
                    height={50}
                    alt="CS Academy Logo"
                />
            </Link> */}

      <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm md:text-base">
        <NavLinkElement href="/" title="Home"></NavLinkElement>
        <NavLinkElement href="/courses" title="Courses"></NavLinkElement>
        <NavLinkElement href="/artificial-intelligence" title="Artificial Intelligence"></NavLinkElement>
        <NavLinkElement href="/research" title="Research"></NavLinkElement>
        <NavLinkElement href="/trips-and-events" title="Trips and Events"></NavLinkElement>
        {/* <NavLinkElement href="/projects" title="projects"></NavLinkElement> */}
        <NavLinkElement href="/gallery" title="Gallery"></NavLinkElement>
        <NavLinkElement href="/faq" title="FAQ"></NavLinkElement>

        {/* TODO: Replace with nav button */}
        <NavLinkElement 
          target="_blank"
          href="https://docs.google.com/document/d/1qrq504NNbUvJ0f42lQehynbf83H611cQjeTQmuMBv2o/edit#bookmark=id.29fj8xypyizl" 
          title="Apply" last>  
        </NavLinkElement>
      </ul>
    </nav>
  );
};

export default Navbar;
