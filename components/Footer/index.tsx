import React from "react";
import Image from "next/image";
import SocialMediaIcon from "./SocialMediaIcon";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="w-full h-[70px] shrink-0 justify-between md:p-10 p-3 bg-[#0f0f0f] flex items-center space-x-3">
           <div className="flex items-center gap-5">
                <Image
                    src="/logo.png"
                    width={50}
                    height={50}
                    alt="Logo"
                />
                <p
                    className="text-[rgba(255,255,255,.35)]"
                >
                    Est. 2024 SBHS
                </p>
           </div>
           <div>
                <SocialMediaIcon 
                    altText={"Instagram"} 
                    href={"https://www.instagram.com/sbhs_cs_academy/"}
                >
                    <FaInstagram size={35} className="text-[rgba(255,255,255,.35)] hover:text-white transition-all duration-200" />
                </SocialMediaIcon>
           </div>
        </footer>
    )
}

export default Footer; 