import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import styles from "../../styles/Home.module.css";
import RecomendationTable from "../../Components/Tables/RecomendationTable";

import datosintervenciones from "../../public/datosintervenciones.json";
import datosProyectos from "../../public/datosProyectos.json";
export default function RecomendacionPage() {
  const [interventions, setInterventions] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [consultores, setConsultores] = useState([]);
  const [clasificaciones, setClasificaciones] = useState([]);
  const [projects, setProjects] = useState([]);
  
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

    //usuario autenticado
    const [user, setUser] = useState(null);
    let consultorAutenticado = {};
    //recomendaciones filtradas
    let filtredRecomendations = [];

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
    async function fetchConsultor() {
      setCargando(true);
      try {
        const response = await axios.get("http://localhost:3000/api/consultor");
        setConsultores(response.data);
      } catch (error) {
        setError(
          "Hubo un problema al obtener los datos. Por favor, inténtalo de nuevo."
        );
        console.error(error);
      } finally {
        setCargando(false);
      }
    }
    async function fetchClasificacion() {
      setCargando(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/clasificacion"
        );
        setClasificaciones(response.data);
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
    fetchConsultor();
    fetchClasificacion();
  }, []);

  consultorAutenticado = consultores.find(
    (i) => i.id_usuario === user.id_usuario
  );

  if (user && user.id_rol === 2) {
    filtredRecomendations = recomendations.filter(
      (i) => i.id_consultor === consultorAutenticado.id_consultor
    );
  } else if(user && user.id_rol === 3){
    filtredRecomendations=recomendations;
  }

  return (
    <div className={styles.title}>
      <h3> Recomendaciones</h3>
      <RecomendationTable
        interventions={interventions}
        recomendations={filtredRecomendations}
        setRecomendations={setRecomendations}
        projects={projects}
        consultores={consultores}
        consultor={consultorAutenticado}
        clasificaciones={clasificaciones}
        cargando={cargando}
      />
    </div>
  );
}
