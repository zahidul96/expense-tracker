import React, { createContext, useState } from "react";

export const GlobalContext = createContext({
    isLoggedIn: false,
    login: () => {},
});
const GlobalContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const loginHandler = (token) => {
        setIsLoggedIn(true);
        localStorage.setItem("token", token);
    }
    const contextValue = {
        isLoggedIn: isLoggedIn,
        login: loginHandler,
    }
    return (
        <GlobalContext.Provider value={contextValue}>
            {props.children}
        </GlobalContext.Provider>
    )
}
export default GlobalContextProvider