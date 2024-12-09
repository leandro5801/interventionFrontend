import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import styles from "../../styles/Home.module.css";
import InterventionTable from "../../Components/Tables/InterventionTable";

export default function IntervencionPage() {
  // datos de las intervenciones
  const [interventions, setInterventions] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [uebs, setUebs] = useState([]);
  const [direcciones, setDirecciones] = useState([]);
  const [areas, setAreas] = useState([]);
  const [trabajadores, setTrabajadores] = useState([]);
  const [consultores, setConsultores] = useState([]);

  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  //usuario autenticado
  const [user, setUser] = useState(null);
  let consultorAutenticado = {};
  //datos filtrados
  let filteredInterventions = [];
  let filteredProjects = [];

  useEffect(() => {
    async function fetchIntervention() {
      const response = await axios.get(
        "http://localhost:3000/api/intervencion"
      );
      console.log(response.data);
      setInterventions(response.data);
    }
    async function fetchProyecto() {
      setCargando(true);
      try {
        const response = await axios.get("http://localhost:3000/api/proyecto");

        setProjects(response.data);
      } catch (error) {
        setError(
          "Hubo un problema al obtener los datos de proyectos. Por favor, inténtalo de nuevo."
        );
        console.error(error);
      } finally {
        setCargando(false);
      }
    }
    async function fetchEmpresa() {
      setCargando(true);
      try {
        const response = await axios.get("http://localhost:3000/api/empresa");
        setEmpresas(response.data);
      } catch (error) {
        setError(
          "Hubo un problema al obtener los datos de empresa. Por favor, inténtalo de nuevo."
        );
        console.error(error);
      } finally {
        setCargando(false);
      }
    }
    async function fetchUeb() {
      setCargando(true);
      try {
        const response = await axios.get("http://localhost:3000/api/ueb");
        setUebs(response.data);
      } catch (error) {
        setError(
          "Hubo un problema al obtener los datos de ueb. Por favor, inténtalo de nuevo."
        );
        console.error(error);
      } finally {
        setCargando(false);
      }
    }
    async function fetchDireccion() {
      setCargando(true);
      try {
        const response = await axios.get("http://localhost:3000/api/direccion");
        console.log(response.data);

        setDirecciones(response.data);
      } catch (error) {
        setError(
          "Hubo un problema al obtener los datos de direcciones. Por favor, inténtalo de nuevo."
        );
        console.error(error);
      } finally {
        setCargando(false);
      }
    }
    async function fetchArea() {
      setCargando(true);
      try {
        const response = await axios.get("http://localhost:3000/api/area");
        setAreas(response.data);
      } catch (error) {
        setError(
          "Hubo un problema al obtener los datos del area. Por favor, inténtalo de nuevo."
        );
        console.error(error);
      } finally {
        setCargando(false);
      }
    }
    async function fetchTrabajador() {
      setCargando(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/trabajador"
        );
        setTrabajadores(response.data);
      } catch (error) {
        setError(
          "Hubo un problema al obtener los datos del trabajador. Por favor, inténtalo de nuevo."
        );
        console.error(error);
      } finally {
        setCargando(false);
      }
    }
    async function fetchConsultor() {
      setCargando(true);
      try {
        const response = await axios.get("http://localhost:3000/api/consultor");
        setConsultores(response.data);
      } catch (error) {
        setError(
          "Hubo un problema al obtener los datos de los consultores. Por favor, inténtalo de nuevo."
        );
        console.error(error);
      } finally {
        setCargando(false);
      }
    }
    async function fetchRecomendacion() {
      const response = await axios.get(
        "http://localhost:3000/api/recomendacion"
      );
      setRecomendations(response.data);
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

    fetchEmpresa();
    fetchUeb();
    fetchDireccion();
    fetchArea();
    fetchTrabajador();
    fetchIntervention();
    fetchProyecto();
    fetchConsultor();
    fetchRecomendacion();
  }, []);

  if (user && consultores) {
    consultorAutenticado = consultores.find(
      (i) => i.id_usuario === user.id_usuario
    );
    if (consultorAutenticado) {
      if (user.id_rol === 2) {
        filteredInterventions = interventions.filter(
          (i) => i.id_consultor === consultorAutenticado.id_consultor
        );
        console.log(projects);
        console.log("entro 1");
        filteredProjects = projects.filter((i) =>
          i.consultores_asignados_id.includes(consultorAutenticado.id_consultor)
        );
        console.log(filteredInterventions);
        console.log(filteredProjects);
      } else if (user.id_rol === 3) {
        filteredInterventions = interventions;
        console.log(projects);
        console.log(filteredInterventions);
        console.log("entro 2");

        filteredProjects = projects;
      }
    }
  }

  return (
    <div className={styles.title}>
      <h3 className={styles.tituloH3}> Intervenciones</h3>
      <InterventionTable
        filteredInterventions={filteredInterventions}
        interventions={interventions}
        setInterventions={setInterventions}
        projects={filteredProjects}
        empresas={empresas}
        uebs={uebs}
        direcciones={direcciones}
        areas={areas}
        trabajadores={trabajadores}
        consultores={consultores}
        consultor={consultorAutenticado}
        recomendations={recomendations}
      />
    </div>
  );
}
