import React from "react";
import { IoMdNotifications } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
const AdminNavbar = () => {
  return (
    <div className="flex justify-center items-center pt-8">
      <div className="w-[85%] flex justify-end gap-x-6 items-center">
        <span>
          <IoMdNotifications size={28} />
        </span>
        <div className="relative">
          <input
            type="search"
            placeholder="search"
            className="px-2 py-1 outline-none border-gray-200  border rounded-md"
          />
          <span className="absolute right-2 top-[6px]">
            <CiSearch size={24} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
