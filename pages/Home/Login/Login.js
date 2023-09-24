import React, { useState } from "react";
import Head from "next/head";
import Swal from "sweetalert2";
import styles from "../../../styles/Home.module.css";
import Image from "next/image";

const Login = ({ setIsAuthenticated }) => {
  const adminUser = "admin";
  const adminPassword = "qwerty";

  const [user, setUser] = useState("admin");
  const [password, setPassword] = useState("qwerty");

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
            title: "¡Sesión iniciadaexitosamente!",
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

      <div className={styles.smallContainer}>
        <Image
          className={styles.image}
          src="/images/user-icon.jpg" // Ruta al icono de usuario
          alt="User Icon"
          width={50}
          height={50}
        />
        <form onSubmit={handleLogin}>
          <label htmlFor="user">Usuario</label>
          <input
            id="user"
            type="text"
            name="user"
            placeholder="admin"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="qwerty"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input style={{ marginTop: "12px" }} type="submit" value="Ingresar" />
        </form>
      </div>
    </div>
  );
};

export default Login;
