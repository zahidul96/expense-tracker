import { useState, useContext } from "react";
import "./App.css";
import NavBar from "./common/NavBar";
import { createBrowserRouter, RouterProvider } from "react-router";
import LoginPage from "./pages/login/LoginPage";
import ProductPage from "./pages/product/ProductPage";
import AboutPage from "./pages/about/AboutPage";
import HomePage from "./pages/home/HomePage";
const App = () => {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavBar />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "/product",
          element: <ProductPage />,
        },
        {
          path: "/about",
          element: <AboutPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
