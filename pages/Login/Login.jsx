import React, { useState } from "react";
import Head from "next/head";
import Swal from "sweetalert2";
import styles from "../../styles/Home.module.css";
import Image from "next/image";

import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";

import { Input, InputAdornment, Button, TextField } from "@mui/material";

import axios from "axios";
import { useRouter } from "next/router";

const Login = () => {
  const [credentials, setCredentials] = useState({
    nombre_usuario: "",
    contraseña: "",
  });
  const [user, setUser] = useState();
  const router = useRouter();

  // esto todavia no guarda ambas credenciales
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    //nuevo para conectar con backend
    try {
      const response = await axios.post(
        "http://localhost:3000/api/autenticacion/login",
        credentials
      );
      if (response.status === 200) {
        // si el usuario es correcto
        //para guardar el token en las cokies del navegador
        document.cookie = `access_token=${response.data.access_token};  path=/`;
        setUser(response.data.user);

        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            if (response.data.user && (response.data.user.id_rol === 2 || response.data.user.id_rol === 3)) {
              router.push("/Home/ganttPage");
            } else {
              router.push("/");
            }

            // Swal.fire({
            //   icon: "success",
            //   title: "¡Sesión iniciada exitosamente!",
            //   showConfirmButton: false,
            //   timer: 1500,
            // });
          },
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // throw new Error("usuario incorrecto");
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
            setCredentials({
              nombre_usuario: "",
              contraseña: "",
            });
          },
        });
      } else {
        console.error(error);
      }
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
          alt="Aica Icon"
          width={90}
          height={55}
        />
      </div>
      <div className={styles.smallContainer}>
        <div >
          <h4>Sistema de autenticación</h4>
        </div>

        <form onSubmit={handleLogin}>
          <TextField
            className={styles.inputLoguin}
            style={{ marginTop: "12px" }}
            id="nombre_usuario"
            type="text"
            name="nombre_usuario"
            value={credentials.nombre_usuario}
            placeholder="Nombre del usuario"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            onChange={handleChange}
          />
          <TextField
            style={{ marginTop: "12px" }}
            id="contraseña"
            type="password"
            name="contraseña"
            value={credentials.contraseña}
            placeholder="Contraseña"
            onChange={handleChange}
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
