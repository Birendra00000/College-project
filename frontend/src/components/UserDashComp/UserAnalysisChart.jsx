import React, { useState } from "react";

const UserProfile = () => {
  // State for user information and uploaded photo
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState(null);

  // Handle photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">User Profile</h2>

      {/* Profile Picture Upload */}
      <div className="flex justify-center mb-4">
        <label htmlFor="photo-upload" className="cursor-pointer">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300">
            <img
              src={photo || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </label>
      </div>

      {/* Name Input */}
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter your name"
        />
      </div>

      {/* Email Input */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter your email"
        />
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          onClick={() => alert("Profile saved!")}
          className="w-full mt-4 bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
