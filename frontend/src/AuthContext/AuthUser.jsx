import React, { createContext, useState, useEffect, useContext } from "react";
import jwtDecode from "jwt-decode";

// Default values for context to avoid errors before wrapping components
const defaultContextValue = {
  token: null,
  isAdmin: false,
  isAuthenticated: false,
  logIn: () => {},
  logOut: () => {},
};

const AuthContext = createContext(defaultContextValue);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Get token and isAdmin from localStorage
  const storedToken = localStorage.getItem("auth_token");
  const storedIsAdmin = localStorage.getItem("is_admin");

  // Function to check if the JWT token is expired
  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.exp * 1000 < Date.now(); // Token is expired if exp < current time
    } catch (error) {
      return true;
    }
  };

  // Check token validity when component mounts
  useEffect(() => {
    const verifyToken = () => {
      if (storedToken && storedIsAdmin !== null) {
        if (isTokenExpired(storedToken)) {
          logOut(); // Clear invalid token
          console.log("Token expired, user logged out");
        } else {
          setToken(storedToken);
          setIsAdmin(storedIsAdmin === "true"); // storedIsAdmin is a string, so compare it
          setIsAuthenticated(true);
        }
      } else {
        console.log("No user data found in localStorage");
      }
    };

    verifyToken();
  }, [storedToken, storedIsAdmin]);

  // Function to handle user login
  const logIn = (newToken, isAdminStatus) => {
    localStorage.setItem("auth_token", newToken);
    localStorage.setItem("is_admin", isAdminStatus.toString()); // Store isAdmin as a string
    setToken(newToken);
    setIsAdmin(isAdminStatus);
    setIsAuthenticated(true);
  };

  // Function to handle user logout
  const logOut = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("is_admin");
    setToken(null);
    setIsAdmin(false);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ token, isAdmin, isAuthenticated, logIn, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// Custom hook to use the authentication context
export const useAuth = () => useContext(AuthContext);
