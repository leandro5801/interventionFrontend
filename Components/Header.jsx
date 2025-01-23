import React, { useContext, useState } from "react";
import styles from "../styles/Home.module.css";
import WbSunnyIcon from "@mui/icons-material/WbSunny"; // Icono de sol
import NightsStayIcon from "@mui/icons-material/NightsStay"; // Icono de luna
import Logout from "../pages/Logout/Logout";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Switch, Typography, Tooltip } from "@mui/material";
import { SessionContext } from "../contexts/session/SessionContext";
import SelectFont from "./Select/SelectFont";
import Notification from "./Notification/Notification";
import { UserContext } from "../contexts/user/UserContext";

function Header() {
  const { isDark, toggleTheme } = useContext(SessionContext);
  const { user } = useContext(UserContext);
  const [mostrarLogout, setMostrarLogout] = useState(false);

  return (
    <div>
      <div className={styles.headcontainer}>
        <div className={styles.headwrapper}>
          <div className={styles.titlePrincipal}>
            <Typography variant="h2">Intervenciones</Typography>
          </div>
        </div>

        {user.id_rol === 2 && <Notification />}
        <div className={styles.selectFont}>
          <SelectFont />
        </div>
        <div className={styles.switchWrapper}>
          <div className={styles.themeToggle}>
            <div className={styles.switchTitle}>
              {isDark ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <NightsStayIcon
                    style={{ color: "#000000", transition: "color 0.3s" }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <WbSunnyIcon
                    style={{ color: "#ffffff", transition: "color 0.3s" }}
                  />
                </div>
              )}
            </div>
            <Switch
              className={styles.switchTheme}
              checked={isDark}
              onChange={toggleTheme}
              color="default"
              sx={{
                "& .MuiSwitch-thumb": {
                  backgroundColor: isDark ? "#000000" : "#ffffff",
                },
                "& .Mui-checked": {
                  color: isDark ? "#000000" : "#ffffff",
                },
              }}
            />
          </div>
        </div>

        <div className={styles.nombreUsuarioContent}>
          <Typography variant="h2">{user.nombre_usuario}</Typography>
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
