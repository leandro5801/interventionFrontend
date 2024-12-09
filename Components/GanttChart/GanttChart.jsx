import { useState, useEffect } from "react";
import Select from "react-select";
import { customStyles } from "../../styles/SelectFilterStyles";

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
import { Button, Input, InputAdornment, TextField } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";

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
  projects,
  empresas,
  uebs,
  direcciones,
  areas,
  trabajadores,
  consultores,
  setOpen,
  nombreTrabajador,
  areaPorId,
  direccionPorId,
  uebPorId,
}) {
  const [timeRange, setTimeRange] = useState({
    fromSelectMonth: 11,
    fromSelectYear: "2023",
    toSelectMonth: 11,
    toSelectYear: "2025",
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
  const [structureFilter, setStructureFilter] = useState([]);
  const [areaFilter, setAreaFilter] = useState("");
  const [consultorFilter, setConsultorFilter] = useState([]);
  const [workerFilter, setWorkerFilter] = useState("");
  const [startFilter, setStartFilter] = useState("");

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleDescriptionFilterChange = (event) => {
    setDescriptionFilter(event.target.value);
  };

  const handleStructureFilterChange = (data) => {
    data ? setStructureFilter(data) : setStructureFilter([]);
  };

  const handleAreaFilterChange = (data) => {
    data ? setAreaFilter(data) : setAreaFilter([]);
  };
  const handleConsultorFilterChange = (data) => {
    data ? setConsultorFilter(data) : setConsultorFilter([]);
  };

  const handleWorkerFilterChange = (event) => {
    setWorkerFilter(event.target.value);
  };
  const handleStartFilterChange = (event) => {
    setStartFilter(event.target.value);
  };
  const handleProjectFilterChange = (data) => {
    data ? setProjectFilter(data) : setProjectFilter([]);
  };
  const handleEmpresaFilterChange = (data) => {
    data ? setEmpresaFilter(data) : setEmpresaFilter([]);
  };
  const handleUebFilterChange = (data) => {
    data ? setUebFilter(data) : setUebFilter([]);
  };

  const limpiarFiltrados = () => {
    setProjectFilter([]);
    setEmpresaFilter([]);
    setUebFilter([]);
    setStructureFilter([]);
    setAreaFilter([]);
    setConsultorFilter([]);
    setStartFilter("");
    setNameFilter("");
    setDescriptionFilter("");
    setWorkerFilter("");
  };
  //para los select de proyecto, empresa etc
  const [projectFilter, setProjectFilter] = useState([]);
  const [empresaFilter, setEmpresaFilter] = useState([]);
  const [uebFilter, setUebFilter] = useState([]);

  const optionConsultores =
    consultores &&
    consultores.map((item) => ({
      value: item.id_consultor,
      label: item.nombre_consultor,
    }));
  const optionProjects =
    projects &&
    projects.map((item) => ({
      value: item.id_proyecto,
      label: item.nombre_proyecto,
    }));
  const optionEmpresas =
    empresas &&
    empresas.map((item) => ({
      value: item.id_empresa,
      label: item.nombre_empresa,
    }));

  const optionUebs =
    uebs &&
    uebs
      .filter((item) =>
        empresaFilter && empresaFilter.value
          ? item.id_empresa === empresaFilter.value
          : true
      )
      .map((item) => ({
        value: item.id_ueb,
        label: item.nombre_ueb,
      }));

  const optionDirecciones =
    direcciones &&
    direcciones
      .filter((item) =>
        uebFilter && uebFilter.value ? item.id_ueb === uebFilter.value : true
      )
      .map((item) => ({
        value: item.id_direccion,
        label: item.nombre_direccion,
      }));

  const optionAreas =
    areas &&
    areas
      .filter((item) =>
        structureFilter && structureFilter.value
          ? item.id_direccion === structureFilter.value
          : true
      )
      .map((item) => ({
        value: item.id_area,
        label: item.nombre_area,
      }));
  //-----------------------------------------------

  const filteredData = interventions.filter(
    (item) =>
      (projectFilter.length === 0 ||
        item.id_proyecto === projectFilter.value) &&
      (empresaFilter.length === 0 ||
        uebPorId(direccionPorId(areaPorId(item.id_area).id_direccion).id_ueb)
          .id_empresa === empresaFilter.value) &&
      (uebFilter.length === 0 ||
        direccionPorId(areaPorId(item.id_area).id_direccion).id_ueb ===
          uebFilter.value) &&
      (structureFilter.length === 0 ||
        areaPorId(item.id_area).id_direccion === structureFilter.value) &&
      (areaFilter.length === 0 || item.id_area === areaFilter.value) &&
      item.nombre_intervencion
        .toLowerCase()
        .includes(nameFilter.toLowerCase()) &&
      item.descripcion
        .toLowerCase()
        .includes(descriptionFilter.toLowerCase()) &&
      (consultorFilter.length === 0 ||
        item.id_consultor === consultorFilter.value) &&
      nombreTrabajador(item.id_trabajador)
        .toLowerCase()
        .includes(workerFilter.toLowerCase()) &&
      item.start_date.toLowerCase().includes(startFilter.toLowerCase())
  );
  return (
    <div className={styles.ganttContainer} id="gantt-container">
      <Settings>
        <div>
          <div className={styles.filterListOffOutlinedContent}>
            {showFilters ? (
              <FilterListOffOutlinedIcon
                onClick={() => {
                  toggleFilters();
                  limpiarFiltrados();
                }}
                style={{
                  width: "18px",
                  cursor: "pointer",
                }}
              />
            ) : (
              <FilterListOutlinedIcon
                onClick={toggleFilters}
                style={{ width: "18px", cursor: "pointer" }}
              />
            )}
          </div>
          <div className={styles.filtrosEstructuraContent}>
            {/* SELECCIONAR PROYECTO ETC */}
            {showFilters && (
              <Select
                styles={customStyles}
                className={styles.selectGestionesGantt}
                defaultValue={projectFilter}
                onChange={(projectFilter) => {
                  handleProjectFilterChange(projectFilter);
                }}
                options={optionProjects}
                placeholder="Proyecto"
                isClearable
              />
            )}
            {showFilters && (
              <Select
                styles={customStyles}
                className={styles.selectGestionesGantt}
                defaultValue={empresaFilter}
                onChange={(empresaFilter) => {
                  handleEmpresaFilterChange(empresaFilter);
                }}
                options={optionEmpresas}
                placeholder="Empresa"
                isClearable
              />
            )}
            {showFilters && (
              <Select
                styles={customStyles}
                className={styles.selectGestionesGantt}
                defaultValue={uebFilter}
                onChange={(uebFilter) => {
                  handleUebFilterChange(uebFilter);
                }}
                options={optionUebs}
                placeholder="Ueb"
                isClearable
              />
            )}
            {showFilters && (
              <Select
                styles={customStyles}
                className={styles.selectGestionesGantt}
                defaultValue={structureFilter}
                onChange={(structureFilter) => {
                  handleStructureFilterChange(structureFilter);
                }}
                options={optionDirecciones}
                placeholder="Dirección"
                isClearable
              />
            )}
          </div>
          <div className={styles.filtrosEstructuraContent}>
            {showFilters && (
              <Select
                styles={customStyles}
                className={styles.selectGestionesGantt}
                defaultValue={areaFilter}
                onChange={(areaFilter) => {
                  handleAreaFilterChange(areaFilter);
                }}
                options={optionAreas}
                placeholder="Área"
                isClearable
              />
            )}
            {showFilters && (
              <Select
                styles={customStyles}
                className={styles.selectGestionesGantt}
                defaultValue={consultorFilter}
                onChange={(consultorFilter) => {
                  handleConsultorFilterChange(consultorFilter);
                }}
                options={optionConsultores}
                placeholder="Consultor"
                isClearable
              />
            )}
            {showFilters && (
              <TextField
                className={styles.inputFilter}
                type="text"
                value={workerFilter}
                onChange={handleWorkerFilterChange}
                size="small"
                InputLabelProps={{
                  style: {
                    fontSize: "14px",
                    letterSpacing: "0.2px",
                    // textAlign: "center",
                    //  color: "black",
                  },
                }}
                label="Filtrar por Trabajador"
              />
            )}
            {showFilters && (
              <TextField
                className={styles.inputFilter}
                type="date"
                size="small"
                value={startFilter}
                onChange={handleStartFilterChange}
                label="Fecha"
                Input
                InputLabelProps={{
                  shrink: true, // Esto hace que la etiqueta se mantenga arriba
                }}
              />
            )}
          </div>

          <div className={styles.btnNuevoContent}>
            <Button className={styles.btn} onClick={mostrar}>
              Establecer Período
            </Button>
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
