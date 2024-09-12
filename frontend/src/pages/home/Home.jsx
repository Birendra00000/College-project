import React from "react";
import Button from "../../components/resuable/Button";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { IoCalendarOutline } from "react-icons/io5";
import { HiMiniUsers } from "react-icons/hi2";
import { cardData } from "../../../Data/data";

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
      <div className=" flex h-[500px] relative">
        <div className="bg-custom-gradient w-[50%] h-full flex justify-end items-center">
          <div className="flex flex-col gap-5 w-[70%]">
            <span className="text-4xl font-bold text-white">
              EXPLORE THE WORLD WITH NEW{" "}
              <span className="text-[#F5B963]">ADVENTURE</span>
            </span>
            <span className=" text-white">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </span>
            <span>
              <Button
                title={"Explore destination"}
                varient="bg-red-500 text-white p-2 rounded-full"
              />{" "}
            </span>
          </div>
        </div>
        <div className="bg-custom-url w-[50%] h-full" />
      </div>

      {/* //FOR SEARCING PLACES AND CHECK IN AND CHECK OUT */}

      <div className="w-full flex justify-center h-[100px] absolute -bottom-2 ">
        <div className="w-[70%]  flex items-center justify-center bg-white shadow-2xl rounded-md">
          <div className="w-[80%] flex gap-4 items-center ">
            <span>
              <input
                type="search"
                placeholder="visit new places"
                className="border border-black p-2 bg-[#EAEAEA] outline-none border-none text-sm"
              />
            </span>
            <span className="flex p-1 bg-[#EAEAEA] w-[150px]  gap-x-2 items-center justify-center h-[40px] text-gray-700 text-sm rounded-md">
              <span className="flex  gap-x-2 items-center">
                <IoCalendarOutline />
                <button>Check In</button>
              </span>
              {/* <Calendar onChange={onChange} value={value} /> */}
            </span>
            <span className="flex p-2 bg-[#EAEAEA] w-[150px] h-[40px] text-gray-700 text-sm rounded-md gap-x-2 items-center justify-center cursor-pointer">
              <span className="flex  gap-x-2 items-center">
                <IoCalendarOutline />
                <button>Check Out</button>
              </span>
            </span>
            <span
              className="flex p-2 bg-[#EAEAEA] w-[150px] h-[40px] text-gray-700 text-sm rounded-md gap-x-2 items-center justify-center cursor-pointer relative"
              onClick={toggleSelectVisibility}
            >
              <span className="flex  gap-x-2 items-center">
                <HiMiniUsers /> <button>{selectedOption}</button>
              </span>
            </span>{" "}
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
            <span></span>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center mt-20 mb-10">
        <div className="w-[70%]">
          <span className="flex flex-col">
            <p className="font-bold text-2xl">EXPLORE DESTINATIONS </p>
            <span className=" h-[2px] bg-[#F5B963] w-[11%]" />
          </span>
          <span className="flex justify-between mt-6">
            <p>
              {" "}
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500
            </p>
            <p className=" hover:border-b-2 hover:border-red-600 text-red-600 transition ease-in-out duration-700 cursor-pointer">
              View all destinations
            </p>
          </span>

          <div>
            {cardData &&
              cardData?.map((item) => {
                return (
                  <div>
                    <img src={item?.image} alt="card" />{" "}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
