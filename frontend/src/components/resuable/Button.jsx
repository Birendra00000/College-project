import React from "react";

const Button = ({ title, varient }) => {
  return (
    <div className="w-[85%] ">
      <button className={varient}>{title}</button>
    </div>
  );
};

export default Button;
