import { useState, useContext, useEffect } from "react";
//import { GlobalContext } from "./store/GlobalContextProvider";
import "./App.css";
import { useSelector } from "react-redux";
import LoginPage from "./pages/login/LoginPage";
import HomePage from "./pages/home/HomePage";
const App = () => {
  const isLoggedIn = useSelector((state)=>state.auth.isLoggIn)
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  console.log(isDarkMode)
  
  return (
    <div className={isDarkMode ? 'app-container dark-theme' : 'app-container'}>
      {isLoggedIn ? <HomePage /> : <LoginPage/>}
    </div>
  );
};

export default App;
