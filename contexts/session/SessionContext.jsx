import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Fuente } from "../../enums/Fuente.enum";
import useLocalStorage from "../../helpers/useLocalStorage";
import { UserContext } from "../user/UserContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createCustomTheme } from "../../helpers/theme";
export const SessionContext = createContext({});
export default function SessionProvider({ children }) {
  /* const sessionCookie = Cookies.get("session");
  const initialSession = sessionCookie
    ? JSON.parse(sessionCookie)
    : { isDark: false, font: "", id: "" }; */

  const { user } = useContext(UserContext);
  const { get, set } = useLocalStorage();
  const [id_session, setId_session] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [isDark, setIsDark] = useState(() => {
    // Establecer el estado inicial de isDark desde localStorage
    const dark = get("isDark");

    if (dark === "true") {
      console.log(dark);
      return true;
    } else return false;
  });
  const [font, setFont] = useState(() => {
    // Establecer el estado inicial de isDark desde localStorage
    const font = get("font");
    if (font) {
      return get("font");
    } else return "Roboto";
  });

  async function fetchSession(idSession) {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/session/${idSession}`
      );
      if (response.status === 200) {
        set("isDark", response.data.isDark);
        set("font", response.data.font);
        setIsDark(response.data.isDark);
        setFont(response.data.font);
        setId_session(idSession);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const toggleTheme = () => {
    const newIsDark = !isDark;
    set("isDark", newIsDark);
    setIsDark(newIsDark);
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute(
        "data-theme",
        isDark ? "dark" : "light"
      );
    }
    setIsLoading(false);
  }, [isDark]);

  async function saveSession() {
    console.log({ font, isDark, id_session });

    try {
      const response = await axios.patch(`http://localhost:3000/api/session/`, {
        isDark: isDark,
        font: font,
        id: id_session,
      });
      console.log(response);

      if (response.status === 200) {
        changeFont("Roboto");
      }
    } catch (error) {
      console.log(error);
    }
  }
  const changeFont = (newFont) => {
    set("font", newFont);
    setFont(newFont);
  };

  return (
    <SessionContext.Provider
      value={{
        id_session,
        isDark,
        setIsDark,
        font,
        setFont,
        toggleTheme,
        saveSession,
        changeFont,
        fetchSession,
      }}
    >
      {isLoading ? null : children}
    </SessionContext.Provider>
  );
}
