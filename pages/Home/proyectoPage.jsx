import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import styles from "../../styles/Home.module.css";
import ProjectTable from "../../Components/Tables/ProjectTable";

export default function ProyectoPage() {
  // datos de los proyectos
  const [projects, setProjects] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [consultores, setConsultores] = useState([]);
  const [interventions, setInterventions] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    async function fetchProyecto() {
      try {
        const response = await axios.get("http://localhost:3000/api/proyecto");
        setProjects(response.data);
      } catch (error) {
        setError(
          "Hubo un problema al obtener los datos. Por favor, inténtalo de nuevo."
        );
        console.error(error);
      } finally {
      }
    }
    async function fetchClientes() {
      try {
        const response = await axios.get("http://localhost:3000/api/cliente");
        setClientes(response.data);
      } catch (error) {
        setError(
          "Hubo un problema al obtener los datos. Por favor, inténtalo de nuevo."
        );
        console.error(error);
      } finally {
      }
    }
    async function fetchConsultores() {
      try {
        const response = await axios.get("http://localhost:3000/api/consultor");
        setConsultores(response.data);
      } catch (error) {
        setError(
          "Hubo un problema al obtener los datos. Por favor, inténtalo de nuevo."
        );
        console.error(error);
      } finally {
      }
    }
    async function fetchIntervention() {
      const response = await axios.get(
        "http://localhost:3000/api/intervencion"
      );
      setInterventions(response.data);
    }

    fetchProyecto();
    fetchClientes();
    fetchConsultores();
    fetchIntervention();
    setCargando(false);
  }, []);

  return cargando ? null : (
    <div className={styles.title}>
      <h3> Proyectos</h3>
      <ProjectTable
        projects={projects}
        setProjects={setProjects}
        consultores={consultores}
        clientes={clientes}
        cargando={cargando}
        interventions={interventions}
      />
    </div>
  );
}
