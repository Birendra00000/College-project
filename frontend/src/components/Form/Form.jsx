import React, { useState } from "react";
import Button from "../resuable/Button";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import BaseUrl from "../../AxiosInstance/BaseUrl";

const Form = ({ titletype }) => {
  //for Submitting form
  console.log(BaseUrl); // This should log an Axios instance

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const endPoint =
        titletype === "login" ? "/accounts/login/" : "/account/register/";
      const response = await BaseUrl.post(endPoint, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: (data) => {
      console.log("Data submitted successfully:", data);
      alert("Data submitted successfully!");
    },
    onError: (error) => {
      console.error("Error submitting data:", error);
      alert(`An error occurred: ${error.message}`);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((preData) => ({
      ...preData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData); // Check if this logs the correct form data.
    // For login, remove the name field before submission
    const dataToSubmit = { ...formData };
    if (titletype === "login") delete dataToSubmit.name;

    mutation.mutate(dataToSubmit);
  };

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
        <form action="" className="py-4" onSubmit={handleSubmit}>
          <span className="relative">
            {titletype === "login" ? (
              ""
            ) : (
              <>
                <p className="text-base font-medium">
                  Name <span className="text-red-400">*</span>
                </p>
                <input
                  type="text"
                  name="username"
                  className="input-box1 p-2 bg-black border border-slate-400 outline-none mt-2 rounded-md w-full sm:w-10/12"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />

                <span className="placeholder1 absolute text-white w-[140px]  left-4 top-[60px] text-sm transition-all duration-300">
                  Enter your name
                </span>
              </>
            )}
            <>
              <p className="text-base font-medium mt-6">
                Email Address <span className="text-red-400">*</span>
              </p>
              <input
                type="email"
                name="email"
                className="input-box2 p-2 bg-black border border-slate-400 outline-none mt-2 rounded-md w-full sm:w-10/12"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <span className="placeholder2 absolute text-white w-[140px] left-4 top-[158px] text-sm transition-all duration-300">
                Enter your email
              </span>
            </>
            <>
              <p className="text-base font-medium mt-6">
                Password <span className="text-red-400">*</span>
              </p>
              <input
                type="password"
                name="newPassword"
                className="input-boxpassword p-2 bg-black border border-slate-400 outline-none mt-2 rounded-md w-full sm:w-10/12"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
              <span className="placeholderpassword absolute text-white w-[165px] left-4 top-[256px] text-sm transition-all duration-300">
                Enter your new password
              </span>
            </>{" "}
            <>
              <p className="text-base font-medium mt-6">
                Password <span className="text-red-400">*</span>
              </p>
              <input
                type="password"
                name="confirmPassword"
                className="input_confirmboxpassword p-2 bg-black border border-slate-400 outline-none mt-2 rounded-md w-full sm:w-10/12"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <span className="confirmplaceholderpassword absolute text-white w-[165px] left-4 top-[256px] text-sm transition-all duration-300">
                Enter your confirm password
              </span>
            </>
          </span>

          <Button
            title={
              mutation.isLoading
                ? "Submitting..."
                : titletype === "login"
                ? "Sign In"
                : "Sign Up"
            }
            varient="bg-red-600 p-2 text-white rounded-md text-sm w-full mt-5 font-semibold"
            disabled={mutation.isLoading}
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
