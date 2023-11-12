import React, { useState } from "react";
import Head from "next/head";
import Swal from "sweetalert2";
import styles from "../../../styles/Home.module.css";
import Image from "next/image";

import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";

import { Input, InputAdornment, Button, TextField } from "@mui/material";

const Login = ({ setIsAuthenticated }) => {
  const adminUser = "admin";
  const adminPassword = "1234";

  const [user, setUser] = useState("admin");
  const [password, setPassword] = useState("1234");

  const handleLogin = (e) => {
    e.preventDefault();

    if (user === adminUser && password === adminPassword) {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          localStorage.setItem("is_authenticated", true);
          setIsAuthenticated(true);

          Swal.fire({
            icon: "success",
            title: "¡Sesión iniciada exitosamente!",
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
    } else {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Usuario o contraseña incorrectos.",
            showConfirmButton: true,
          });
        },
      });
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Head>
        <title>Inicio de sesión</title>
        <link rel="icon" href="/images/key-icon.png" />
      </Head>
      <div className={styles.iconContainer}>
        <Image
          className={styles.image}
          src="/images/aica-ico.jpg" // Ruta al icono de usuario
          alt="User Icon"
          width={90}
          height={55}
        />
      </div>
      <div className={styles.smallContainer}>
        <div className={styles.title}>
          <h4>Sistema de autenticación</h4>
        </div>

        <form onSubmit={handleLogin}>
          <TextField
            className={styles.inputLoguin}
            style={{ marginTop: "12px" }}
            id="user"
            type="text"
            name="user"
            placeholder="Nombre del usuario"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            // value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <TextField
            style={{ marginTop: "12px" }}
            id="password"
            type="password"
            name="password"
            placeholder="Contraseña"
            // value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <input
            style={{ marginTop: "12px" }}
            type="submit"
            value="Continuar"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
