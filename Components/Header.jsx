import React, { useContext } from "react";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ThemeContext } from "../contexts/theme/ThemeContext";
import Logout from "../pages/Logout/Logout";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Switch, Typography, Unstable_Grid2 } from "@mui/material";
import { SessionContext } from "../contexts/session/SessionContext";
import SelectFont from "./Select/SelectFont";
import Notification from "./Notification/Notification";
import { UserContext } from "../contexts/user/UserContext";

function Header() {
  //cambiar tema
  const { isDark, toggleTheme } = useContext(SessionContext);
  const { user } = useContext(UserContext);
  const [mostrarLogout, setMostrarLogout] = useState(false);

  return (
    <div>
      <div className={styles.headcontainer}>
        <div className={styles.headwrapper}>
          <div className={styles.titlePrincipal}>
            <h2>Intervenciones</h2>
          </div>
        </div>

        {user.id_rol === 2 && <Notification />}
        <div className={styles.selectFont}>
          <SelectFont />
        </div>
        <div className={styles.switchWrapper}>
          <Typography className={styles.switchTitle}>
            {isDark ? "Oscuro" : "Claro"}
          </Typography>

          <Switch
            className={styles.switchTheme}
            checked={isDark}
            onChange={toggleTheme}
            color="default"
          />
        </div>

        <div className={styles.nombreUsuarioContent}>
          <h2>{user.nombre_usuario}</h2>
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
