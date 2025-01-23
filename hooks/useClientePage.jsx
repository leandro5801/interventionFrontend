import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function useClientePage() {
  const [clientes, setClientes] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    async function fetchCliente() {
      setCargando(true);
      try {
        const response = await axios.get("http://localhost:3000/api/cliente");
        setClientes(response.data);
      } catch (error) {
        setError(
          "Hubo un problema al obtener los datos. Por favor, inténtalo de nuevo."
        );
        console.error(error);
      } finally {
        setCargando(false);
      }
    }
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

  return {
    clientes,
    setClientes,
    users,
    setUsers,
    projects,
    cargando,
    error,
  };
}
