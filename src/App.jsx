import { useState, useContext } from "react";
import { GlobalContext } from "./store/GlobalContextProvider";
import "./App.css";
import LoginPage from "./pages/login/LoginPage";
import HomePage from "./pages/home/HomePage";
const App = () => {
  const authCtx = useContext(GlobalContext);

  return (
    <>
      {authCtx.isLoggedIn ? <HomePage /> : <LoginPage/>}
    </>
  );
};

export default App;
