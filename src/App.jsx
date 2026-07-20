import { useState, useContext, useEffect } from "react";
//import { GlobalContext } from "./store/GlobalContextProvider";
import "./App.css";
import { useSelector } from "react-redux";
import LoginPage from "./pages/login/LoginPage";
import HomePage from "./pages/home/HomePage";
const App = () => {
  const isLoggedIn = useSelector((state)=>state.auth.isLoggIn)
  const data = useSelector((state)=>state.expense.expenses)
  console.log(data)
  return (
    <>
      {isLoggedIn ? <HomePage /> : <LoginPage/>}
    </>
  );
};

export default App;
