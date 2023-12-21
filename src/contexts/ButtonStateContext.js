import React, { createContext, useContext, useState } from "react";

const ButtonStateContext = createContext();

export const useButtonState = () => useContext(ButtonStateContext);

export const ButtonStateProvider = ({ children }) => {
    const [isClicked, setIsClicked] = useState(false);

    const setButtonState = (value) => {
        setIsClicked(value);
    };

    const clearButtonState = () => {
        setIsClicked(false);
    };

    return (
        <ButtonStateContext.Provider
            value={{ isClicked, setButtonState, clearButtonState }}
        >
            {children}
        </ButtonStateContext.Provider>
    );
};
