import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Packages = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  // Check if the user is authenticated and has a role
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (!storedRole) {
      navigate("/login"); // Redirect to login if no role is found
    } else {
      setRole(storedRole);
    }
  }, [navigate]);

  if (role === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {role === "admin" ? (
        <AdminDashboard /> // Render Admin Dashboard
      ) : (
        <UserDashboard /> // Render User Dashboard
      )}
    </div>
  );
};

// Admin Dashboard Component
const AdminDashboard = () => (
  <div>
    <h2>Welcome, Admin</h2>
    {/* Admin-specific content */}
  </div>
);

// User Dashboard Component
const UserDashboard = () => (
  <div>
    <h2>Welcome, User</h2>
    {/* User-specific content */}
  </div>
);

export default Packages;
