import React, { useState } from "react";
import BaseUrl from "../../AxiosInstance/BaseUrl";
import { useQuery } from "@tanstack/react-query";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
const CarouselDestination = () => {
  const fetchDestinations = async () => {
    const { data } = await BaseUrl.get("/api/destinations");
    console.log("data", data);
    return data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["destination"],
    queryFn: fetchDestinations,
  });
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex w-full justify-center  md:mt-20 mb-10 ">
      <div className="w-[90%] md:w-[70%]">
        <span className="flex flex-col">
          <p className="font-bold text-xl md:text-2xl">EXPLORE DESTINATIONS</p>
          <span className="h-[2px] bg-[#F5B963] w-[15%]" />
        </span>
        <span className="flex justify-between mt-10 md:mt-6">
          <p className="text-[12px] md:text-base">
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500
          </p>
          <p className="hover:border-b-2 hover:border-red-600 text-red-600 transition ease-in-out duration-700 cursor-pointer text-[12px] md:text-base">
            View all destinations
          </p>
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {data &&
            data?.map((item) => {
              return (
                <div
                  key={item.destination_name}
                  className="bg-[#2B3030] text-white rounded-md"
                >
                  <img
                    src={item?.url}
                    alt="card"
                    className="w-full h-40 object-cover"
                  />
                  <span className="p-5 flex flex-col">
                    <p className="text-sm">{item.location}</p>
                    <span className="flex items-center mt-2 justify-between">
                      <p className="text-lg font-bold">
                        {item.destination_name}
                      </p>
                      <p>
                        {item.price} <sup>pp</sup>
                      </p>
                    </span>
                    <span className="mt-2 text-sm">
                      <p>{item.desciption}</p>
                    </span>
                    <span className="flex items-center gap-2 mt-2">
                      <span className="flex items-center ">
                        ratings:
                        {item.rating}
                        <FaStar /> <FaStar /> <FaStarHalfAlt />
                      </span>{" "}
                      <p className="mb-0">{item.reviews}</p>
                    </span>
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CarouselDestination;
