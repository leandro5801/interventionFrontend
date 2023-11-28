import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import styles from "../../styles/Home.module.css";
import InterventionTable from "../../Components/Tables/InterventionTable";

export default function IntervencionPage() {
  // datos de las intervenciones
  const [interventions, setInterventions] = useState([]);
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
  let filtredInterventions = [];
  let filtredProjects = [];

  useEffect(() => {
    async function fetchIntervention() {
      const response = await axios.get(
        "http://localhost:3000/api/intervencion"
      );
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
  }, []);

  consultorAutenticado = consultores.find(
    (i) => i.id_usuario === user.id_usuario
  );

  if (user && user.id_rol === 2) {
    filtredInterventions = interventions.filter(
      (i) => i.id_consultor === consultorAutenticado.id_consultor
    );
    filtredProjects = projects.filter(
      (i) => i.id_consultor === consultorAutenticado.id_consultor
    );
  } else if(user && user.id_rol === 3) {
    filtredInterventions=projects;
  }

  return (
    <div className={styles.title}>
      <h3 className={styles.tituloH3}> Intervenciones</h3>
      <InterventionTable
        interventions={filtredInterventions}
        setInterventions={setInterventions}
        projects={projects}
        empresas={empresas}
        uebs={uebs}
        direcciones={direcciones}
        areas={areas}
        trabajadores={trabajadores}
        consultores={consultores}
        consultor={consultorAutenticado}
      />
    </div>
  );
}
