import { createBrowserRouter, Outlet } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar"; // Make sure Navbar component is correctly imported
import Home from "./pages/home/Home";
import Footer from "./components/Footer";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";
import Contact from "./pages/contact/Contact";
import Packages from "./pages/packages/Packages";
import About from "./pages/aboutUS/About";
import AdminDashBoard from "./pages/AdminDashBoard/AdminDashBoard";
import AdminDestination from "./pages/AdminDashBoard/AdminDestination";

function App() {
  const LayOut = () => {
    return (
      <>
        <Navbar />
        <Outlet />
        {/* <Footer /> */}
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayOut />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/contactus",
          element: <Contact />,
        },
        {
          path: "/packages",
          element: <Packages />,
        },
        {
          path: "/aboutUs",
          element: <About />,
        },

        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
    // Uncomment the routes below if you want to add them
    // {
    //   path: "/login",
    //   element: <Login />,
    // },
    // {
    //   path: "/register",
    //   element: <Register />,
    // },
    {
      path: "/admin/dashboard",
      element: <AdminDashBoard />,
    },
    {
      path: "/admin/destinations",
      element: <AdminDestination />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
