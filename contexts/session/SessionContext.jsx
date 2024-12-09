import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Fuente } from "../../enums/Fuente.enum";
export const SessionContext = createContext({});
export default function SessionProvider({ children }) {
  /* const sessionCookie = Cookies.get("session");
  const initialSession = sessionCookie
    ? JSON.parse(sessionCookie)
    : { isDark: false, font: "", id: "" }; */

  const [session, setSession] = useState({
    isDark: false,
    font: "",
    id: "",
  });

  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [isDark, setIsDark] = useState(() => {
    // Establecer el estado inicial de isDark desde la cookie
    const sessionCookie = Cookies.get("session");
    if (sessionCookie) {
      const parsedSession = JSON.parse(sessionCookie);
      return parsedSession.isDark; // Retorna el valor de isDark de la cookie
    } else return false; // Valor por defecto si no hay cookie
  });
  const [font, setFont] = useState(() => {
    // Establecer el estado inicial de isDark desde la cookie
    const sessionCookie = Cookies.get("session");
    console.log(sessionCookie);

    if (sessionCookie) {
      const parsedSession = JSON.parse(sessionCookie);
      return parsedSession.font; // Retorna el valor de isDark de la cookie
    } else return "Roboto"; // Valor por defecto si no hay cookie
  });
  const toggleTheme = () => {
    const newIsDark = !isDark;
    Cookies.set("session", JSON.stringify({ isDark: newIsDark, font: font }));
    setIsDark(newIsDark);
  };
  useEffect(() => {
    // Cargar la sesión desde las cookies si existe
    const sessionCookie = Cookies.get("session");
    if (sessionCookie) {
      const parsedSession = JSON.parse(sessionCookie);
      // setIsDark(parsedSession.isDark);
      setSession(parsedSession);
      // setFont(parsedSession.font); // Analiza la cookie de sesión y establece el estado
    } else {
      console.log("no tiene cookie");
    }
    setIsLoading(false);
  }, []); // Este efecto se ejecuta solo una vez después de que el componente se monta

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute(
        "data-theme",
        isDark ? "dark" : "light"
      );
    }
    console.log(isDark);
  }, [isDark]);

  async function fetchSession(idSession) {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/session/${idSession}`
      );
      if (response.status === 200) {
        console.log(response.data);
        /* document.cookie = `theme=${response.data.isDark};  path=/`; */
        Cookies.set(
          "session",
          JSON.stringify({
            isDark: response.data.isDark,
            font: response.data.font,
          })
        );
        setSession(response.data);
        setIsDark(response.data.isDark);
        setFont(response.data.font);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function saveSession() {
    console.log(session);

    try {
      const response = await axios.patch(`http://localhost:3000/api/session/`, {
        isDark: isDark,
        font: Fuente[font],
        id: session.id,
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
    Cookies.set("session", JSON.stringify({ isDark: isDark, font: newFont }));
    setSession({ isDark: isDark, font: newFont, id: session.id });
    setFont(newFont);
  };

  return (
    <SessionContext.Provider
      value={{
        session,
        setSession,
        fetchSession,
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
