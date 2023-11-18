import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import styles from "../../styles/Home.module.css";

import UserTable from "../../Components/Tables/UserTable";

export default function UsuarioPage() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    async function fetchEmpresa() {
      setCargando(true);
      try {
        const response = await axios.get("http://localhost:3000/api/usuario");
        setUsers(response.data);
      } catch (error) {
        setError(
          "Hubo un problema al obtener los datos. Por favor, inténtalo de nuevo."
        );
        console.error(error);
      } finally {
        setCargando(false);
      }
    }
    async function fetchRol() {
      setCargando(true);
      try {
        const response = await axios.get("http://localhost:3000/api/rol");
        setRoles(response.data);
      } catch (error) {
        setError(
          "Hubo un problema al obtener los datos. Por favor, inténtalo de nuevo."
        );
        console.error(error);
      } finally {
        setCargando(false);
      }
    }
    fetchEmpresa();
    fetchRol();
  }, []);
  return (
    <div className={styles.title}>
      <h3> Usuarios</h3>
      <UserTable
        users={users}
        setUsers={setUsers}
        roles={roles}
        setRoles={setRoles}
        cargando={cargando}
      />
    </div>
  );
}
