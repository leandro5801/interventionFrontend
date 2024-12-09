import { createContext, useState } from "react";
import Cookies from "js-cookie";
export const UserContext = createContext({});
export default function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        // Intenta parsear la cookie
        return JSON.parse(userCookie);
      } catch (error) {
        console.error("Error al parsear la cookie del usuario:", error);
        return null; // Retorna null si hay un error
      }
    }
    return null;
  });
  const changeUser = (user) => {
    Cookies.set("id_session", user.id_session);
    Cookies.set("user", JSON.stringify(user));
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user, setUser, changeUser }}>
      {children}
    </UserContext.Provider>
  );
}
