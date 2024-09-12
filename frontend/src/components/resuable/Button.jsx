import React from "react";

const Button = ({ title, varient }) => {
  return <button className={varient}>{title}</button>;
};

export default Button;
