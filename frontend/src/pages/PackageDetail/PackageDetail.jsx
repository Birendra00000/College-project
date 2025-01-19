import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BaseUrl from "../../AxiosInstance/BaseUrl";

const PackageDetail = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinationDetails = async () => {
      try {
        const { data } = await BaseUrl.get(`/api/destinations/${id}/`);
        setDestination(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchDestinationDetails();
  }, [id]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          {destination.destination_name}
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Images */}
          <div>
            <img
              src={destination.images}
              alt={destination.destination_name}
              className="rounded-lg shadow-lg mb-4 w-full h-60 object-cover"
            />
            <div className="grid grid-cols-2 gap-4">
              <img
                src={destination.images_1}
                alt={`${destination.destination_name} Image 1`}
                className="rounded-lg shadow-lg h-40 object-cover"
              />
              <img
                src={destination.images_2}
                alt={`${destination.destination_name} Image 2`}
                className="rounded-lg shadow-lg h-40 object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div>
            <p className="text-gray-700 mb-4">{destination.description}</p>
            <p className="text-lg font-bold text-gray-900 mb-2">
              Price: NPR {destination.price} PP
            </p>
            <p className="text-gray-600 mb-2">
              Location: {destination.location}
            </p>
            <p className="text-gray-600 mb-2">
              Best Season: {destination.best_season}
            </p>
            <p className="text-gray-600 mb-2">
              Province: {destination.pradesh}
            </p>
            <p className="text-gray-600 mb-2">Review: {destination.review}</p>
            <div className="mt-6">                        <Link to="/user/book">
            
              <button className="bg-teal-500 text-white px-6 py-2 rounded-lg shadow hover:bg-teal-600 transition duration-300">
                Book Now
              </button></Link>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Map</h2>
          <img
            src={destination.map_image}
            alt={`${destination.destination_name} Map`}
            className="rounded-lg shadow-lg w-[500px] h-[300px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;
