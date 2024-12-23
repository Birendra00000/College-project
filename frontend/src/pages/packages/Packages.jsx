import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useBookmarks } from "../../AuthContext/BookmarkContext";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const { userBookmarks, toggleBookmark } = useBookmarks();

  useEffect(() => {
    const fetchPackages = async () => {
      const data = [
        {
          id: 1,
          destination: "Pokhara, Nepal",
          price: "$299",
          description:
            "Explore the serene beauty of Pokhara with its lakes, mountains, and adventure activities.",
          image: "/assests/illam.png",
        },
        {
          id: 2,
          destination: "Kathmandu, Nepal",
          price: "$199",
          description:
            "Discover the rich cultural heritage of Kathmandu, with its temples, palaces, and bustling streets.",
          image: "https://example.com/kathmandu.jpg",
        },
        {
          id: 3,
          destination: "Chitwan National Park, Nepal",
          price: "$249",
          description:
            "Experience the wilderness of Nepal's most famous national park, with safaris and wildlife tours.",
          image: "https://example.com/chitwan.jpg",
        },
      ];
      setPackages(data);
    };

    fetchPackages();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Travel Packages
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages
            .filter((pkg) => !userBookmarks.includes(pkg.id)) // Filter out bookmarked packages
            .map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={pkg.image}
                  alt={pkg.destination}
                  className="h-48 w-full object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {pkg.destination}
                    </h2>
                    <button
                      onClick={() => toggleBookmark(pkg.id)}
                      className="text-teal-500 text-2xl"
                    >
                      {userBookmarks.includes(pkg.id) ? (
                        <FaHeart />
                      ) : (
                        <FaRegHeart />
                      )}
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {pkg.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-teal-600">
                      {pkg.price}
                    </span>
                    <button className="bg-teal-500 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-600">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Packages;
