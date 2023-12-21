import React, { createContext, useContext, useState } from "react";

const RedirectContext = createContext();

export const useRedirect = () => useContext(RedirectContext);

export const RedirectProvider = ({ children }) => {
    const [userNameRe, setUserNameRe] = useState(null);
    const [userScoreRe, setUserScoreRe] = useState(null);
    const [userCategoryRe, setUserCategoryRe] = useState(null);

    const setRedirectedParams = (param1 , param2, param3) => {
        setUserNameRe(param1);
        setUserScoreRe(param2);
        setUserCategoryRe(param3);
    };

    const clearRedirectedParams = () => {
        setUserNameRe(null);
        setUserScoreRe(null);
        setUserCategoryRe(null);
    };

    return (
        <RedirectContext.Provider
            value={{ userNameRe, userScoreRe, userCategoryRe, setRedirectedParams, clearRedirectedParams }}
        >
            {children}
        </RedirectContext.Provider>
    );
};
