import React from "react";
import Button from "../resuable/Button";
import { Link } from "react-router-dom";

const Form = ({ titletype }) => {
  const formHeight = titletype === "login" ? "min-h-[90vh]" : "min-h-[100vh]";

  return (
    <div className={`w-full flex justify-center ${formHeight} items-center`}>
      <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[40%] bg-black text-white p-6 md:p-14 rounded-md m-4">
        <span className="flex justify-center flex-col items-center">
          <p className="mb-4 text-center">
            {titletype === "login" ? (
              <span className="font-black text-xl md:text-2xl">
                Log In{" "}
                <span className="font-black text-xl md:text-2xl">
                  YAT<span className="text-[#F5B963]">RA</span>
                </span>
              </span>
            ) : (
              <span className="font-black text-xl md:text-2xl">
                Sign Up{" "}
                <span className="font-black text-xl md:text-2xl">
                  YAT<span className="text-[#F5B963]">RA</span>
                </span>
              </span>
            )}
          </p>
          <p className="text-center text-sm md:text-base">
            Aorem ipsum dolor sit amet consectetur. Sollicitudin neque fringilla
            aliquam mauris elit. Leo vel
          </p>
        </span>
        <form action="" className="py-4">
          <span className="relative">
            <>
              <p className="text-base font-medium">
                Name <span className="text-red-400">*</span>
              </p>
              <input
                type="text"
                className="input-box1 p-2 bg-black border border-slate-400 outline-none mt-2 rounded-md w-full sm:w-10/12"
                required
              />
              <span className="placeholder1 absolute text-white w-[140px]  left-4 top-[60px] text-sm transition-all duration-300">
                Enter your name
              </span>
            </>
            <>
              <p className="text-base font-medium mt-6">
                Email Address <span className="text-red-400">*</span>
              </p>
              <input
                type="email"
                className="input-box2 p-2 bg-black border border-slate-400 outline-none mt-2 rounded-md w-full sm:w-10/12"
                required
              />
              <span className="placeholder2 absolute text-white w-[140px] left-4 top-[158px] text-sm transition-all duration-300">
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
                  className="input-boxpassword p-2 bg-black border border-slate-400 outline-none mt-2 rounded-md w-full sm:w-10/12"
                  required
                />
                <span className="placeholderpassword absolute text-white w-[165px] left-4 top-[256px] text-sm transition-all duration-300">
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
          <span className="w-full flex justify-center mt-2 text-center">
            <p>
              Don't have an account?
              <Link to="/register" className="text-red-600 underline">
                {" "}
                Register
              </Link>
            </p>
          </span>
        ) : (
          <span className="w-full flex justify-center mt-2 text-center">
            <p>
              Already have an account?
              <Link to="/login" className="text-red-600 underline">
                {" "}
                Login
              </Link>
            </p>
          </span>
        )}
      </div>
    </div>
  );
};

export default Form;
