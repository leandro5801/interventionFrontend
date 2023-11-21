import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import styles from "../../styles/Home.module.css";

import ReportTable from "../../Components/Tables/ReportTable";

export default function ReportePage() {
  const [interventions, setInterventions] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [projects, setProjects] = useState([]);

  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    async function fetchIntervention() {
      const response = await axios.get(
        "http://localhost:3000/api/intervencion"
      );
      setInterventions(response.data);
    }
    async function fetchRecomendacion() {
      const response = await axios.get(
        "http://localhost:3000/api/recomendacion"
      );
      setRecomendations(response.data);
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
  
    fetchIntervention();
    fetchRecomendacion();
    fetchProyecto();
  }, []);
  return (
    <div className={styles.title}>
      <h3> Reportes</h3>
      <ReportTable
        interventions={interventions}
        recomendations={recomendations}
        setRecomendations={setRecomendations}
        projects={projects}
      />
    </div>
  );
}
