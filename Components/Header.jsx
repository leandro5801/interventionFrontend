import React from "react";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import Logout from "../pages/Logout/Logout";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

function Header() {
  const [mostrarLogout, setMostrarLogout] = useState(false);
  //usuario autenticado
  const [user, setUser] = useState(null);
  let nombreUsuario = "";
  useEffect(() => {
    async function getProfile() {
      try {
        const token = Cookies.get("access_token");
        const response = await axios.get(
          "http://localhost:3000/api/autenticacion/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data.user);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    getProfile();
  }, []);

  if (user) {
    nombreUsuario = user.nombre_usuario;
  }

  return (
    <div>
      <div className={styles.headcontainer}>
        <div className={styles.headwrapper}>
          <div className={styles.title}>
            <h2>Intervenciones</h2>
          </div>
        </div>
        <div className={styles.nombreUsuarioContent}>
          <h2>{nombreUsuario}</h2>
          
        </div>
        <div className={styles.faIconOutAltContent}>
          <LogoutOutlinedIcon
            onClick={() => setMostrarLogout(true)}
            className={styles.faIconOutAlt}
          />
          {mostrarLogout && <Logout setMostrarLogout={setMostrarLogout} />}
        </div>
      </div>
    </div>
  );
}

export default Header;
