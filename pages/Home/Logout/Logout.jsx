import React from 'react';
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import styles from "../../../styles/Home.module.css";

const Logout = ({ setIsAuthenticated, setMostrarLogout }) => {
  const handleLogout = () => {
    Swal.fire({
      icon: 'question',
      title: 'Cerrar Sesión',
      text: '¿Está seguro de cerrar la sesión?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      customClass: {
        confirmButton: `${styles.btn} ${styles.btnConfirm}`,
        cancelButton: `${styles.btn} ${styles.btnConfirm}`
      },
      buttonsStyling: false

    }).then(result => {
      if (result.value) {
        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            localStorage.setItem('is_authenticated', false);
            setIsAuthenticated(false);
            
          },
        });
      }
      setMostrarLogout(false);
    });
  };

  useEffect(() => {
    handleLogout();
  }, );

  return null;
};

export default Logout;
