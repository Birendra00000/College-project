import { FaStar, FaStarHalfAlt, FaRegHeart, FaHeart } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useBookmark } from "../../AuthContext/BookmarkContext";
import BaseUrl from "../../AxiosInstance/BaseUrl";
import { Link, useNavigate } from "react-router-dom";

const Packages = () => {
  const navigate = useNavigate();
  const { setBookmarkAllProduct } = useBookmark();
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const [filters, setFilters] = useState({ best_season: "", pradesh: "" });

  const fetchDestinations = async () => {
    const { data } = await BaseUrl.get("api/destinations");
    return data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["destination"],
    queryFn: fetchDestinations,
  });

  if (isLoading)
    return <p className="text-center text-gray-600">Loading packages...</p>;
  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  const handleView = (id) => {
    navigate(`/packages/${id}`);
  };

  const handleAddToBookmark = (id) => {
    const product = data.find((pkg) => pkg.id === id);

    setBookmarkAllProduct((prevBookmark) => {
      const isAlreadyAdded = prevBookmark.some((item) => item.id === id);
      if (isAlreadyAdded) {
        setBookmarkedItems((prev) => prev.filter((itemId) => itemId !== id));
        return prevBookmark.filter((item) => item.id !== id);
      } else {
        setBookmarkedItems((prev) => [...prev, id]);
        return [...prevBookmark, product];
      }
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredData = data.filter((item) => {
    const matchesSeason =
      !filters.best_season || item.best_season === filters.best_season;
    const matchesPradesh = !filters.pradesh || item.pradesh === filters.pradesh;
    return matchesSeason && matchesPradesh;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
          Travel Packages
        </h1>
        {/* Filters */}
        <div className="flex gap-10 mb-6">
          <div>
            <label className="block text-gray-700 font-medium">
              Best Season:
            </label>
            <select
              name="best_season"
              value={filters.best_season}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            >
              <option value="">All Seasons</option>
              <option value="Winter">Winter</option>
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
              <option value="Autumn">Autumn</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Pradesh:</label>
            <select
              name="pradesh"
              value={filters.pradesh}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            >
              <option value="">All Pradesh</option>
              <option value="Lumbini">Lumbini</option>
              <option value="Gandaki">Gandaki</option>
              <option value="Bagmati">Bagmati</option>
              <option value="Province 1">Province 1</option>
              {/* Add other provinces as needed */}
            </select>
          </div>
        </div>
        {/* Package List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative">
                <img
                  src={item?.images}
                  alt="destination"
                  className="w-full h-40 object-cover"
                />
                <button
                  onClick={() => handleAddToBookmark(item.id)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow text-teal-500 hover:text-teal-600 transition-colors"
                >
                  {bookmarkedItems.includes(item.id) ? (
                    <FaHeart size={20} className="text-red-500" />
                  ) : (
                    <FaRegHeart size={20} />
                  )}
                </button>
              </div>
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

                <div className="flex items-center gap-2 mt-3 text-yellow-500">
                  <span className="flex items-center gap-1">
                    <FaStar /> <FaStar /> <FaStarHalfAlt />
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <button
                    className="bg-teal-500 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-600 transition-all duration-300"
                    onClick={() => handleView(item.id)}
                  >
                    View
                  </button>

                  <Link
                    to="/user/book"
                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-all duration-300"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredData.length === 0 && (
          <p className="text-center text-gray-600">No packages found.</p>
        )}
      </div>
    </div>
  );
};

export default Packages;
