import { useState, useEffect, useMemo, useCallback } from "react";
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
import useGanttChart from "./hooks/useGanttChart";

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
  /*   const {
    timeRange,
    setTimeRange,
    mostrarPeriodo,
    mostrar,

    limpiarFiltrados,
    showFilters,
    toggleFilters,
    filteredData,
    optionConsultores,
    optionProjects,
    optionEmpresas,
    optionUebs,
    optionDirecciones,
    optionAreas,
    // Estados y handlers de filtros
    projectFilter,
    setProjectFilter,
    empresaFilter,
    setEmpresaFilter,
    uebFilter,
    setUebFilter,
    structureFilter,
    setStructureFilter,
    areaFilter,
    setAreaFilter,
    consultorFilter,
    setConsultorFilter,
    workerFilter,
    setWorkerFilter,
    startFilter,
    setStartFilter,
    nameFilter,
    setNameFilter,
    descriptionFilter,
    setDescriptionFilter,

    //handlers necesarios
    handleAreaFilterChange,
    handleConsultorFilterChange,
    handleEmpresaFilterChange,
    handleProjectFilterChange,
    handleStartFilterChange,
    handleStructureFilterChange,
    handleUebFilterChange,
    handleWorkerFilterChange,
    // Resto de props necesarias
  } = useGanttChart({
    interventions,
    setInterventions,
    consultores,
    projects,
    empresas,
    uebs,
    direcciones,
    areas,
    nombreTrabajador,
    areaPorId,
    direccionPorId,
    uebPorId,
    setOpen,
  }); */
  const [timeRange, setTimeRange] = useState({
    fromSelectMonth: 1,
    fromSelectYear: "2024",
    toSelectMonth: 6,
    toSelectYear: "2025",
  });
  const [mostrarPeriodo, setMostrarComponente] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Estados de filtrado
  const [projectFilter, setProjectFilter] = useState(null);
  const [empresaFilter, setEmpresaFilter] = useState(null);
  const [uebFilter, setUebFilter] = useState(null);
  const [structureFilter, setStructureFilter] = useState(null);
  const [areaFilter, setAreaFilter] = useState(null);
  const [consultorFilter, setConsultorFilter] = useState(null);
  const [workerFilter, setWorkerFilter] = useState("");
  const [startFilter, setStartFilter] = useState("");

  // Handlers memoizados
  const mostrar = useCallback(() => {
    setMostrarComponente((prev) => !prev);
  }, []);

  const toggleFilters = useCallback(() => {
    setShowFilters((prev) => !prev);
  }, []);

  const handleProjectFilterChange = useMemo(
    () => (data) => setProjectFilter(data || []),
    []
  );
  const handleEmpresaFilterChange = useMemo(
    () => (data) => setEmpresaFilter(data || []),
    []
  );
  const handleUebFilterChange = useMemo(
    () => (data) => setUebFilter(data || []),
    []
  );
  const handleStructureFilterChange = useMemo(
    () => (data) => setStructureFilter(data || []),
    []
  );
  const handleAreaFilterChange = useMemo(
    () => (data) => setAreaFilter(data || []),
    []
  );
  const handleConsultorFilterChange = useMemo(
    () => (data) => setConsultorFilter(data || []),
    []
  );
  const handleWorkerFilterChange = useMemo(
    () => (e) => setWorkerFilter(e.target.value),
    []
  );
  const handleStartFilterChange = useMemo(
    () => (e) => setStartFilter(e.target.value),
    []
  );

  const limpiarFiltrados = useCallback(() => {
    setProjectFilter(null);
    setEmpresaFilter(null);
    setUebFilter(null);
    setStructureFilter(null);
    setAreaFilter(null);
    setConsultorFilter(null);
    setStartFilter("");
    setWorkerFilter("");
  }, []);

  // Opciones memoizadas para selects
  const optionConsultores = useMemo(
    () =>
      consultores?.map((item) => ({
        value: item.id_consultor,
        label: item.nombre_consultor,
      })) || [],
    [consultores]
  );

  const optionProjects = useMemo(
    () =>
      projects?.map((item) => ({
        value: item.id_proyecto,
        label: item.nombre_proyecto,
      })) || [],
    [projects]
  );

  const optionEmpresas = useMemo(
    () =>
      empresas?.map((item) => ({
        value: item.id_empresa,
        label: item.nombre_empresa,
      })) || [],
    [empresas]
  );

  const optionUebs = useMemo(
    () =>
      uebs
        ?.filter((item) =>
          empresaFilter?.value ? item.id_empresa === empresaFilter.value : true
        )
        .map((item) => ({
          value: item.id_ueb,
          label: item.nombre_ueb,
        })) || [],
    [uebs, empresaFilter]
  );

  const optionDirecciones = useMemo(
    () =>
      direcciones
        ?.filter((item) =>
          uebFilter?.value ? item.id_ueb === uebFilter.value : true
        )
        .map((item) => ({
          value: item.id_direccion,
          label: item.nombre_direccion,
        })) || [],
    [direcciones, uebFilter]
  );

  const optionAreas = useMemo(
    () =>
      areas
        ?.filter((item) =>
          structureFilter?.value
            ? item.id_direccion === structureFilter.value
            : true
        )
        .map((item) => ({
          value: item.id_area,
          label: item.nombre_area,
        })) || [],
    [areas, structureFilter]
  );

  // Datos filtrados memoizados
  const filteredData = useMemo(
    () =>
      interventions.filter((item) => {
        const area = item.id_area ? areaPorId(item.id_area) : null;
        const direccion = direccionPorId(area?.id_direccion);
        const ueb = uebPorId(direccion?.id_ueb);

        return (
          (!projectFilter?.value || item.id_proyecto === projectFilter.value) &&
          (!empresaFilter?.value || ueb?.id_empresa === empresaFilter.value) &&
          (!uebFilter?.value || direccion?.id_ueb === uebFilter.value) &&
          (!structureFilter?.value ||
            direccion?.id_direccion === structureFilter.value) &&
          (!areaFilter?.value || item.id_area === areaFilter.value) &&
          (!consultorFilter?.value ||
            item.id_consultor === consultorFilter.value) &&
          nombreTrabajador(item.id_trabajador)
            .toLowerCase()
            .includes(workerFilter.toLowerCase()) &&
          (startFilter === "" ||
            item.periodos.some(
              (periodo) =>
                new Date(startFilter) >= new Date(periodo.start_date) &&
                new Date(startFilter) <= new Date(periodo.end_date)
            ))
        );
      }),
    [
      interventions,
      projectFilter,
      empresaFilter,
      uebFilter,
      structureFilter,
      areaFilter,
      consultorFilter,
      workerFilter,
      startFilter,
      nombreTrabajador,
      areaPorId,
      direccionPorId,
      uebPorId,
    ]
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
          /* selectedConsultor={selectedConsultor}
          selectedProcess={selectedProcess} */
        />
      </Grid>
    </div>
  );
}
