import { useState, useMemo, useCallback } from "react";
import axios from "axios";

export const useRecomendationTable = ({
  filtredRecomendations,
  recomendations,
  setRecomendations,
  interventions,
  projects,
  consultores,
  clasificaciones,
}) => {
  // Estados principales
  const [dialogCreRecOpen, setDialogRecOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showFilters, setShowFilters] = useState(false);
  const [editRIdx, setEditRIdx] = useState(-1);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");
  const [error, setError] = useState(null);

  // Estados de filtros
  const [projectFilter, setProjectFilter] = useState([]);
  const [interventionFilter, setInterventionFilter] = useState([]);
  const [consultorFilter, setConsultorFilter] = useState([]);
  const [classificationFilter, setClassificationFilter] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [descriptionFilter, setDescriptionFilter] = useState("");
  const [fechaFilter, setFechaFilter] = useState("");
  const [followFilter, setFollowFilter] = useState("");

  // Helpers memoizados
  const intervencionPorId = useCallback(
    (id) => interventions.find((e) => e.id_intervencion === id),
    [interventions]
  );

  const proyectoPorId = useCallback(
    (id) => projects.find((e) => e.id_proyecto === id),
    [projects]
  );

  const nombreProyecto = useCallback(
    (id_proyecto) => {
      const proyecto = projects.find(
        (proyecto) => proyecto.id_proyecto === id_proyecto
      );
      const name = proyecto
        ? proyecto.nombre_proyecto
        : "no se encontro el nombre";
      return name;
    },
    [projects]
  );

  const nombreIntervencion = useCallback(
    (id_intervencion) => {
      const intervencion = interventions.find(
        (intervencion) => intervencion.id_intervencion === id_intervencion
      );
      const name = intervencion
        ? intervencion.nombre_intervencion
        : "no se encontro el nombre";
      return name;
    },
    [interventions]
  );

  const nombreConsultor = useCallback(
    (id_consultor) => {
      const consultor = consultores.find(
        (consultor) => consultor.id_consultor === id_consultor
      );
      const name = consultor
        ? consultor.nombre_consultor
        : "no se encontro el nombre";
      return name;
    },
    [consultores]
  );

  const nombreClasificacion = useCallback(
    (id_clasificacion) => {
      const clasificacion = clasificaciones.find(
        (clasificacion) => clasificacion.id_clasificacion === id_clasificacion
      );
      const name = clasificacion
        ? clasificacion.nombre_clasificacion
        : "no se encontro el nombre";
      return name;
    },
    [clasificaciones]
  );

  const isFollow = useCallback((follow) => (follow ? "Sí" : "No"), []);

  // Opciones de filtros memoizadas
  const filterOptions = useMemo(
    () => ({
      projects:
        projects?.map((p) => ({
          value: p.id_proyecto,
          label: p.nombre_proyecto,
        })) || [],
      interventions:
        interventions
          ?.filter(
            (i) =>
              !projectFilter?.value || i.id_proyecto === projectFilter.value
          )
          .map((i) => ({
            value: i.id_intervencion,
            label: i.nombre_intervencion,
          })) || [],
      consultores:
        consultores?.map((c) => ({
          value: c.id_consultor,
          label: c.nombre_consultor,
        })) || [],
      clasificaciones:
        clasificaciones?.map((c) => ({
          value: c.id_clasificacion,
          label: c.nombre_clasificacion,
        })) || [],
    }),
    [projects, interventions, consultores, clasificaciones, projectFilter]
  );

  // Handlers de paginación
  const handleFechaFilterChange = (event) => {
    setFechaFilter(event.target.value);
  };
  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  // Handlers de filtros
  const toggleFilters = () => setShowFilters(!showFilters);

  const updateFilter = useCallback(
    (setter) => (data) => {
      setter(data || []);
      setPage(0);
    },
    []
  );

  const limpiarFiltrados = useCallback(() => {
    setProjectFilter([]);
    setInterventionFilter([]);
    setConsultorFilter([]);
    setClassificationFilter([]);
    setNameFilter("");
    setDescriptionFilter("");
    setFechaFilter("");
    setFollowFilter("");
  }, []);

  // Datos filtrados
  const filteredData = useMemo(
    () =>
      filtredRecomendations.filter((item) => {
        const intervention = intervencionPorId(item.id_intervencion);
        return (
          (!projectFilter?.value ||
            intervention?.id_proyecto === projectFilter.value) &&
          (!interventionFilter?.value ||
            item.id_intervencion === interventionFilter.value) &&
          (!consultorFilter?.value ||
            item.id_consultor === consultorFilter.value) &&
          (!classificationFilter?.value ||
            item.id_clasificacion === classificationFilter.value) &&
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
      filtredRecomendations,
      projectFilter,
      interventionFilter,
      consultorFilter,
      classificationFilter,
      nameFilter,
      descriptionFilter,
      followFilter,
      fechaFilter,
    ]
  );

  // Gestión de eliminación
  const handleDelete = useCallback(
    async (id) => {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/recomendacion/${id}`
        );
        if (response.status === 200) {
          const newData = filtredRecomendations.filter(
            (r) => r.id_recomendacion !== id
          );
          setRecomendations(newData);
          setOpen(false);
        }
      } catch (err) {
        console.error(err);
        setError("Error al eliminar la recomendación");
      }
    },
    [filtredRecomendations, setRecomendations]
  );

  const openConfirmation = useCallback((id) => {
    setOpen(true);
    setData(id);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setError(null);
  }, []);

  const handleSaveR = () => {
    setEditRIdx(-1);
  };

  const handleCancelR = () => {
    setEditRIdx(-1);
  };

  // Gestión de edición
  const recomendationUpdate = useCallback(
    (updatedRow) => {
      const newData = [...filtredRecomendations];
      if (editRIdx > -1) newData[editRIdx] = updatedRow;
      setRecomendations(newData);
      setEditRIdx(-1);
    },
    [editRIdx, filtredRecomendations, setRecomendations]
  );

  return {
    // Estados
    dialogCreRecOpen,
    setDialogRecOpen,
    page,
    rowsPerPage,
    showFilters,
    projectFilter,
    interventionFilter,
    consultorFilter,
    classificationFilter,
    nameFilter,
    descriptionFilter,
    fechaFilter,
    followFilter,
    editRIdx,
    open,
    data,
    error,

    // Helpers
    intervencionPorId,
    nombreProyecto,
    nombreIntervencion,
    nombreConsultor,
    nombreClasificacion,
    isFollow,

    // Opciones
    filterOptions,

    // Handlers
    handleCancelR,
    handleSaveR,
    handleFechaFilterChange,
    handleChangePage,
    handleChangeRowsPerPage,
    toggleFilters,
    limpiarFiltrados,
    setEditRIdx,
    handleDelete,
    openConfirmation,
    handleClose,
    recomendationUpdate,

    // Setters de filtros
    setProjectFilter: updateFilter(setProjectFilter),
    setInterventionFilter: updateFilter(setInterventionFilter),
    setConsultorFilter: updateFilter(setConsultorFilter),
    setClassificationFilter: updateFilter(setClassificationFilter),
    setNameFilter,
    setDescriptionFilter,
    setFechaFilter,
    setFollowFilter,

    // Datos
    filteredData,
  };
};
