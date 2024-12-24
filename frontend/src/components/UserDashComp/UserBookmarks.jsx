import { useEffect } from "react";
import { useBookmark } from "../../AuthContext/BookmarkContext";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import "@mantine/carousel/styles.css";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import UserDashBoard from "../../pages/UserDashBoard/UserDashBoard";
import UserSideBar from "./UserSideBar";

const UserBookmarks = () => {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/packages/${id}`);
  };
  const { bookmarkAllProduct } = useBookmark();
  console.log("bookmarkAllProduct", bookmarkAllProduct);

  useEffect(() => {
    console.log("Updated bookmarkAllProduct:", bookmarkAllProduct);
  }, [bookmarkAllProduct]);

  return (
    <>
      {" "}
      <div className="flex w-full h-[100vh]">
        <div className="flex w-full">
          {" "}
          <UserSideBar />
          {bookmarkAllProduct && bookmarkAllProduct.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8  p-20">
              {bookmarkAllProduct.map((item) => (
                <div
                  key={item.destination_name}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 h-[355px]"
                >
                  <img
                    src={item?.images}
                    alt="destination"
                    className="w-full h-40 object-cover"
                  />
                  <div className="px-3 py-2">
                    <p className="text-gray-500 text-sm">{item.location}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-lg font-bold text-gray-800">
                        {item.destination_name}
                      </p>
                      <p className="text-gray-700">
                        ${item.price} <sup>pp</sup>
                      </p>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">
                      {item.desciption}
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-yellow-500">
                      <span className="flex items-center gap-1">
                        <FaStar /> <FaStar /> <FaStarHalfAlt />
                      </span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <Button
                        variant="filled"
                        onClick={() => handleView(item.id)}
                      >
                        View
                      </Button>
                      <Button variant="filled" color="red">
                        Book Now{" "}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg mt-10">
              No bookmarked packages yet.
            </p>
          )}
        </div>{" "}
      </div>
    </>
  );
};

export default UserBookmarks;
