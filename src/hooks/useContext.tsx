"use client"

import React, { createContext, useState } from "react";

// define context type
type ThemeContextType = {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
};

// create context
const themeContext = createContext<ThemeContextType | undefined>(undefined);

// create a provider
export const ThemeContextProvider = ({children}: {children: React.ReactNode}) => {
const [isDark, setIsDark] = useState<boolean>(false);

  return (
    <themeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </themeContext.Provider>
  );
}
// custom hook to use the context
export const useTheme = () => {
  const context = React.useContext(themeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};


