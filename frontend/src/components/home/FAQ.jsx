import React, { useState } from "react";
import { accordionData } from "../../../Data/data";

const FAQ = () => {
  // State to keep track of the open accordion index
  const [openIndex, setOpenIndex] = useState(null);

  // Function to toggle the accordion
  const toggleAccordion = (index) => {
    // Toggle the accordion open/close
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex w-full justify-center">
      <div className="flex justify-center flex-col items-center w-[70%] px-10">
        <span className="text-2xl text-gray-500 font-bold">
          Frequently Asked Questions
        </span>
        <div className="container mx-auto p-5">
          {accordionData.map((item, index) => (
            <div key={index} className="border border-gray-300 rounded-md my-2">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left px-4 py-2 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 flex justify-between items-center rounded-md"
              >
                <span className="text-white p-2 ">{item.title}</span>
                <svg
                  className={`w-5 h-5 transform transition-transform duration-300 text-white ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="p-4 border-t border-gray-200">
                  {item.content}
                </div>
              )}
            </div>
          ))}
        </div>
        <span className="flex flex-col">
          <p className="font-bold mb-2">Still have a question?</p>
          <p>
            If you still have questions contact a member of our team on{" "}
            <span className="text-red-600 underline">live chat </span>we’ll be
            more than happy to help.
          </p>
        </span>
      </div>
    </div>
  );
};

export default FAQ;
