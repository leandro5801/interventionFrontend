import { useState, useMemo, useCallback } from "react";
import axios from "axios";

export const useInterventionTable = ({
  filteredInterventions,
  interventions,
  setInterventions,
  projects,
  empresas,
  uebs,
  direcciones,
  areas,
  trabajadores,
  consultores,
  recomendations,
}) => {
  // Estados principales
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dialogCreInteOpen, setDialogCreInteOpen] = useState(false);
  const [editIIdx, setEditIIdx] = useState(-1);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");
  const [error, setError] = useState(null);
  const [openDialogAdvertencia, setOpenDialogAdvertencia] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Estados de filtros
  const [projectFilter, setProjectFilter] = useState(null);
  const [empresaFilter, setEmpresaFilter] = useState(null);
  const [uebFilter, setUebFilter] = useState(null);
  const [structureFilter, setStructureFilter] = useState(null);
  const [areaFilter, setAreaFilter] = useState(null);
  const [consultorFilter, setConsultorFilter] = useState(null);
  const [nameFilter, setNameFilter] = useState("");
  const [descriptionFilter, setDescriptionFilter] = useState("");
  const [workerFilter, setWorkerFilter] = useState("");
  const [startFilter, setStartFilter] = useState("");

  // Helpers
  const uebPorId = useCallback(
    (id_ueb) => uebs.find((e) => e.id_ueb === id_ueb),
    [uebs]
  );

  const direccionPorId = useCallback(
    (id_direccion) => direcciones.find((e) => e.id_direccion === id_direccion),
    [direcciones]
  );

  const areaPorId = useCallback(
    (id_area) => areas.find((e) => e.id_area === id_area),
    [areas]
  );

  const nombreEmpresa = useCallback(
    (id_empresa) =>
      empresas.find((e) => e.id_empresa === id_empresa)?.nombre_empresa ||
      "No encontrado",
    [empresas]
  );

  const nombreUeb = useCallback(
    (id_ueb) =>
      uebs.find((e) => e.id_ueb === id_ueb)?.nombre_ueb || "No encontrado",
    [uebs]
  );

  const nombreDireccion = useCallback(
    (id_direccion) =>
      direcciones.find((e) => e.id_direccion === id_direccion)
        ?.nombre_direccion || "No encontrado",
    [direcciones]
  );

  const nombreArea = useCallback(
    (id_area) =>
      areas.find((e) => e.id_area === id_area)?.nombre_area || "No encontrado",
    [areas]
  );

  const nombreConsultor = useCallback(
    (id_consultor) =>
      consultores.find((c) => c.id_consultor === id_consultor)
        ?.nombre_consultor || "No encontrado",
    [consultores]
  );

  const nombreTrabajador = useCallback(
    (id_trabajador) =>
      trabajadores.find((t) => t.id_trabajador === id_trabajador)
        ?.nombre_trabajador || "No encontrado",
    [trabajadores]
  );

  const nombreProyecto = useCallback(
    (id_proyecto) =>
      projects.find((p) => p.id_proyecto === id_proyecto)?.nombre_proyecto ||
      "No encontrado",
    [projects]
  );

  const vinculado = useCallback(
    (id_intervencion) =>
      recomendations.some((r) => r.id_intervencion === id_intervencion),
    [recomendations]
  );

  // Opciones de filtros
  const filterOptions = useMemo(
    () => ({
      projects: projects.map((p) => ({
        value: p.id_proyecto,
        label: p.nombre_proyecto,
      })),
      empresas: empresas.map((e) => ({
        value: e.id_empresa,
        label: e.nombre_empresa,
      })),
      uebs: uebs
        .filter(
          (u) => !empresaFilter?.value || u.id_empresa === empresaFilter.value
        )
        .map((u) => ({ value: u.id_ueb, label: u.nombre_ueb })),
      direcciones: direcciones
        .filter((d) => !uebFilter?.value || d.id_ueb === uebFilter.value)
        .map((d) => ({ value: d.id_direccion, label: d.nombre_direccion })),
      areas: areas
        .filter(
          (a) =>
            !structureFilter?.value || a.id_direccion === structureFilter.value
        )
        .map((a) => ({ value: a.id_area, label: a.nombre_area })),
      consultores: consultores.map((c) => ({
        value: c.id_consultor,
        label: c.nombre_consultor,
      })),
    }),
    [
      projects,
      empresas,
      uebs,
      direcciones,
      areas,
      consultores,
      empresaFilter,
      uebFilter,
      structureFilter,
    ]
  );

  // Handlers
  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const toggleFilters = () => setShowFilters(!showFilters);

  const limpiarFiltrados = useCallback(() => {
    setProjectFilter(null);
    setEmpresaFilter(null);
    setUebFilter(null);
    setStructureFilter(null);
    setAreaFilter(null);
    setConsultorFilter(null);
    setNameFilter("");
    setDescriptionFilter("");
    setWorkerFilter("");
    setStartFilter("");
  }, []);

  // Datos filtrados
  const filteredData = useMemo(
    () =>
      filteredInterventions.filter((item) => {
        const area = areaPorId(item.id_area);
        const direccion = direccionPorId(area?.id_direccion);
        const ueb = uebPorId(direccion?.id_ueb);

        return (
          (!projectFilter?.value || item.id_proyecto === projectFilter.value) &&
          (!empresaFilter?.value || ueb?.id_empresa === empresaFilter.value) &&
          (!uebFilter?.value || direccion?.id_ueb === uebFilter.value) &&
          (!structureFilter?.value ||
            direccion?.id_direccion === structureFilter.value) &&
          (!areaFilter?.value || item.id_area === areaFilter.value) &&
          item.nombre_intervencion
            .toLowerCase()
            .includes(nameFilter.toLowerCase()) &&
          item.descripcion
            .toLowerCase()
            .includes(descriptionFilter.toLowerCase()) &&
          (!consultorFilter?.value ||
            item.id_consultor === consultorFilter.value) &&
          nombreTrabajador(item.id_trabajador)
            .toLowerCase()
            .includes(workerFilter.toLowerCase()) &&
          item.start_date.toLowerCase().includes(startFilter.toLowerCase())
        );
      }),
    [
      filteredInterventions,
      projectFilter,
      empresaFilter,
      uebFilter,
      structureFilter,
      areaFilter,
      nameFilter,
      descriptionFilter,
      consultorFilter,
      workerFilter,
      startFilter,
    ]
  );

  // Eliminación
  const handleDelete = useCallback(
    async (id) => {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/intervencion/${id}`
        );
        if (response.status === 200) {
          const newData = filteredInterventions.filter(
            (i) => i.id_intervencion !== id
          );
          setInterventions(newData);
          setPage(Math.min(page, Math.ceil(newData.length / rowsPerPage) - 1));
          setOpen(false);
        }
      } catch (err) {
        console.error(err);
        setError("Error al eliminar la intervención");
      }
    },
    [filteredInterventions, setInterventions, page, rowsPerPage]
  );

  const openConfirmation = useCallback((id) => {
    setOpen(true);
    setData(id);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setError(null);
  }, []);

  const handleCloseDialogAdvertencia = useCallback(() => {
    setOpenDialogAdvertencia(false);
  }, []);

  const handleSaveI = useCallback(() => {
    setEditIIdx(-1);
  }, []);

  const handleCancelI = useCallback(() => {
    setEditIIdx(-1);
  }, []);

  const handleCloseInterventionForm = useCallback(() => {
    setDialogCreInteOpen(false);
  }, []);

  // Edición
  const interventionUpdate = useCallback(
    (updatedRow) => {
      const newData = [...filteredInterventions];
      if (editIIdx > -1) newData[editIIdx] = updatedRow;
      setInterventions(newData);
      setEditIIdx(-1);
    },
    [editIIdx, filteredInterventions, setInterventions]
  );

  return {
    // Estados
    page,
    rowsPerPage,
    dialogCreInteOpen,
    editIIdx,
    open,
    data,
    error,
    openDialogAdvertencia,
    showFilters,
    projectFilter,
    empresaFilter,
    uebFilter,
    structureFilter,
    areaFilter,
    consultorFilter,
    nameFilter,
    descriptionFilter,
    workerFilter,
    startFilter,
    filteredData,

    // Helpers
    nombreEmpresa,
    nombreUeb,
    nombreDireccion,
    nombreArea,
    nombreConsultor,
    nombreTrabajador,
    nombreProyecto,
    vinculado,
    areaPorId,
    uebPorId,
    direccionPorId,

    // Opciones
    filterOptions,

    // Handlers
    handleChangePage,
    handleChangeRowsPerPage,
    toggleFilters,
    limpiarFiltrados,
    setDialogCreInteOpen,
    setEditIIdx,
    handleDelete,
    openConfirmation,
    handleClose,
    handleCloseDialogAdvertencia,
    interventionUpdate,
    handleCancelI,
    handleSaveI,
    handleCloseInterventionForm,

    // Setters de filtros
    setNameFilter,
    setDescriptionFilter,
    setWorkerFilter,
    setStartFilter,
    setProjectFilter,
    setEmpresaFilter,
    setUebFilter,
    setStructureFilter,
    setAreaFilter,
    setConsultorFilter,
  };
};
