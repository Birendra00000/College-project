import React, { useState } from "react";
import Button from "../resuable/Button";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import BaseUrl from "../../AxiosInstance/BaseUrl";
import AdminDashBoard from "../../pages/AdminDashBoard/AdminDashBoard";
import UserDashBoard from "../../pages/UserDashBoard/UserDashBoard";

const Form = ({ titletype }) => {
  const navigate = useNavigate();

  // Initialize the form data state
  const [formData, setFormData] = useState(
    titletype === "login"
      ? { email: "", password: "" }
      : {
          username: "",
          email: "",
          password: "",
          confirm_password: "",
          role: "user",
        } // Added role field
  );

  // Mutation for handling form submission
  const mutation = useMutation({
    mutationFn: async (formData) => {
      const endPoint =
        titletype === "login" ? "/account/login/" : "/account/register/";
      const response = await BaseUrl.post(endPoint, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Data submitted successfully response:", response);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("role", data.isAdmin ? "admin" : "user"); // Save role

      console.log("Data submitted successfully:", data);
      alert("Data submitted successfully!");

      if (titletype === "login") {
        const role = data.isAdmin ? "admin" : "user";
        if (role === "admin") {
          navigate("/admin/dashboard"); // Redirect to Admin Dashboard
        } else {
          navigate("/user/profile"); // Redirect to User Dashboard
        }
      }
    },
    onError: (error) => {
      console.error("Error submitting data:", error);
      alert(`An error occurred: ${error.message}`);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit =
      titletype === "login"
        ? { email: formData.email, password: formData.password }
        : { ...formData };

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
            {titletype !== "login" && (
              <div className="relative">
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
              </div>
            )}

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
            <span
              className={`placeholder2 absolute text-white w-[140px] ${
                titletype === "login"
                  ? " top-[82px] left-4 text-sm"
                  : " top-[158px]  left-4 "
              } text-sm transition-all duration-300`}
            >
              Enter your email
            </span>

            <p className="text-base font-medium mt-6">
              Password <span className="text-red-400">*</span>
            </p>
            <input
              type="password"
              name="password"
              className="input-boxpassword p-2 bg-black border border-slate-400 outline-none mt-2 rounded-md w-full sm:w-10/12"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className={`placeholderpassword absolute ${
                titletype === "login"
                  ? "top-[180px] left-4"
                  : "left-4 top-[256px]"
              } text-white w-[165px]  text-sm transition-all duration-300`}
            >
              Enter your password
            </span>

            {titletype !== "login" && (
              <>
                <p className="text-base font-medium mt-6">
                  Confirm Password <span className="text-red-400">*</span>
                </p>
                <input
                  type="password"
                  name="confirm_password"
                  className="input_confirmboxpassword p-2 bg-black border border-slate-400 outline-none mt-2 rounded-md w-full sm:w-10/12"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  required
                />
                <span className="confirmplaceholderpassword absolute text-white w-[353px] left-4 top-[353px] text-sm transition-all duration-300">
                  Enter your confirm password
                </span>
                {/* Role Selection */}
                <p className="text-base font-medium mt-6">Select Role</p>
                <select
                  name="role"
                  className="input-boxrole p-2 bg-black border border-slate-400 outline-none mt-2 rounded-md w-full sm:w-10/12"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </>
            )}
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
