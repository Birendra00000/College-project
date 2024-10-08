import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";

const Contact = () => {
  return (
    <>
      <div className="bg-black w-full h-[400px] flex justify-center text-center">
        <div className="flex flex-col gap-5 mt-5 px-4 lg:px-0">
          <p className="text-white text-2xl lg:text-4xl font-bold">
            Get in touch with us
          </p>
          <span className="flex text-center flex-col">
            <p className="text-white text-sm lg:text-base">
              Lorem ipsum dolor sit amet Omnis
            </p>
            <p className="text-white text-sm lg:text-base">
              Molestiae nemo dolores, maxime blanditiis sed rem cumque?
            </p>
          </span>
          <div className=" mt-10 w-full ">
            <div className="flex gap-5 w-full  justify-center">
              <span className="w-[250px] h-[180px] bg-[#F8F8F8] flex flex-col items-center justify-center gap-5 rounded-sm">
                <MdOutlineEmail size={30} />
                <p>bibekbhusal200@gmail.com</p>
              </span>
              <span className="w-[250px] h-[180px] bg-[#F8F8F8] flex flex-col items-center justify-center gap-5 rounded-sm">
                <IoCallOutline size={30} />
                <p>+977 9852635151</p>
              </span>
              <span className="w-[250px] h-[180px] bg-[#F8F8F8] flex flex-col items-center justify-center gap-5 rounded-sm ">
                <CiLocationOn size={30} />
                <p>Kathmandu, Nepal</p>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-full lg:w-[60%] grid grid-cols-1 lg:grid-cols-2 my-[5%] gap-6 px-4 lg:px-0">
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
            </span>
            <span className="flex flex-col gap-2">
              <label className="text-sm">SUBJECT</label>
              <input
                type="text"
                placeholder="Can I get 7 days free trial?"
                className="p-2 outline-none bg-slate-50"
              />
            </span>
          </div>
          <div className="col-span-1 grid grid-rows-4">
            <span className="flex flex-col gap-2 row-span-3">
              <label className="text-sm">MESSAGE</label>
              <textarea
                placeholder="Enter your message"
                className="p-2 outline-none bg-slate-50 h-full resize-none"
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

      <div className="w-full flex justify-center">
        <div className="w-full lg:w-[60%] flex justify-center flex-col px-4 lg:px-0">
          <span className="flex text-center flex-col w-full gap-6">
            <p className="text-black text-2xl lg:text-4xl font-bold mb-[2%]">
              Our leadership team
            </p>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur, recusandae!
            </p>
            <p className="text-gray-600">
              Lorem ipsum dolor, sit amet consectetur adipisicing.
            </p>
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 my-[8%]">
            <div>
              <span className="bg-gray-100 w-[250px] h-[200px] flex justify-center items-end">
                <img
                  src="/assests/demo5.jpg"
                  alt=""
                  className="w-10/12 h-[95%] "
                />
              </span>
              <p>Harry Dc</p>
              <p className="flex items-center text-gray-500 text-sm gap-1">
                <MdOutlineEmail />
                harry345@gmail.com
              </p>
            </div>
            <div>
              <span className="bg-gray-100 w-[250px] h-[200px] flex justify-center items-end">
                <img
                  src="/assests/demo5.jpg"
                  alt=""
                  className="w-10/12 h-[95%] "
                />
              </span>
              <p>Harry Dc</p>
              <p className="flex items-center text-gray-500 text-sm gap-1">
                <MdOutlineEmail />
                harry345@gmail.com
              </p>
            </div>
            <div>
              <span className="bg-gray-100 w-[250px] h-[200px] flex justify-center items-end">
                <img
                  src="/assests/demo5.jpg"
                  alt=""
                  className="w-10/12 h-[95%] "
                />
              </span>
              <p>Harry Dc</p>
              <p className="flex items-center text-gray-500 text-sm gap-1">
                <MdOutlineEmail />
                harry345@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
