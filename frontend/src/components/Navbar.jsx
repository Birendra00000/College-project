import React, { useRef, useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FaCircleUser } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [hoverSearch, setHoverSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const refCurrent = useRef(null);
  // console.log(refCurrent.current);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (refCurrent.current && !refCurrent.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="flex justify-center w-full shadow-lg">
      <div
        className="flex w-full md:w-[80%] lg:w-[80%] items-center justify-between p-4"
        onMouseLeave={() => setHoverSearch(false)}
      >
        <span className="font-black text text-2xl">
          YAT<span className="text-[#F5B963]">RA</span>
        </span>
        <div className=" items-center gap-6 flex">
          <div className=" items-center gap-6 hidden  md:flex lg:flex">
            <>
              {" "}
              <Link to="/">HOME</Link>
              <Link to="/packages">PACKAGES</Link>
              <Link to="/aboutUs">ABOUT US</Link>
              <Link to="/contactus">CONTACT</Link>
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
            <Link to="/login">
              <span className="w-[35px] h-[35px] rounded-full border border-black flex justify-center items-center">
                {" "}
                <FaCircleUser size={25} />
              </span>
            </Link>
          </span>
          <div className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <RxHamburgerMenu size={25} />
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className=" absolute top-0 left-0 z-10 bg-[#00000044] h-full w-full">
          <div
            className="md:hidden bg-black text-white shadow-md w-[70%] h-full"
            ref={refCurrent}
          >
            <span
              className="p-2 flex justify-end cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              {" "}
              <RxCross1 size={25} />
            </span>
            <div className="flex flex-col items-center py-4 space-y-4 ">
              <p>HOME</p>
              <p>PACKAGES</p>
              <p>ABOUT US</p>
              <Link to="/contactus">CONTACT</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
