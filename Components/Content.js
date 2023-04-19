import React from "react";
import styles from "../styles/Home.module.css";
import GanttChart from "../Components/GanttChart/GanttChart";

import { client } from "../utils/fetchWrapper";
import { useState, useEffect } from "react";
import InterventionTable from "./InterventionTable";

function Content({
  selectedUeb,
  selectedStructure,
  selectedArea,
  tableVisible,
  setTableVisible,
}) {
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
