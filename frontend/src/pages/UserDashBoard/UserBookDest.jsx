import React, { useState } from "react";

const UserBookDest = () => {
  const [formData, setFormData] = useState({
    tripDate: "",
    numberOfTravelers: 1,
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    phoneNumber: "",
    termsAccepted: false,
    pickupDetails: "",
    extraRequirements: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      termsAccepted: e.target.checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.termsAccepted) {
      // Handle form submission logic, like API call
      console.log("Form Submitted:", formData);
    } else {
      alert("Please accept the terms and conditions.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Book a Destination
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Trip Date and Number of Travelers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Trip Date *
            </label>
            <input
              type="date"
              name="tripDate"
              value={formData.tripDate}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Number of Travelers
            </label>
            <input
              type="number"
              name="numberOfTravelers"
              min="1"
              value={formData.numberOfTravelers}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Lead Traveler Details */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Lead Traveler Details</h3>
          <div>
            <label className="block text-sm font-semibold mb-2">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Choose Your Country *
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Country</option>
              <option value="Nepal">Nepal</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              {/* Add other countries here */}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Country Code + Phone Number *
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              placeholder="Country Code + Phone Number"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Pickup Details and Extra Requirements */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Pickup Details
            </label>
            <textarea
              name="pickupDetails"
              value={formData.pickupDetails}
              onChange={handleChange}
              placeholder="Enter your pickup location"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Extra Requirements
            </label>
            <textarea
              name="extraRequirements"
              value={formData.extraRequirements}
              onChange={handleChange}
              placeholder="Any extra requirements?"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleCheckboxChange}
            required
            className="h-5 w-5 text-blue-500"
          />
          <label className="text-sm">I accept the terms and conditions</label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Book Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserBookDest;
