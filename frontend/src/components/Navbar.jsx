import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaCircleUser } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
const Navbar = () => {
  return (
    <div className="flex justify-center w-full shadow-lg">
      <div className="flex w-[80%] items-center justify-between p-5">
        <span className="font-black text text-2xl">
          YAT<span className="text-[#F5B963]">RA</span>
        </span>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-6 ">
            <p>HOME</p>
            <p>PACKAGES</p>
            <p>ABOUT US</p>
            <p>CONTACT</p>
          </div>
          <span className="flex items-center gap-6">
            <CiSearch size={25} />
            <span className="w-[35px] h-[35px] rounded-full border border-black flex justify-center items-center">
              {" "}
              <FaCircleUser size={25} />
            </span>
          </span>
          <div className="  md:hidden">
            <RxHamburgerMenu size={25} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
