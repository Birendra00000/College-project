import React from "react";
import { useLocation } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
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
      <div className="w-[70%]">
        <span className="w-full h-[2px] bg-[#346769] flex"></span>{" "}
        <div className="p-11 flex justify-between">
          <span className="font-black text text-2xl">
            YAT<span className="text-[#F5B963]">RA</span>
          </span>
          <p>Copyright clamed© 2024 YATRA</p>
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
