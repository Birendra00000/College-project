import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaCircleUser } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
const Navbar = () => {
  const [hoverSearch, setHoverSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="flex justify-center w-full shadow-lg">
      <div
        className="flex w-full md:w-[80%] lg:w-[80%] items-center justify-between p-5"
        onMouseLeave={() => setHoverSearch(false)}
      >
        <span className="font-black text text-2xl">
          YAT<span className="text-[#F5B963]">RA</span>
        </span>
        <div className=" items-center gap-6 flex">
          <div className=" items-center gap-6 hidden  md:flex lg:flex">
            <>
              {" "}
              <p>HOME</p>
              <p>PACKAGES</p>
              <p>ABOUT US</p>
              <p>CONTACT</p>
            </>
          </div>
          <span className="flex items-center gap-6 relative">
            <CiSearch
              size={25}
              onMouseEnter={() => setHoverSearch(true)}
              className="cursor-pointer"
            />
            {hoverSearch && (
              <input
                type="text"
                className="absolute border right-[90px] p-[6px] w-[390px] rounded-md outline-none"
                placeholder="Search"
              />
            )}
            <span className="w-[35px] h-[35px] rounded-full border border-black flex justify-center items-center">
              {" "}
              <FaCircleUser size={25} />
            </span>
          </span>
          <div className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <RxHamburgerMenu size={25} />
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className=" absolute top-0 left-0 z-10 bg-[#00000044] h-full w-full">
          <div className="md:hidden bg-black text-white shadow-md w-[70%] h-full">
            <div className="flex flex-col items-center py-4 space-y-4 ">
              <p onClick={() => setMenuOpen(false)}>HOME</p>
              <p onClick={() => setMenuOpen(false)}>PACKAGES</p>
              <p onClick={() => setMenuOpen(false)}>ABOUT US</p>
              <p onClick={() => setMenuOpen(false)}>CONTACT</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
