import React from "react";
import { useLocation } from "react-router-dom";
import { FaFacebook, FaWhatsapp, FaTwitter, FaYoutube } from "react-icons/fa";
import { CgMail } from "react-icons/cg";

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div
      style={{
        backgroundColor: isHomePage ? "black" : "white",
        color: isHomePage ? "white" : "black",
      }}
      className="w-full flex justify-center"
    >
      <div className="w-full md:w-[85%] lg:w-[70%] px-4">
        {/* Separator line */}
        <span className="w-full h-[2px] bg-[#346769] flex"></span>

        {/* Footer content */}
        <div className="p-6 md:p-11 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="font-black text-2xl">
            YAT<span className="text-[#F5B963]">RA</span>
          </span>

          <p className="text-center text-sm md:text-base">
            Copyright © 2024 YATRA
          </p>

          <span className="flex gap-3">
            <FaFacebook size={25} />
            <FaTwitter size={25} />
            <FaWhatsapp size={25} />
            <CgMail size={25} />
            <FaYoutube size={25} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
