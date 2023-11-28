import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import styles from "../../styles/Home.module.css";

import ReportTable from "../../Components/Tables/ReportTable";

export default function ReportePage() {
  const [interventions, setInterventions] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [clientes, setClientes] = useState([]);

  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  //usuario autenticado
  const [user, setUser] = useState(null);
  //datos filtrados
  let clienteAutenticado = {};
  let filtredRecomendations = [];
  let filtredInterventions = [];
  let filtredProjects = [];

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
    fetchIntervention();
    fetchRecomendacion();
    fetchProyecto();
    fetchCliente();
  }, []);

  if (user) {
    clienteAutenticado = clientes
      ? clientes.find((i) => i.id_usuario === user.id_usuario)
      : {};

    if (clienteAutenticado) {
      if (user.id_rol === 4) {
        filtredProjects = projects.filter(
          (i) => i.id_cliente === clienteAutenticado.id_cliente
        );
        filtredInterventions = interventions.filter((i) =>
          filtredProjects.some(
            (project) => project.id_proyecto === i.id_proyecto
          )
        );
        filtredRecomendations = recomendations.filter((i) =>
          filtredInterventions.some(
            (intervention) => intervention.id_intervencion === i.id_intervencion
          )
        );
      }
    } else if (user.id_rol === 3) {
      filtredRecomendations = recomendations;
      filtredProjects = projects;
      filtredInterventions = interventions;
    }
  }
  return (
    <div className={styles.title}>
      <h3> Reportes</h3>
      <ReportTable
        interventions={filtredInterventions}
        recomendations={filtredRecomendations}
        setRecomendations={setRecomendations}
        projects={filtredProjects}
      />
    </div>
  );
}
