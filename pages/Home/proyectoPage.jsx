import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import styles from "../../styles/Home.module.css";
import ProjectTable from "../../Components/Tables/ProjectTable";

import datosProyectos from "../../public/datosProyectos.json";
import datosUsers from "../../public/datosUsuarios.json";
export default function ProyectoPage() {
  // datos de los proyectos
  const [projects, setProjects] = useState([]);
  const [clientes, setClientes] = useState([]);

  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  // datos de los usuarios
  const [users, setUsers] = useState(datosUsers?.users);
  //almacenando un listado de consultores HAY QUE CAMBIAR ESTO  
  const consultores = users.filter((user) => user.idRole === "2");
  useEffect(() => {
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
    async function fetchClientes() {
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
    fetchProyecto();
    fetchClientes();
  }, []);


  return (
    <div className={styles.title}>
      <h3> Proyectos</h3>
      <ProjectTable
        projects={projects}
        setProjects={setProjects}
        consultores={consultores}
        clientes={clientes}
        cargando={cargando}
      />
    </div>
  );
}
