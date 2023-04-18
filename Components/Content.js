import React from "react";
import styles from "../styles/Home.module.css";
import GanttChart from "../Components/GanttChart/GanttChart";

import { client } from "../utils/fetchWrapper";
import { useState, useEffect } from "react";

function Content({ selectedUeb, selectedStructure, selectedArea }) {
  const [tasks, setTasks] = useState(null);
  useEffect(() => {
    client("datosintervenciones.json").then(
      (datosintervenciones) => {
        setTasks(datosintervenciones?.tasks);
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

  return (
    <div className={styles.contenetcontainer}>
      {/* Diagrama de Gantt  */}
      <div className={styles.contentwrapper}>
        <GanttChart
          selectedUeb={selectedUeb}
          selectedStructure={selectedStructure}
          selectedArea={selectedArea}
        />
      </div>

      {/* Tabla de intervenciones */}

      <div className={styles.contentwrapper}>
        <div className={styles.divTable}>
          <h2>Intervenciones</h2>
          <table className={styles.table}>
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
              {filteredTasks &&
                filteredTasks.map((tsk, i) => (
                  <tr key={tsk.id} className={styles.trStyle}>
                    <td className={styles.tdStyle}>{tsk.name}</td>
                    <td className={styles.tdStyle}>{tsk.description}</td>
                    <td className={styles.tdStyle}>{tsk.process}</td>
                    <td className={styles.tdStyle}>{tsk.ueb}</td>
                    <td className={styles.tdStyle}>{tsk.structure}</td>
                    <td className={styles.tdStyle}>{tsk.area}</td>
                    <td className={styles.tdStyle}>{tsk.consultor}</td>
                    <td className={styles.tdStyle}>{tsk.worker}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Fin de la tabla  */}
    </div>
  );
}

export default Content;
