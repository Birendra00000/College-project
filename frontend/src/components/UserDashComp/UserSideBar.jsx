import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaCar } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { TbReport } from "react-icons/tb";
import { LuLogOut } from "react-icons/lu";
import { FiMenu } from "react-icons/fi"; // Hamburger icon

const UserSideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      {/* Hamburger Icon (visible only on small screens) */}
      <div className="md:hidden flex items-center justify-between p-4 h-[100px]">
        <FiMenu className="text-black" size={24} onClick={toggleSidebar} />
      </div>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 w-[200px] md:w-[280px] bg-black h-full z-50 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:w-[280px] md:h-full md:block`}
      >
        <div className="p-4 w-11/12 flex items-center flex-col gap-y-4">
          <img
            src="/assests/Logo.png"
            alt="Logo"
            className="w-[130px] h-[60px]"
          />
          <div className="w-full flex justify-center flex-col items-center border-gray-500 border-b pb-5">
            <Link
              to="/user/profile"
              className="text-white flex items-center gap-x-1 p-2 hover:bg-red-600 rounded-md w-full"
            >
              <LuLayoutDashboard />
              <p>Profile</p>
            </Link>
            <Link
              to="/user/bookmark"
              className="text-white flex items-center gap-x-1 p-2 hover:bg-red-600 rounded-md w-full"
            >
              <FaCar />
              <p>Bookmarks</p>
            </Link>
            <span className="text-white flex items-center gap-x-1 p-2 hover:bg-red-600 rounded-md w-full">
              <FaRegBell />
              <p>Activities</p>
            </span>
            <span className="text-white flex items-center gap-x-1 p-2 hover:bg-red-600 rounded-md w-full">
              <IoSettingsOutline />
              <p>Account</p>
            </span>
          </div>
          <div className="w-full flex justify-center flex-col items-center ">
            <span className="text-gray-400 mb-2 w-full">Report</span>
            <span className="text-white flex items-center gap-x-1 p-2 hover:bg-red-600 rounded-md w-full ">
              <MdOutlinePayment />
              <p>Payment Details</p>
            </span>
            <span className="text-white flex items-center gap-x-1 p-2 hover:bg-red-600 rounded-md w-full">
              <AiOutlineTransaction />
              <p>Transactions</p>
            </span>
            <span className="text-white flex items-center gap-x-1 p-2 hover:bg-red-600 rounded-md w-full">
              <TbReport />
              <p>Travel Reports</p>
            </span>
          </div>
          <div className="w-full mt-4">
            <span className="text-white flex items-center gap-x-1 p-2 bg-gray-600 hover:bg-red-600 rounded-md w-full">
              <LuLogOut />
              <p>Logout</p>
            </span>
          </div>
        </div>
      </div>

      {/* Overlay for Sidebar on mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
        onClick={toggleSidebar}
      ></div>
    </div>
  );
};

export default UserSideBar;
