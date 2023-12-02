import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";


import styles from "../../styles/Home.module.css";


import datosUsuarios from "../../public/datosUsuarios.json";
import ClienteTable from "../../Components/Tables/ClienteTable";

export default function ClientePage() {
  const [clientes, setClientes] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
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
    async function fetchUsuario() {
      setCargando(true);
      try {
        const response = await axios.get('http://localhost:3000/api/usuario');
        setUsers(response.data);
      } catch (error) {
        setError('Hubo un problema al obtener los datos. Por favor, inténtalo de nuevo.');
        console.error(error);
      } finally {
        setCargando(false);
      }
    }
    async function fetchProyecto() {
      setCargando(true);
      try {
        const response = await axios.get("http://localhost:3000/api/proyecto");
        setProjects(response.data);
      } catch (error) {
        setError(
          "Hubo un problema al obtener los datos. Por favor, inténtalo de nuevo."
        );
        console.error(error);
      } finally {
        setCargando(false);
      }
    }
    fetchCliente();
    fetchUsuario();
    fetchProyecto();
  }, []);

  return (
    <div className={styles.title}>
      <h3>Clientes</h3>
      <ClienteTable
        clientes={clientes}
        setClientes={setClientes}
        users={users}
        setUsers={setUsers}
        cargando={cargando}
        projects={projects}
      />
    </div>
  );
}
