import { createContext, useState } from "react";
import useLocalStorage from "../../helpers/useLocalStorage";
export const UserContext = createContext({});
export default function UserProvider({ children }) {
  const { set, get } = useLocalStorage();
  const [user, setUser] = useState(
    /*() => {
    const token = get("access_token");
    if (token) {
      
       try {
        return {
          id_session: Number(get("id_session")),
          nombre_usuario: get("nombre_usuario"),
          id_rol: Number(get("id_rol")),
          id_usuario: Number(get("id_usuario")),
        };
      } catch (error) {
        console.error("Error al parsear la cookie del usuario:", error);
        return null; // Retorna null si hay un error
      } 
    }
    return null;
  }*/ null
  );

  const changeUser = (user) => {
    console.log(user);

    /* Cookies.set("id_session", user.id_session);
    Cookies.set("user", JSON.stringify(user)); */
    /* set("id_session", user.id_session);
    set("nombre_usuario", user.nombre_usuario);
    set("id_rol", user.id_rol);
    set("id_usuario", user.id_usuario); */
    //fetchSession(user ? user.id_session : get("id_session"));
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user, setUser, changeUser }}>
      {children}
    </UserContext.Provider>
  );
}
