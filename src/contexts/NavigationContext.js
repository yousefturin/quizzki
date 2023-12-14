import React, { createContext, useContext, useState } from "react";

const NavigationContext = createContext();

export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }) => {
    const [redirectPath, setRedirectPath] = useState(null);

    const setNavigation = (path) => {
        setRedirectPath(path);
    };

    const clearNavigation = () => {
        setRedirectPath(null);
    };

    return (
        <NavigationContext.Provider
            value={{ redirectPath, setNavigation, clearNavigation }}
        >
            {children}
        </NavigationContext.Provider>
    );
};
