import React, { useContext } from "react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import styles from "../../styles/Home.module.css";

import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { SessionContext } from "../../contexts/session/SessionContext";
import useLocalStorage from "../../helpers/useLocalStorage";

const Logout = ({ setMostrarLogout }) => {
  const { saveSession, toggleTheme, isDark } = useContext(SessionContext);
  const { remove } = useLocalStorage();
  const router = useRouter();
  const handleLogout = () => {
    Swal.fire({
      icon: "question",
      title: "Cerrar Sesión",
      text: "¿Está seguro de cerrar la sesión?",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
      customClass: {
        confirmButton: `${styles.btn} ${styles.btnConfirm}`,
        cancelButton: `${styles.btn} ${styles.btnConfirm}`,
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
          willClose: async () => {
            router.push("/Login/Login");
            const saveSessionBr = async () => {
              await saveSession();
              remove("access_token");
              /* remove("id_session");
              remove("session");
              remove("id_rol");
              remove("id_usuario"); */
              remove("font");
              remove("isDark");
            };
            await saveSessionBr();
            /*  isDark && toggleTheme();
            document.documentElement.setAttribute("data-theme", "light"); */
          },
        });
      }
      setMostrarLogout(false);
    });
  };

  useEffect(() => {
    handleLogout();
  });

  return null;
};

export default Logout;
