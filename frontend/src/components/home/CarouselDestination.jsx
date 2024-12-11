import React from "react";
import BaseUrl from "../../AxiosInstance/BaseUrl";
import { useQuery } from "@tanstack/react-query";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Carousel } from "@mantine/carousel";
import { Box, Image, Text, Badge } from "@mantine/core";
import "@mantine/carousel/styles.css";

const CarouselDestination = () => {
  const fetchDestinations = async () => {
    const { data } = await BaseUrl.get("/api/destinations");
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
          slideGap="md"
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
                {console.log("data", item)}{" "}
                <Carousel.Slide key={item.id}>
                  {" "}
                  <div
                    key={item.destination_name}
                    className="bg-[#2B3030] text-white rounded-md"
                  >
                    <img
                      src={item?.images}
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
                </Carousel.Slide>
              </>
            ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselDestination;
