import React from "react";
import Button from "../resuable/Button";
const HomeFooter = () => {
  return (
    <div className="flex w-full justify-center bg-black pb-10">
      <div className="w-[70%]">
        <div className="w-full grid grid-cols-5 py-16">
          <div className="col-span-2 text-white flex">
            <span className="w-1/2">
              <p className="text-[#C5FBD8] font-semibold mb-4">About Us</p>
              <span className="text-sm">
                <p>Out story</p>
                <p>Why us</p>
                <p>How it works</p>
                <p>FAQ</p>
              </span>
            </span>
            <span className="w-1/2">
              <p className="text-[#C5FBD8] font-semibold mb-4">
                Our destinations
              </p>
              <span className="text-sm">
                <p>Mustang</p>
                <p>Manang</p>
                <p>Illam</p>
              </span>
            </span>
          </div>
          <div className="col-span-2 text-white flex">
            {" "}
            <span className="w-1/2">
              <p className="text-[#C5FBD8] font-semibold mb-4">Get Inspired</p>
              <span className="text-sm">
                <p>Explore nature</p>
                <p>Hiking trails</p>
                <p>Swimming</p>
                <p>Fishing</p>
                <p>Boating</p>
                <p>Cycling</p>
                <br />
                <p>Rest, relax and re-set</p>
                <p>Spa treatments</p>
                <p>Hot tubs</p>
                <p>Nature trails</p>
              </span>
            </span>
            <span className="w-1/2">
              <span className="text-sm">
                <br />
                <p className=" mt-4">Great food and luxury</p>
                <p>Pubs</p>
                <p>Restaurant</p>
                <p>Food markets</p>
                <p>Picnic</p>
                <br />
                <br />
                <p>For you and yours</p>
                <p>Solo or a couple</p>
                <p>Pet friendly</p>
                <p>luxury rooms</p>
              </span>
            </span>
          </div>
          <div className="col-span-1 text-white">
            {" "}
            <span className="w-1/2">
              <p className="text-[#C5FBD8] font-semibold mb-4">Support</p>
              <span className="text-sm">
                <p>Help</p>
                <p>Contact us</p>
                <p>Privacy policy</p>
                <p>Terms of services</p>
                <p>Complaints policy</p>
              </span>
            </span>
          </div>
        </div>
        <div>
          <p className="text-[#C5FBD8] font-semibold mb-4">
            Signup to our Yatra
          </p>
          <div className="flex gap-20">
            <p className="text-white text-sm">
              It has roots in a piece of classical Latin literature <br />
              from 45 BC, making it over 2000 years old.
            </p>
            <span className="flex gap-6">
              <input
                type="search"
                placeholder="bibekbhusal200@gmail.com"
                className="p-2 rounded-md outline-none h-10 text-sm"
              />{" "}
              <Button
                title="Join us for more info "
                varient="bg-red-700 text-white p-2 rounded-md h-10 text-sm"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFooter;
