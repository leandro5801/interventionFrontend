import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import useLocalStorage from "../helpers/useLocalStorage";
export default function useReportePage() {
  const { get } = useLocalStorage();
  const [interventions, setInterventions] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [trabajadores, setTrabajadores] = useState([]);
  const [consultores, setConsultores] = useState([]);

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
        const token = get("access_token");
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
    fetchTrabajador();
    fetchConsultor();
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
  // -------------------------------------------------------------------------------
  // Datos de una intervencion
  const nombreConsultor = (id_consultor) => {
    const consultor = consultores.find(
      (consultor) => consultor.id_consultor === id_consultor
    );
    const name = consultor
      ? consultor.nombre_consultor
      : "no se encontro el nombre";
    return name;
  };
  const nombreTrabajador = (id_trabajador) => {
    const trabajador = trabajadores.find(
      (trabajador) => trabajador.id_trabajador === id_trabajador
    );
    const name = trabajador
      ? trabajador.nombre_trabajador
      : "no se encontro el nombre";
    return name;
  };
  const [selectedIntervention, setSelectedIntervention] = useState(null);
  return {
    filtredInterventions,
    filtredRecomendations,
    filtredProjects,
    interventions,
    recomendations,
    setRecomendations,
    selectedIntervention,
    setSelectedIntervention,
    cargando,
    error,
    nombreConsultor,
    nombreTrabajador,
  };
}
