import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Fuente } from "../../enums/Fuente.enum";
import useLocalStorage from "../../helpers/useLocalStorage";
import { UserContext } from "../user/UserContext";
export const SessionContext = createContext({});
export default function SessionProvider({ children }) {
  /* const sessionCookie = Cookies.get("session");
  const initialSession = sessionCookie
    ? JSON.parse(sessionCookie)
    : { isDark: false, font: "", id: "" }; */

  const { user } = useContext(UserContext);
  const { get, set } = useLocalStorage();
  const [id_session, setId_session] = useState(() => {
    const session = get("id_session");
    return session ? session : "";
  });
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

  useEffect(() => {
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
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchSession(user ? user.id_session : get("id_session"));
    setIsLoading(false);
  }, []);

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
        console.log(response.data);

        /* setSession(response.data);
        setIsDark(response.data.isDark); */
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
      }}
    >
      {isLoading ? null : children}
    </SessionContext.Provider>
  );
}
