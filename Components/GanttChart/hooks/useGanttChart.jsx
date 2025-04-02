// useGanttChart.js
import { useState, useMemo, useCallback } from "react";

export default function useGanttChart({
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
}) {
  const [timeRange, setTimeRange] = useState({
    fromSelectMonth: 11,
    fromSelectYear: "2023",
    toSelectMonth: 11,
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

  return {
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
    setInterventions,
    setOpen,
  };
}
