import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg rounded-lg p-8">
          <h1 className="text-5xl font-bold text-center mb-6">
            Welcome to Yatra
          </h1>
          <p className="text-lg text-center leading-relaxed">
            Embark on your ultimate travel journey with Yatra, your trusted
            companion for planning and discovery.
          </p>
        </div>

        {/* Content Section */}
        <div className="mt-10 bg-white shadow-md rounded-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Why Choose Yatra?
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            In a world where adventure and discovery are more sought after than
            ever, Yatra stands out as the ultimate travel planner. Named after
            the Sanskrit word for "journey," Yatra is designed to help you
            navigate the complexities of planning your next adventure with ease
            and precision.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Unlike other travel planning tools, Yatra goes beyond booking
            flights and hotels. It offers a comprehensive platform where you can
            create an account, bookmark your favorite spots, and plan your trips
            well in advance. Whether you're exploring exotic destinations or
            finding unique activities, Yatra ensures a smooth and enjoyable
            experience.
          </p>

          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Our Technology
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Built with a powerful backend in Django and a dynamic, user-friendly
            frontend in React, Yatra delivers an intuitive interface and
            efficient performance. It's perfect for adventurers and casual
            travelers alike, offering memorable and hassle-free travel
            experiences.
          </p>
        </div>

        {/* CTA Section */}
        <div className="mt-10 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">
            Start Your Journey with Yatra Today!
          </h3>
          <p className="text-lg leading-relaxed mb-6">
            Sign up now to explore destinations, bookmark your favorite spots,
            and plan your adventures effortlessly.
          </p>
          <button className="bg-white text-green-500 hover:bg-gray-100 font-bold py-2 px-6 rounded-lg">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
