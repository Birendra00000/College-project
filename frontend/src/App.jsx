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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserRedirectPage from "./AuthContext/UserRedirectPage";

const queryClient = new QueryClient();

function App() {
  const LayOut = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <>
          <Navbar />
          <Outlet />
          {/* <Footer /> */}
        </>
      </QueryClientProvider>
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
          path: "/userRedirectPage",
          element: <UserRedirectPage />,
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
