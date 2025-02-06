import { useState, useMemo } from "react";

export const useReportTable = ({
  recomendations,
  interventions,
  projects,
  setSelectedIntervention,
}) => {
  // Estados para paginación
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Estados para filtros
  const [showFilters, setShowFilters] = useState(false);
  const [projectFilter, setProjectFilter] = useState([]);
  const [interventionFilter, setInterventionFilter] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [descriptionFilter, setDescriptionFilter] = useState("");
  const [fechaFilter, setFechaFilter] = useState("");
  const [followFilter, setFollowFilter] = useState("");

  // Helpers para obtener datos
  const intervencionPorId = (id_intervencion) =>
    interventions.find((e) => e.id_intervencion === id_intervencion);

  const proyectoPorId = (id_proyecto) =>
    projects.find((e) => e.id_proyecto === id_proyecto);

  const nombreProyecto = (id_proyecto) => {
    const proyecto = proyectoPorId(id_proyecto);
    return proyecto ? proyecto.nombre_proyecto : "No encontrado";
  };

  const nombreIntervencion = (id_intervencion) => {
    const intervencion = intervencionPorId(id_intervencion);
    return intervencion ? intervencion.nombre_intervencion : "No encontrado";
  };

  const isFollow = (follow) => (follow ? "Sí" : "No");

  // Opciones para los selects
  const optionProjects = useMemo(
    () =>
      projects?.map((item) => ({
        value: item.id_proyecto,
        label: item.nombre_proyecto,
      })) || [],
    [projects]
  );

  const optioninterventions = useMemo(
    () =>
      interventions
        ?.filter((item) =>
          projectFilter?.value ? item.id_proyecto === projectFilter.value : true
        )
        .map((item) => ({
          value: item.id_intervencion,
          label: item.nombre_intervencion,
        })) || [],
    [interventions, projectFilter]
  );

  // Handlers
  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const toggleFilters = () => setShowFilters(!showFilters);

  const handleProjectFilterChange = (data) => {
    setProjectFilter(data || []);
    setSelectedIntervention(null);
  };

  const handleInterventionFilterChange = (data) => {
    setInterventionFilter(data || []);
    setSelectedIntervention(null);
  };

  const limpiarFiltrados = () => {
    setProjectFilter([]);
    setInterventionFilter([]);
    setNameFilter("");
    setDescriptionFilter("");
    setFechaFilter("");
    setFollowFilter("");
  };

  // Datos filtrados
  const filteredData = useMemo(
    () =>
      recomendations.filter((item) => {
        const intervention = intervencionPorId(item.id_intervencion);
        return (
          (!projectFilter?.value ||
            intervention?.id_proyecto === projectFilter.value) &&
          (!interventionFilter?.value ||
            item.id_intervencion === interventionFilter.value) &&
          item.nombre_recomendacion
            .toLowerCase()
            .includes(nameFilter.toLowerCase()) &&
          item.descripcion_recomendacion
            .toLowerCase()
            .includes(descriptionFilter.toLowerCase()) &&
          isFollow(item.seguimiento)
            .toLowerCase()
            .includes(followFilter.toLowerCase()) &&
          item.fecha_recomendacion
            .toLowerCase()
            .includes(fechaFilter.toLowerCase())
        );
      }),
    [
      recomendations,
      projectFilter,
      interventionFilter,
      nameFilter,
      descriptionFilter,
      followFilter,
      fechaFilter,
    ]
  );

  const handleClick = (e) => {
    const taskId = parseInt(e.currentTarget.getAttribute("data-int-id"));
    const task = interventions.find((t) => t.id_intervencion === taskId);
    setSelectedIntervention(task);
  };

  return {
    // Estados
    page,
    rowsPerPage,
    showFilters,
    projectFilter,
    interventionFilter,
    fechaFilter,
    nameFilter,
    descriptionFilter,
    followFilter,

    // Helpers
    nombreProyecto,
    nombreIntervencion,
    isFollow,
    intervencionPorId,

    // Opciones
    optionProjects,
    optioninterventions,

    // Handlers
    handleChangePage,
    handleChangeRowsPerPage,
    toggleFilters,
    handleProjectFilterChange,
    handleInterventionFilterChange,
    limpiarFiltrados,
    handleClick,
    setFechaFilter,
    setNameFilter,
    setDescriptionFilter,
    setFollowFilter,

    // Datos calculados
    filteredData,
  };
};
