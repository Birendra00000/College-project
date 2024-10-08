import React from "react";
import Button from "../../components/resuable/Button";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { IoCalendarOutline } from "react-icons/io5";
import { HiMiniUsers } from "react-icons/hi2";
import { cardData } from "../../../Data/data";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import FAQ from "../../components/home/FAQ";
import HomeFooter from "../../components/home/HomeFooter";

const Home = () => {
  const [value, onChange] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState("Travellers");
  const [closeSelect, setCloseSelect] = useState(true);
  const options = ["Travellers", "Tourists", "Guests"];

  const toggleSelectVisibility = () => {
    setCloseSelect((prev) => !prev);
  };

  const handleClickSelect = (option) => {
    setSelectedOption(option);
    setCloseSelect(true);
  };

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
      <div className="w-full flex justify-center h-auto md:h-[100px] md:absolute bottom-0 md:-bottom-2 p-2">
        <div className="w-full lg:w-[70%] flex flex-row md:flex-row items-center justify-center bg-white shadow-2xl rounded-md p-4 gap-4">
          <div className="w-full flex flex-col md:flex-row gap-4 items-center ">
            <input
              type="search"
              placeholder="Visit new places"
              className="border p-2 w-full md:w-auto bg-[#EAEAEA] outline-none text-sm"
            />
            <span className="flex p-1 bg-[#EAEAEA] w-full md:w-[150px] gap-x-2 items-center justify-center h-[40px] text-gray-700 text-sm rounded-md">
              <IoCalendarOutline />
              <button>Check In</button>
            </span>
            <span className="flex p-1 bg-[#EAEAEA] w-full md:w-[150px] h-[40px] text-gray-700 text-sm rounded-md gap-x-2 items-center justify-center">
              <IoCalendarOutline />
              <button>Check Out</button>
            </span>
            <span
              className="flex p-1 bg-[#EAEAEA] w-full md:w-[150px] h-[40px] text-gray-700 text-sm rounded-md gap-x-2 items-center justify-center cursor-pointer relative"
              onClick={toggleSelectVisibility}
            >
              <HiMiniUsers /> <button>{selectedOption}</button>
            </span>
            {!closeSelect && (
              <div className="absolute top-full mt-3  bg-white border border-gray-300 rounded shadow-lg w-[300px] right-[15%]">
                {options.map((option) => (
                  <div
                    key={option}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleClickSelect(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Explore Destinations */}
      <div className="flex w-full justify-center  md:mt-20 mb-10 ">
        <div className="w-[90%] md:w-[70%]">
          <span className="flex flex-col">
            <p className="font-bold text-xl md:text-2xl">
              EXPLORE DESTINATIONS
            </p>
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
            {cardData &&
              cardData?.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="bg-[#2B3030] text-white rounded-md"
                  >
                    <img
                      src={item?.image}
                      alt="card"
                      className="w-full h-40 object-cover"
                    />
                    <span className="p-5 flex flex-col">
                      <p className="text-sm">{item.location}</p>
                      <span className="flex items-center mt-2 justify-between">
                        <p className="text-lg font-bold">{item.title}</p>
                        <p>
                          Rs 15k <sup>pp</sup>
                        </p>
                      </span>
                      <span className="mt-2 text-sm">
                        <p>{item.desciption}</p>
                      </span>
                      <span className="flex items-center gap-2 mt-2">
                        <span className="flex items-center ">
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
