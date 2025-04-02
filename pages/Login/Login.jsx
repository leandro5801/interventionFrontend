import React, { useState } from "react";
import Head from "next/head";
import Swal from "sweetalert2";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import { UserContext } from "../../contexts/user/UserContext";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";

import { Input, InputAdornment, Button, TextField } from "@mui/material";

import axios from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";
import useLocalStorage from "../../helpers/useLocalStorage";
import { SessionContext } from "../../contexts/session/SessionContext";

const Login = () => {
  const [credentials, setCredentials] = useState({
    nombre_usuario: "",
    contraseña: "",
  });
  const { set } = useLocalStorage();
  //  const [usuario, setUsuario] = useState();
  // const { user, setUser, fetchSession } = useContext(UserContext);
  const { user, changeUser } = useContext(UserContext);
  const { fetchSession } = useContext(SessionContext);
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
        //para guardar el token en las cookies del navegador
        document.cookie = `access_token=${response.data.access_token};  path=/`;
        set("access_token", response.data.access_token);
        console.log(response.data.user);

        changeUser(response.data.user);

        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            if (
              response.data.user &&
              (response.data.user.id_rol === 2 ||
                response.data.user.id_rol === 3)
            ) {
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
        <div>
          <h4 style={{ color: "black" }}>Sistema de autenticación</h4>
        </div>

        <form onSubmit={handleLogin} id="form_login">
          <TextField
            className={styles.inputLogin}
            // autoComplete="off"
            sx={{
              marginTop: "12px",
              // backgroundColor: "black",
              "& .MuiInputBase-root": {
                backgroundColor: "#fff",
                color: "#000",
                border: "1px solid #888",
                "&:hover": {
                  //backgroundColor: "#f0f0f0",
                  border: "1px solid #000",
                },
                "&.Mui-focused": {
                  //backgroundColor: "#e0e0e0",
                  border: "1px #444",
                },
                "input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 30px #fff inset", // Change the background color
                  WebkitTextFillColor: "#000", // Change the text color
                },

                "&.MuiInputBase-filled": {
                  // Estilos para cuando el campo está lleno
                  backgroundColor: "#d3d3d3",
                },
              },
              "& .MuiInputAdornment-root": {
                color: "#000",
              },
            }}
            id="nombre_usuario"
            type="text"
            name="nombre_usuario"
            value={credentials.nombre_usuario}
            placeholder="Nombre del usuario"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" style={{ color: "#575252" }}>
                  <PersonIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            onChange={handleChange}
          />
          <TextField
            style={{
              marginTop: "12px",
            }}
            sx={{
              marginTop: "12px",
              // backgroundColor: "black",
              "& .MuiInputBase-root": {
                backgroundColor: "#fff",
                color: "#000",
                border: "1px solid #888",
                "&:hover": {
                  //backgroundColor: "#f0f0f0",
                  border: "1px solid #000",
                },
                "&.Mui-focused": {
                  border: "1px #444",
                  //backgroundColor: "#e0e0e0",
                },
                "input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 30px #fff inset", // Change the background color
                  WebkitTextFillColor: "#000", // Change the text color
                },

                "&.MuiInputBase-filled": {
                  // Estilos para cuando el campo está lleno
                  backgroundColor: "#d3d3d3",
                },
              },
              "& .MuiInputAdornment-root": {
                color: "#000",
              },
            }}
            id="contraseña"
            type="password"
            name="contraseña"
            value={credentials.contraseña}
            placeholder="Contraseña"
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" style={{ color: "#575252" }}>
                  <LockIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <input
            style={{ marginTop: "12px" }}
            type="submit"
            id="input-login"
            value="Continuar"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
