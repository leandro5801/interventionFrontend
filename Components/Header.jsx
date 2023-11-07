import React from "react";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import Navbar from "./DropdownMenu/NavBar";
import Dialog from "./Forms/Dialog";
import IntervrntionForm from "./Forms/IntervrntionForm";
import CreateRecomendationForm from "./Forms/RecomendationCreateForm";
import { client } from "../utils/fetchWrapper";
import Logout from "../pages/Home/Logout/Logout";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

function Header({ setIsAuthenticated }) {
  const [mostrarLogout, setMostrarLogout] = useState(false);

  return (
    <div>
      <div className={styles.headcontainer}>
        <div className={styles.headwrapper}>
          <div className={styles.title}>
            <h2>Intervenciones</h2>
          </div>
        </div>

        <div className={styles.faIconOutAltContent}>
          <LogoutOutlinedIcon
            onClick={() => setMostrarLogout(true)}
            className={styles.faIconOutAlt}
          />
          {mostrarLogout && (
            <Logout
              setIsAuthenticated={setIsAuthenticated}
              setMostrarLogout={setMostrarLogout}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
