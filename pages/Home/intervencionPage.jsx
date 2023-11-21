import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import styles from "../../styles/Home.module.css";
import InterventionTable from "../../Components/Tables/InterventionTable";

import datosintervenciones from "../../public/datosintervenciones.json";
import datosProyectos from "../../public/datosProyectos.json";
import datosEmpresas from "../../public/datosEmpresas.json";

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
          "Hubo un problema al obtener los datos. Por favor, inténtalo de nuevo."
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
          "Hubo un problema al obtener los datos. Por favor, inténtalo de nuevo."
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
          "Hubo un problema al obtener los datos. Por favor, inténtalo de nuevo."
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
          "Hubo un problema al obtener los datos. Por favor, inténtalo de nuevo."
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
          "Hubo un problema al obtener los datos. Por favor, inténtalo de nuevo."
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
    fetchEmpresa();
    fetchUeb();
    fetchDireccion();
    fetchArea();
    fetchTrabajador();
    fetchIntervention();
    fetchProyecto();
    fetchConsultor();
  }, []);
  return (
    <div className={styles.title}>
      <h3 className={styles.tituloH3}> Intervenciones</h3>
      <InterventionTable
        interventions={interventions}
        setInterventions={setInterventions}
        projects={projects}
        empresas={empresas}
        uebs={uebs}
        direcciones={direcciones}
        areas={areas}
        trabajadores={trabajadores}
        consultores={consultores}
      />
    </div>
  );
}
