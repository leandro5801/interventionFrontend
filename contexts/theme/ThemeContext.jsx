/* import React, { createContext, useContext, useEffect, useState } from "react";
import UserContext from "../session/SessionContext";
export const ThemeContext = createContext("");
export default function ThemeProvider({ children }) {
  // const { session } = useContext(UserContext);
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute(
        "data-theme",
        isDark ? "dark" : "light"
      );
    }
    console.log(isDark);
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
} */
