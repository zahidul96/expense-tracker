import React, { createContext, useState } from "react";

export const GlobalContext = createContext({
    isLoggedIn: false,
    login: () => {},
});
const GlobalContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const userIsLoggedIn = !!token;
    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem("token", token);
    }
    const contextValue = {
        token : token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
    }
    return (
        <GlobalContext.Provider value={contextValue}>
            {props.children}
        </GlobalContext.Provider>
    )
}
export default GlobalContextProvider