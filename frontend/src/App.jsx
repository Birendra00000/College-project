import { createBrowserRouter, Outlet } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar"; // Make sure Navbar component is correctly imported
import Home from "./pages/home/Home";
import Footer from "./components/Footer";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";

function App() {
  const LayOut = () => {
    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
