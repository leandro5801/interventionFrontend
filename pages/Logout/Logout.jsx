import React from "react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import styles from "../../styles/Home.module.css";

import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Logout = ({ setMostrarLogout }) => {
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
          willClose: () => {
            Cookies.remove("access_token");
            router.push("/Login/Login");
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
