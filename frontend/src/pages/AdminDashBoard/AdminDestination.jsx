import React, { useState, useEffect } from "react";
import AdminSideBar from "../../components/AdminDashComp/AdminSideBar";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import AdminNavbar from "../../components/AdminDashComp/AdminNavbar";
import BaseUrl from "../../AxiosInstance/BaseUrl";
import CreateDestinationModal from "../../components/AdminDashComp/CreateDestinationModal";
import EditDestination from "../../components/AdminDashComp/EditDestination";

const AdminDestination = () => {
  const [destinations, setDestinations] = useState([]);
  const [editDestination, setEditDestination] = useState(null); // For Edit Modal

  // Fetch destinations
  const fetchDestinations = async () => {
    try {
      const { data } = await BaseUrl.get("api/destinations");
      setDestinations(data);
    } catch (error) {
      alert("Error fetching destinations: " + error.message);
    }
  };

  // Call fetchDestinations on component mount
  useEffect(() => {
    fetchDestinations();
  }, []);

  const deleteDestination = async (id) => {
    try {
      await BaseUrl.delete(`/api/destinations/${id}/`);
      alert("Destination deleted successfully!");
      fetchDestinations(); // Refresh data after deletion
    } catch (error) {
      alert("Failed to delete destination: " + error.message);
    }
  };

  return (
    <div className="flex w-full h-[100vh]">
      <div className="flex w-full">
        <AdminSideBar />
        <div className="w-full flex flex-col">
          <AdminNavbar />
          <div className="w-full flex flex-col items-center mt-12 px-4 sm:px-6 lg:px-8 absolute top-[60px] left-0 md:static">
            <div className="flex flex-col w-full lg:w-[90%] h-[400px] overflow-auto shadow-md">
              <div className="flex w-full mb-4">
                <span className="w-1/2 text-sm md:text-lg text-center">
                  DESTINATIONS
                </span>
                <span className="w-1/3 text-sm md:text-lg text-center">
                  LOCATIONS
                </span>
                <span className="w-1/6 text-sm md:text-lg text-center">
                  ACTIONS
                </span>
              </div>
              {destinations.map((destination) => (
                <div
                  className="flex w-full justify-between mb-2 items-center"
                  key={destination.id}
                >
                  <span className="w-1/2 text-center">
                    {destination.destination_name}
                  </span>
                  <span className="w-1/3 text-center">
                    {destination.destination_name}
                  </span>
                  <span className="w-1/6 text-center flex justify-center space-x-5">
                    <FaRegEdit
                      size={20}
                      className="text-blue-400 cursor-pointer"
                      onClick={() => setEditDestination(destination)}
                    />
                    <MdDelete
                      size={28}
                      className="text-red-400 cursor-pointer"
                      onClick={() => deleteDestination(destination.id)}
                    />
                  </span>
                </div>
              ))}
            </div>
            {/* Conditional Rendering of Modals */}
            {editDestination && (
              <EditDestination
                destination={editDestination}
                setEditDestination={setEditDestination}
                fetchDestinations={fetchDestinations}
              />
            )}
            <CreateDestinationModal fetchDestinations={fetchDestinations} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDestination;
