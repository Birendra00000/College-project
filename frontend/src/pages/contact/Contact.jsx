import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import Button from "../../components/resuable/Button";

const Contact = () => {
  return (
    <>
      <div className="bg-black w-full h-[400px] flex justify-center text-center ">
        <div className="flex flex-col gap-5 mt-5">
          <p className="text-white text-4xl font-bold">Get in touch with us</p>
          <span className="flex text-center flex-col">
            <p className="text-white ">Lorem ipsum dolor sit amet Omnis</p>
            <p className="text-white">
              molestiae nemo dolores, maxime blanditiis sed rem cumque?
            </p>
          </span>
          <div className="flex gap-10 mt-10">
            <span className="w-[250px] h-[180px] bg-[#F8F8F8] flex flex-col items-center justify-center gap-5 rounded-sm">
              <MdOutlineEmail size={30} />
              <p>bibekbhusal200@gmail.com</p>
            </span>
            <span className="w-[250px] h-[180px] bg-[#F8F8F8] flex flex-col items-center justify-center gap-5 rounded-sm">
              <IoCallOutline size={30} />
              <p>+977 9852635151</p>
            </span>{" "}
            <span className="w-[250px] h-[180px] bg-[#F8F8F8] flex flex-col items-center justify-center gap-5 rounded-sm">
              <CiLocationOn size={30} />
              <p>Kathmandu,Nepal</p>
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-[60%] grid grid-cols-2 my-[5%] gap-[10%]">
          <div className="col-span-1 grid grid-rows-3 gap-3">
            <span className="flex flex-col gap-2">
              <label className="text-sm">YOUR NAME</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="p-2 outline-none bg-slate-50"
              />
            </span>
            <span className="flex flex-col gap-2">
              <label className="text-sm">EMAIL ADDRESS</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 outline-none bg-slate-50"
              />
            </span>{" "}
            <span className="flex flex-col gap-2">
              <label className="text-sm">SUBJECT</label>
              <input
                type="text"
                placeholder="Can I get 7 days free trial? "
                className="p-2 outline-none bg-slate-50"
              />
            </span>
          </div>
          <div className="col-span-1 grid grid-rows-4">
            <span className="flex flex-col gap-2 row-span-3">
              <label className="text-sm">MESSAGE</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="p-2 outline-none bg-slate-50 h-full"
              />
            </span>
            <span className="flex justify-center items-end rounded-sm">
              <button className="bg-red-700 text-white w-full h-[80%]">
                Send Your Message Now
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
