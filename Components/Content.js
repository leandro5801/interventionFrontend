import React from "react";
import styles from "../styles/Home.module.css";
import GanttChart from "../Components/GanttChart/GanttChart";

import { client } from "../utils/fetchWrapper";
import { useState, useEffect } from "react";
import InterventionTable from "./InterventionTable";
import Tasks from "./GanttChart/Tasks";

function Content({
  selectedUeb,
  selectedStructure,
  selectedArea,
  tableVisible,
  setTableVisible,
}) {
  const [tasks, setTasks] = useState(null);
  const [recomendations, setRecomendations] = useState(null);
  useEffect(() => {
    client("datosintervenciones.json").then(
      (datosintervenciones) => {
        setTasks(datosintervenciones?.tasks);
        setRecomendations(datosintervenciones?.recomendations);
      },
      (error) => {
        console.error("Error: ", error);
      }
    );
  }, []);

  // para el filtrado
  let filteredTasks = [];

  if (tasks) {
    filteredTasks = tasks.filter(
      (task) =>
        (!selectedUeb || task.ueb === selectedUeb) &&
        (!selectedStructure || task.structure === selectedStructure) &&
        (!selectedArea || task.area === selectedArea)
    );
  }
  const [selectedIntervention, setSelectedIntervention] = useState(null);
  let filteredRecomendation = [];
  if (recomendations && selectedIntervention) {
    filteredRecomendation = recomendations.filter(
      (recomendation) =>
        recomendation.idIntervention === selectedIntervention.id
    );
  }
  return (
    <div className={styles.contenetcontainer}>
      {/* Diagrama de Gantt  */}
      <div className={styles.contentwrapper}>
        <GanttChart
          selectedUeb={selectedUeb}
          selectedStructure={selectedStructure}
          selectedArea={selectedArea}
          setSelectedIntervention={setSelectedIntervention}
        />
      </div>
      {/* Datos de una intervencion */}
      <div>
        {selectedIntervention && (
          <div>
            <div className={styles.contentwrapper}>
              <div>
                {" "}
                {/* Datod de la intervencion seleccionada */}
                <h2>Intervención</h2>
                <table>
                  <thead>
                    <tr>
                      <th className={styles.spacing}>Intervención</th>
                      <th className={styles.spacing}>Descripción</th>
                      <th className={styles.spacing}>Proceso</th>
                      <th className={styles.spacing}>UEB</th>
                      <th className={styles.spacing}>Estructura</th>
                      <th className={styles.spacing}>Área</th>
                      <th className={styles.spacing}>Consultor</th>
                      <th className={styles.spacing}>Trabajador</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      key={selectedIntervention.id}
                      className={styles.trStyle}
                    >
                      <td className={styles.tdStyle}>
                        {selectedIntervention.name}
                      </td>
                      <td className={styles.tdStyle}>
                        {selectedIntervention.description}
                      </td>
                      <td className={styles.tdStyle}>
                        {selectedIntervention.process}
                      </td>
                      <td className={styles.tdStyle}>
                        {selectedIntervention.ueb}
                      </td>
                      <td className={styles.tdStyle}>
                        {selectedIntervention.structure}
                      </td>
                      <td className={styles.tdStyle}>
                        {selectedIntervention.area}
                      </td>
                      <td className={styles.tdStyle}>
                        {selectedIntervention.consultor}
                      </td>
                      <td className={styles.tdStyle}>
                        {selectedIntervention.worker}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* <div className="card">
          <div className="card-header">
            <h2>Nombre:</h2>
            {selectedIntervention.name}
          </div>
          <div className="card-body">
          <h2>Descripción:</h2>
            <p>{selectedIntervention.description}</p>
          </div>
        </div> */}
            </div>
            <div className={styles.contentwrapper}>
              <div>
                {" "}
                {/* Datod de Recomendaciones */}
                {filteredRecomendation.length === 0 && <h2> No hay </h2>}
                <h2>Recomendaciones</h2>
                <table className={styles.table}>
                  <thead>
                    {!filteredRecomendation.length === 0 && (
                      <tr>
                        <th className={styles.spacing}>Recomendación</th>
                        <th className={styles.spacing}>Descripción</th>
                        <th className={styles.spacing}>Consultor</th>
                        <th className={styles.spacing}>Seguimiento</th>
                      </tr>
                    )}
                  </thead>
                  <tbody>
                    {filteredRecomendation &&
                      filteredRecomendation.map((recomendation, i) => (
                        <tr key={recomendation.id} className={styles.trStyle}>
                          <td className={styles.tdStyle}>
                            {recomendation.name}
                          </td>
                          <td className={styles.tdStyle}>
                            {recomendation.description}
                          </td>
                          <td className={styles.tdStyle}>
                            {recomendation.consultor}
                          </td>
                          <td className={styles.tdStyle}>
                            {recomendation.follow}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fin del mostrado de Datos de una intervencion */}

      {/* Tabla de intervenciones */}
      {tableVisible && (
        <div className={styles.contentwrapper}>
          <InterventionTable
            tableVisible={tableVisible}
            setTableVisible={setTableVisible}
            filteredTasks={filteredTasks}
          />
        </div>
      )}
      {/* Fin de la tabla  */}
    </div>
  );
}

export default Content;
