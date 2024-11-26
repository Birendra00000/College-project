import React from "react";
import Button from "../../components/resuable/Button";
import { useState } from "react";

import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import FAQ from "../../components/home/FAQ";
import HomeFooter from "../../components/home/HomeFooter";
import HomeSearchPlaces from "../../components/home/HomeSearchPlaces";
import CarouselDestination from "../../components/home/CarouselDestination";

const Home = () => {
  const [value, onChange] = useState(new Date());

  return (
    <>
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row h-[500px] md:h-[500px] relative">
        <div className="bg-custom-gradient w-full lg:w-[50%] h-full flex justify-center lg:justify-end items-center p-5 md:p-8">
          <div className="flex flex-col gap-5 w-[96%] lg:w-[70%]">
            <span className="text-xl md:text-4xl font-bold text-white">
              EXPLORE THE WORLD WITH NEW{" "}
              <span className="text-[#F5B963]">ADVENTURE</span>
            </span>
            <span className=" text-white text-sm md:text-base">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </span>
            <span>
              <Button
                title={"Explore destination"}
                varient="bg-red-500 text-white p-2 md:p-3 rounded-full"
              />
            </span>
          </div>
        </div>
        <div className="bg-custom-url w-full lg:w-[50%] h-full bg-cover bg-center" />
      </div>

      {/* Search Section */}
      <HomeSearchPlaces />

      {/* Explore Destinations */}
      <CarouselDestination />

      {/* Testimonial Section */}
      <div className="bg-custom-url-woman h-[400px] md:h-[660px] w-full mb-5 bg-cover bg-center flex justify-center items-center">
        <div className="w-[90%] md:w-1/2 flex flex-col items-center">
          <p className="text-white text-2xl md:text-3xl font-bold text-center">
            A truly wonderful experience
          </p>
          <div className="text-sm text-white mt-5 text-center">
            <p className="mb-5">
              Brilliant for anyone looking to get away from the hustle and
              bustle of city life or detox from their tech for a few days. I
              could have stayed another week!
            </p>
            <p>
              They really have thought about everything here down to the finest
              details.
            </p>
          </div>
          <p className="flex text-white gap-2 text-sm mt-10">
            <img src="/assests/framestar.png" alt="" />
            05, Jun 2024
          </p>
        </div>
      </div>

      <FAQ />
      <HomeFooter />
    </>
  );
};

export default Home;
