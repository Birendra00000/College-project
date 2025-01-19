import React from "react";
import BaseUrl from "../../AxiosInstance/BaseUrl";
import { useQuery } from "@tanstack/react-query";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Carousel } from "@mantine/carousel";
import { Box, Image, Text, Badge } from "@mantine/core";
import "@mantine/carousel/styles.css";
import { Button } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";

const CarouselDestination = () => {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/packages/${id}`);
  };

  const fetchDestinations = async () => {
    const { data } = await BaseUrl.get("api/destinations");
    return data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["destination"],
    queryFn: fetchDestinations,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex w-full justify-center md:mt-20 mb-10">
      <div className="w-[90%] md:w-[70%]">
        <span className="flex flex-col">
          <p className="font-bold text-xl md:text-2xl">EXPLORE DESTINATIONS</p>
          <span className="h-[2px] bg-[#F5B963] w-[15%]" />
        </span>
        <span className="flex justify-between mt-10 md:mt-6 mb-3">
          <p className="text-[12px] md:text-base">
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s.
          </p>
          <p className="hover:border-b-2 hover:border-red-600 text-red-600 transition ease-in-out duration-700 cursor-pointer text-[12px] md:text-base">
            View all destinations
          </p>
        </span>

        <Carousel
          slideSize="33.333%"
          slideGap="xl"
          align="start"
          loop
          withControls
          withIndicators
          dragFree
        >
          {data &&
            data.map((item) => (
              // <Carousel.Slide key={item.destination_name}>
              //   <Box
              //     sx={{
              //       backgroundColor: "#2B3030",
              //       borderRadius: "8px",
              //       overflow: "hidden",
              //       color: "white",
              //     }}
              //   >
              //     <Image
              //       src={item.images}
              //       alt={item.destination_name}
              //       height={160}
              //       fit="cover"
              //     />
              //     <Box p="md">
              //       <Text size="sm">{item.location}</Text>
              //       <Box mt="sm" display="flex" justifyContent="space-between">
              //         <Text weight={700} size="lg">
              //           {item.destination_name}
              //         </Text>
              //         <Text size="sm">
              //           {item.price} <sup>pp</sup>
              //         </Text>
              //       </Box>
              //       <Text mt="xs" size="sm" lineClamp={2}>
              //         {item.desciption}
              //       </Text>
              //       <Box mt="sm" display="flex" alignItems="center" gap="sm">
              //         <Text size="sm" mr="xs">
              //           Ratings: {item.rating}
              //         </Text>
              //         <FaStar color="#FFD700" />
              //         <FaStar color="#FFD700" />
              //         <FaStarHalfAlt color="#FFD700" />
              //         <Text size="xs" ml="sm">
              //           ({item.reviews} reviews)
              //         </Text>
              //       </Box>
              //     </Box>
              //   </Box>
              // </Carousel.Slide>
              <>
                {/* {console.log("data", item)}{" "} */}
                <Carousel.Slide key={item.id}>
                  {" "}
                  <div
                    key={item.destination_name}
                    className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
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
                        <Link to="/user/book">
                        <Button variant="filled" color="red">
                          Book Now{" "}
                        </Button></Link>
                      </div>
                    </div>
                  </div>
                </Carousel.Slide>
              </>
            ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselDestination;
