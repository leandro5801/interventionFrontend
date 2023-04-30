import { useState, useEffect } from "react";

import styles from "../../styles/Home.module.css";

import Grid from "./Grid";
import Settings from "./Settings";
import Tasks from "./Tasks";
import TimeRange from "./TimeRange";
import TimeTable from "./TimeTable";
import Filter from "./Filter";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

export default function GanttChart({
  interventions,
  setInterventions,
  selectedUeb,
  selectedStructure,
  selectedArea,
  selectedIntervention,
  setSelectedIntervention,
  recomendations,
  setRecomendations,
  setTableRData,
  consultores,
  process,
}) {
  const [timeRange, setTimeRange] = useState({
    fromSelectMonth: 0,
    fromSelectYear: "2023",
    toSelectMonth: 1,
    toSelectYear: "2023",
  });

  // Para mostrar el periodo de tiempo
  const [mostrarPeriodo, setMostrarComponente] = useState(false);
  function mostrar() {
    setMostrarComponente(!mostrarPeriodo);
  }
  //para mostrar filtros por criterios en el diagrama
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  function mostrarFiltrado() {
    setMostrarFiltros(!mostrarFiltros);
    setSelectedConsultor(null);
    setSelectedProcess(null);
  }
  const [selectedConsultor, setSelectedConsultor] = useState(null);
  const [selectedProcess, setSelectedProcess] = useState(null);

  return (
    <div className={styles.ganttContainer} id="gantt-container">
      <h2> Diagrama de Gantt</h2>
      <Settings>
        <div>
          <button className={styles.btn} onClick={mostrar}>
            Establecer Período
          </button>
          {mostrarPeriodo ? (
            <TimeRange timeRange={timeRange} setTimeRange={setTimeRange} />
          ) : null}
        </div>

        <div>
          <FontAwesomeIcon
            icon={faFilter}
            onClick={mostrarFiltrado}
            className={styles.faIcon}
          />
          {mostrarFiltros ? (
            <Filter
              mostrarFiltrado={mostrarFiltrado}
              consultores={consultores}
              selectedConsultor={selectedConsultor}
              setSelectedConsultor={setSelectedConsultor}
              process={process}
              selectedProcess={selectedProcess}
              setSelectedProcess={setSelectedProcess}
              interventions={interventions}
            />
          ) : null}
        </div>
        {/* <AddTask setTasks={setTasks} /> */}
        {/* <AddTaskDuration tasks={tasks} setTaskDurations={setTaskDurations} /> */}
      </Settings>
      <Grid>
        <Tasks
          interventions={interventions}
          setInterventions={setInterventions}
          selectedUeb={selectedUeb}
          selectedStructure={selectedStructure}
          selectedArea={selectedArea}
          selectedConsultor={selectedConsultor}
          selectedProcess={selectedProcess}
          selectedIntervention={selectedIntervention}
          setSelectedIntervention={setSelectedIntervention}
          recomendations={recomendations}
          setRecomendations={setRecomendations}
          setTableRData={setTableRData}
        />
        <TimeTable
          timeRange={timeRange}
          interventions={interventions}
          setInterventions={setInterventions}
          selectedUeb={selectedUeb}
          selectedStructure={selectedStructure}
          selectedArea={selectedArea}
          selectedConsultor={selectedConsultor}
          selectedProcess={selectedProcess}
        />
      </Grid>
    </div>
  );
}
