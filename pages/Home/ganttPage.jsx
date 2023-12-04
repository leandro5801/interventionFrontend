import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import styles from "../../styles/Home.module.css";
import GanttChart from "../../Components/GanttChart/GanttChart";
import RecomendationTableGantt from "../../Components/Tables/RecomTableGantt";

import Dialog from "../../Components/Forms/Dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-grid-system";
import { Card } from "react-bootstrap";

export default function GanttPage() {
  //para retornar el nombre de y no el id
  const uebPorId = (idUeb) => {
    const ueb = uebs.find((e) => e.idUeb === idUeb);
    if (!ueb) {
      console.error(`No se encontró ninguna UEB con idUeb: ${idUeb}`);
      return;
    }
    return ueb;
  };
  const direccionPorId = (idDireccion) => {
    const direccion = direcciones.find((e) => e.idDireccion === idDireccion);
    if (!direccion) {
      console.error(
        `No se encontró ninguna direccion con idUeb: ${idDireccion}`
      );
      return;
    }
    return direccion;
  };
  const areaPorId = (idArea) => {
    const area = areas.find((e) => e.idArea === idArea);
    return area;
  };
  const nombreEmpresa = (idEmpresa) => {
    const empresa = empresas.find((e) => e.idEmpresa === idEmpresa);
    const name = empresa ? empresa.nombreEmpresa : "no se encontro el nombre";
    return name;
  };
  const nombreUeb = (idUeb) => {
    const ueb = uebs.find((e) => e.idUeb === idUeb);
    const name = ueb ? ueb.nombreUeb : "no se encontro el nombre";
    return name;
  };
  const nombreDireccion = (idDireccion) => {
    const direccion = direcciones.find((e) => e.idDireccion === idDireccion);
    const name = direccion
      ? direccion.nombreDireccion
      : "no se encontro el nombre";
    return name;
  };
  const nombreArea = (idArea) => {
    const area = areas.find((e) => e.idArea === idArea);
    const name = area ? area.nombreArea : "no se encontro el nombre";
    return name;
  };
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
  const nombreProyecto = (id_proyecto) => {
    const proyecto = projects.find(
      (proyecto) => proyecto.id_proyecto === id_proyecto
    );
    const name = proyecto
      ? proyecto.nombre_proyecto
      : "no se encontro el nombre";
    return name;
  };

  // datos de las intervenciones
  const [interventions, setInterventions] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  //Para cuando selecciono una intervencion en el gantt se muestren sus datos
  const [selectedIntervention, setSelectedIntervention] = useState(null);
  const [open, setOpen] = useState(false);

  // Para editar una intervencion desde la tabla
  const [isIEditing, setIsIEditing] = useState(false);

  const handleSaveI = (newData) => {
    setIsIEditing(false);
  };
  const handleCancelI = () => {
    setIsIEditing(false);
  };

  const interventionUpdate = (updatedRow) => {
    // Actualiza el estado de los datos en la tabla
    setSelectedIntervention(updatedRow);
    //  const intervenciones = interventions.filter((i)=> i === updatedRow.id)
    setInterventions((prevData) =>
      prevData.map((item) => (item.id === updatedRow.id ? updatedRow : item))
    );
  };

  //Para que se muestren las recomendaciones de una intervencion seleccionada
  const [tableRData, setTableRData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [uebs, setUebs] = useState([]);
  const [direcciones, setDirecciones] = useState([]);
  const [areas, setAreas] = useState([]);
  const [trabajadores, setTrabajadores] = useState([]);
  const [clasificaciones, setClasificaciones] = useState([]);
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
    async function fetchRecomendacion() {
      const response = await axios.get(
        "http://localhost:3000/api/recomendacion"
      );
      setRecomendations(response.data);
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

    fetchEmpresa();
    fetchUeb();
    fetchDireccion();
    fetchArea();
    fetchTrabajador();
    fetchIntervention();
    fetchRecomendacion();
    fetchClasificacion();
    fetchProyecto();
    fetchConsultor();
  }, []);

  if (user && consultores) {
    consultorAutenticado = consultores.find(
      (i) => i.id_usuario === user.id_usuario
    );
    if (consultorAutenticado) {
      if (user.id_rol === 2) {
        filtredInterventions = interventions.filter(
          (i) => i.id_consultor === consultorAutenticado.id_consultor
        );
        filtredProjects = projects.filter((i) =>
          i.consultores_asignados_id.includes(consultorAutenticado.id_consultor)
        );
      } else if (user.id_rol === 3) {
        filtredInterventions = interventions;
        filtredProjects = projects;
      }
    }
  }

  return (
    <div className={styles.title}>
      <h3 className={styles.tituloH3}>Diagrama de Gantt</h3>
      <div>
        <GanttChart
          selectedIntervention={selectedIntervention}
          setSelectedIntervention={setSelectedIntervention}
          interventions={filtredInterventions}
          setInterventions={setInterventions}
          setOpen={setOpen}
          recomendations={recomendations}
          setTableRData={setTableRData}
          projects={filtredProjects}
          empresas={empresas}
          uebs={uebs}
          direcciones={direcciones}
          areas={areas}
          trabajadores={trabajadores}
          consultores={consultores}
          nombreTrabajador={nombreTrabajador}
          areaPorId={areaPorId}
          direccionPorId={direccionPorId}
          uebPorId={uebPorId}
        />
      </div>
      {/* datos de una intervencion seleccionada */}
      {/* Datos de una intervencion */}

      <div>
        {selectedIntervention && (
          <>
            {/* Datos de la intervencion seleccionada */}

            <div style={{ padding: "10px" }}>
              <h4>Datos de la intervencion</h4>
            </div>

            <Container key={selectedIntervention.id_intervencion}>
              <Card style={{ width: "50rem" }}>
                <Card.Body>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <Card.Title>
                        Nombre de la Intervención:{" "}
                        {selectedIntervention.nombre_intervencion}
                      </Card.Title>
                      <Card.Text>
                        Descripción: {selectedIntervention.descripcion}
                      </Card.Text>
                    </div>
                    <div>
                      <Card.Text>
                        Consultor:{" "}
                        {nombreConsultor(selectedIntervention.id_consultor)}
                      </Card.Text>
                      <Card.Text>
                        Trabajador:{" "}
                        {nombreTrabajador(selectedIntervention.id_trabajador)}
                      </Card.Text>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Container>

            {/* Datos de Recomendaciones */}
            <RecomendationTableGantt
              tableRData={tableRData}
              setTableRData={setTableRData}
              recomendations={recomendations}
              setRecomendations={setRecomendations}
              selectedIntervention={selectedIntervention}
              nombreConsultor={nombreConsultor}
              clasificaciones={clasificaciones}
            />

            {/* <RecomendationTable
                    recomendations={recomendations}
                    setTableRData={setTableRData}
                    tableRData={tableRData}
                    setRecomendations={setRecomendations}
                    selectedIntervention={selectedIntervention}
                  /> */}
          </>
        )}

        {/* Fin del mostrado de Datos de una intervencion */}
      </div>

      {/* <Dialog open={open} onClose={() => {
                setOpen(false);
              }}>
          <Burbuja
          intervention={selectedIntervention}
          />
        </Dialog> */}
    </div>
  );
}
