import React from "react";
import Button from "../resuable/Button";
const From = ({ titletype }) => {
  const formheight = titletype === "login" ? "90vh" : "100vh";

  return (
    <div className={`w-full flex justify-center ${formheight} items-center`}>
      <div className={`w-[40%] bg-black text-white  p-14 rounded-md m-6`}>
        <span className="flex justify-center flex-col items-center ">
          <p className="mb-4">
            {titletype === "login" ? (
              <span className="font-black text text-2xl">
                Login In{" "}
                <span className="font-black text text-2xl">
                  YAT<span className="text-[#F5B963]">RA</span>
                </span>
              </span>
            ) : (
              <span className="font-black text text-2xl">
                Signup{" "}
                <span className="font-black text text-2xl">
                  YAT<span className="text-[#F5B963]">RA</span>
                </span>
              </span>
            )}
          </p>
          <p>
            Aorem ipsum dolor sit amet consectetur. Sollicitudin neque fringilla
            aliquam mauris elit. Leo vel
          </p>
        </span>
        <form action="" className="py-4 ">
          <span className="relative">
            <>
              <p className="text-base font-medium">
                Name <span className="text-red-400">*</span>
              </p>
              <input
                type="text"
                className="input-box1 relative p-2 bg-black border border-slate-400 outline-none mt-2 rounded-md w-10/12"
                required
              />
              <span className="placeholder1 absolute text-white w-[140px] left-4 top-[60px] transition-all duration-300">
                Enter your name
              </span>
            </>
            <>
              <p className="text-base font-medium mt-6">
                Email Address <span className="text-red-400">*</span>
              </p>
              <input
                type="email"
                className="input-box2 relative p-2 bg-black border border-slate-400 outline-none mt-2 rounded-md w-10/12"
                required
              />
              <span className="placeholder2 absolute text-white w-[140px] left-4 top-[158px] transition-all duration-300">
                Enter your email
              </span>
            </>
            {titletype === "login" ? (
              ""
            ) : (
              <>
                <p className="text-base font-medium mt-6">
                  Password <span className="text-red-400">*</span>
                </p>
                <input
                  type="password"
                  className="input-boxpassword relative p-2 bg-black border border-slate-400 outline-none mt-2 rounded-md w-10/12"
                  required
                />
                <span className="placeholderpassword absolute text-white w-[165px] left-4 top-[256px] transition-all duration-300">
                  Enter your password
                </span>
              </>
            )}
          </span>

          <Button
            title={titletype === "login" ? "Sign In" : "Sign up"}
            varient="bg-red-600 p-2 text-white rounded-md text-sm w-full mt-5 font-semibold"
          />
        </form>
        {titletype === "login" ? (
          <span className="w-full flex justify-center mt-2">
            <p>
              Don't have an accout?
              <span className="text-red-600 underline"> Register</span>
            </p>
          </span>
        ) : (
          <span>
            <span className="w-full flex justify-center mt-2">
              <p>
                Already have an accout?
                <span className="text-red-600 underline"> Login</span>
              </p>
            </span>
          </span>
        )}
      </div>
    </div>
  );
};

export default From;
