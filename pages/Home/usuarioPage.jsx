import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import styles from "../../styles/Home.module.css";

import UserTable from "../../Components/Tables/UserTable";

export default function UsuarioPage() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [consultores, setConsultores] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  //usuario autenticado
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUsuario() {
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
    async function fetchCliente() {
      setCargando(true);
      try {
        const response = await axios.get('http://localhost:3000/api/cliente');
        setClientes(response.data);
      } catch (error) {
        setError('Hubo un problema al obtener los datos. Por favor, inténtalo de nuevo.');
        console.error(error);
      } finally {
        setCargando(false);
      }
    }
    async function fetchConsultor() {
      setCargando(true);
      try {
        const response = await axios.get('http://localhost:3000/api/consultor');
        setConsultores(response.data);
      } catch (error) {
        setError('Hubo un problema al obtener los datos. Por favor, inténtalo de nuevo.');
        console.error(error);
      } finally {
        setCargando(false);
      }
    }
    //cargando usuario autenticado
    async function getProfile() {
      try {
        const token = Cookies.get("access_token");
        const response = await axios.get(
          "http://localhost:3000/api/autenticacion/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data.user);
      } catch (error) {
        console.error("Error: en getProfile", error);
      }
    }
    getProfile();
    fetchUsuario();
    fetchRol();
    fetchCliente();
    fetchConsultor();
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
        user={user}
        clientes={clientes}
        consultores={consultores}
      />
    </div>
  );
}
