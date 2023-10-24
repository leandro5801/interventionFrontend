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
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import FilterListOffOutlinedIcon from "@mui/icons-material/FilterListOffOutlined";

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
  setOpen,
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

  //  Para el filtrado por criterios
  const [showFilters, setShowFilters] = useState(false);

  // Alternar la visibilidad de las opciones de filtrado y restablecer los valores de filtrado
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  //Para filtrar la tabla

  const [nameFilter, setNameFilter] = useState("");
  const [descriptionFilter, setDescriptionFilter] = useState("");
  const [uebFilter, setUebFilter] = useState("");
  const [structureFilter, setStructureFilter] = useState("");
  const [areaFilter, setAreaFilter] = useState("");
  const [consultorFilter, setConsultorFilter] = useState("");
  const [workerFilter, setWorkerFilter] = useState("");
  const [startFilter, setStartFilter] = useState("");

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleDescriptionFilterChange = (event) => {
    setDescriptionFilter(event.target.value);
  };
  const handleUebFilterChange = (event) => {
    setUebFilter(event.target.value);
  };
  const handleStructureFilterChange = (event) => {
    setStructureFilter(event.target.value);
  };

  const handleAreaFilterChange = (event) => {
    setAreaFilter(event.target.value);
  };
  const handleConsultorFilterChange = (event) => {
    setConsultorFilter(event.target.value);
  };

  const handleWorkerFilterChange = (event) => {
    setWorkerFilter(event.target.value);
  };
  const handleStartFilterChange = (event) => {
    setStartFilter(event.target.value);
  };

  const filteredData = interventions.filter(
    (item) =>
      item.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      item.description
        .toLowerCase()
        .includes(descriptionFilter.toLowerCase()) &&
      item.ueb.toLowerCase().includes(uebFilter.toLowerCase()) &&
      item.structure.toLowerCase().includes(structureFilter.toLowerCase()) &&
      item.area.toLowerCase().includes(areaFilter.toLowerCase()) &&
      item.consultor.toLowerCase().includes(consultorFilter.toLowerCase()) &&
      item.worker.toLowerCase().includes(workerFilter.toLowerCase()) &&
      item.start.toLowerCase().includes(startFilter.toLowerCase())
  );

  return (
    <div className={styles.ganttContainer} id="gantt-container">
      <Settings>
        <div>
          <div className={styles.filterListOffOutlinedContent}>
            {showFilters ? (
              <FilterListOffOutlinedIcon
                onClick={toggleFilters}
                style={{ width: "18px", cursor: "pointer" }}
              />
            ) : (
              <FilterListOutlinedIcon
                onClick={toggleFilters}
                style={{ width: "18px", cursor: "pointer" }}
              />
            )}
          </div>
          <div className={styles.filtrosEstructuraContent}>
            {showFilters && (
              <input
                className={styles.inputFilter}
                type="text"
                value={uebFilter}
                onChange={handleUebFilterChange}
                placeholder="Filtrar por UEB"
              />
            )}
            {showFilters && (
              <input
                className={styles.inputFilter}
                type="text"
                value={structureFilter}
                onChange={handleStructureFilterChange}
                placeholder="Filtrar por dirección"
              />
            )}
            {showFilters && (
              <input
                className={styles.inputFilter}
                type="text"
                value={areaFilter}
                onChange={handleAreaFilterChange}
                placeholder="Filtrar por área"
              />
            )}
            {showFilters && (
              <input
                className={styles.inputFilter}
                type="text"
                value={nameFilter}
                onChange={handleNameFilterChange}
                placeholder="Filtrar por intervención"
              />
            )}
          </div>
          <div className={styles.filtrosEstructuraContent}>
            {showFilters && (
              <input
                className={styles.inputFilter}
                type="text"
                value={descriptionFilter}
                onChange={handleDescriptionFilterChange}
                placeholder="Filtrar por descripción"
              />
            )}
            {showFilters && (
              <input
                className={styles.inputFilter}
                type="text"
                value={consultorFilter}
                onChange={handleConsultorFilterChange}
                placeholder="Filtrar por consultor"
              />
            )}
            {showFilters && (
              <input
                className={styles.inputFilter}
                type="text"
                value={workerFilter}
                onChange={handleWorkerFilterChange}
                placeholder="Filtrar por trabajador"
              />
            )}
            {showFilters && (
              <input
                className={styles.inputFilter}
                type="date"
                value={startFilter}
                onChange={handleStartFilterChange}
                placeholder="Filtrar por fecha"
              />
            )}
          </div>
          <div>
            <button className={styles.btn} onClick={mostrar}>
              Establecer Período
            </button>
            {mostrarPeriodo ? (
              <TimeRange timeRange={timeRange} setTimeRange={setTimeRange} />
            ) : null}
          </div>
        </div>
        {/* <AddTask setTasks={setTasks} /> */}
        {/* <AddTaskDuration tasks={tasks} setTaskDurations={setTaskDurations} /> */}
      </Settings>
      <Grid>
        <Tasks
          interventions={filteredData}
          setInterventions={setInterventions}
          selectedIntervention={selectedIntervention}
          setSelectedIntervention={setSelectedIntervention}
          setOpenDialog={setOpen}
          recomendations={recomendations}
          setRecomendations={setRecomendations}
          setTableRData={setTableRData}
        />
        <TimeTable
          timeRange={timeRange}
          interventions={filteredData}
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
