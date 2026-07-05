import React, { createContext, useState } from "react";

export const GlobalContext = createContext({
    isLoggedIn: false,
    login: () => {},
});
const GlobalContextProvider = (props) => {
    const initialToken = localStorage.getItem("token")
    const [token, setToken] = useState(initialToken);
    const userIsLoggedIn = !!token;
    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem("token", token);
    }
    const logoutHandler = ()=>{
        setToken(null)
        localStorage.removeItem("token")
        localStorage.removeItem("profileOpen")
    }
    const contextValue = {
        token : token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout : logoutHandler
    }
    return (
        <GlobalContext.Provider value={contextValue}>
            {props.children}
        </GlobalContext.Provider>
    )
}
export default GlobalContextProvider