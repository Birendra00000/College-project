import React from "react";
import AdminSideBar from "../../components/AdminDashComp/AdminSideBar";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import AdminNavbar from "../../components/AdminDashComp/AdminNavbar";
import CreateDestinationModal from "../../components/AdminDashComp/CreateDestinationModal";

const AdminDestination = () => {
  return (
    <div className="flex w-full h-[100vh]">
      <div className="flex w-full">
        <AdminSideBar />
        <div className="w-full flex flex-col">
          <AdminNavbar />
          <div className="w-full flex flex-col  items-center mt-[5%]">
            <div className="flex flex-col w-[90%] h-[60vh] ">
              <div className="flex ">
                <span className="w-[50%] text-lg text-center">
                  DESTINATIONS
                </span>
                <span className="w-[30%]  text-lg text-center">LOCATIONS</span>
                <span className="w-[20%]  text-lg text-center">ACTIONS</span>
              </div>
              <div className="flex ">
                <span className="w-[5%] flex justify-center items-center ">
                  <span className="text-red-500 flex w-2 bg-red-500 h-2 rounded-full"></span>
                </span>
                <span className="w-[50%] ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. D
                </span>
                <span className="w-[25%]">Lorem ipsum dolor sit amet c o</span>
                <span className="w-[20%] flex justify-around">
                  <MdDelete size={28} className="text-red-400" />
                  <FaRegEdit size={28} className="text-gray-500" />
                </span>
              </div>
            </div>{" "}
            <CreateDestinationModal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDestination;
