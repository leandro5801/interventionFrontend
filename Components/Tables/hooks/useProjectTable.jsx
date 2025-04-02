import { useState, useMemo, useCallback } from "react";
import axios from "axios";

export const useProjectTable = ({
  projects,
  setProjects,
  consultores,
  clientes,
  interventions,
}) => {
  // Estados principales
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editIIdx, setEditIIdx] = useState(-1);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");
  const [error, setError] = useState(null);
  const [openDialogAdvertencia, setOpenDialogAdvertencia] = useState(false);

  // Estados de filtros
  const [nameFilter, setNameFilter] = useState("");
  const [objetivoFilter, setObjetivoFilter] = useState("");
  const [clienteFilter, setClienteFilter] = useState(null);
  const [consultoresFilter, setConsultoresFilter] = useState(null);
  const [typeProjectFilter, setTypeProjectFilter] = useState("");

  // Helpers memoizados
  /* const getNombre = useCallback(
    (list, id, prop) =>
      list?.find((e) => e.id === id)?.[prop] || "No encontrado",
    []
  ); */
  const handleTypeProjectFilterChange = useCallback(
    (data) => {
      console.log(data);

      data ? setTypeProjectFilter(data.value) : setTypeProjectFilter("");
    },
    [data]
  );

  const nombreCliente = useCallback(
    (id_cliente) => {
      const cliente = clientes.find(
        (cliente) => cliente.id_cliente === id_cliente
      );
      return cliente ? cliente.nombre_cliente : "no se encontro el nombre";
    },
    [clientes]
  );

  const nombreConsultor = useCallback(
    (id_consultor) => {
      const consultor = consultores.find(
        (consultor) => consultor.id_consultor === id_consultor
      );
      return consultor
        ? consultor.nombre_consultor
        : "no se encontro el nombre";
    },
    [consultores]
  );

  const vinculado = useCallback(
    (id_proyecto) =>
      interventions?.some((dato) => dato.id_proyecto === id_proyecto),
    [interventions]
  );
  const tipos_proyecto = useMemo(() => {
    return [
      ...new Set(
        projects
          .filter((project) => project.tipo_proyecto)
          .map((project) => project.tipo_proyecto)
      ),
    ]?.map((type) => ({
      label: type,
      value: type,
    }));
  }, [projects]);
  // Opciones de filtros memoizadas
  const filterOptions = useMemo(
    () => ({
      consultores:
        consultores?.map((item) => ({
          value: item.id_consultor,
          label: item.nombre_consultor,
        })) || [],
      clientes:
        clientes?.map((item) => ({
          value: item.id_cliente,
          label: item.nombre_cliente,
        })) || [],
      /* tipos_proyectos:
        [
          ...new Set(
            projects
              .filter((project) => project.tipo_proyecto?.length !== 0)
              .map((project) => project.tipo_proyecto)
          ),
        ]?.map((type) => ({
          label: type,
          value: type,
        })) || [], */
    }),
    [consultores, clientes /* projects */]
  );

  console.log(tipos_proyecto);

  // Handlers de paginación
  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  // Handlers de filtros
  const handleFilterChange = (setter) => (data) => {
    setter(data);
    setPage(0);
  };

  const limpiarFiltrados = useCallback(() => {
    setNameFilter("");
    setObjetivoFilter("");
    setClienteFilter(null);
    setConsultoresFilter(null);
  }, []);

  // Datos filtrados
  const filteredData = projects.filter((item) => {
    return (
      /* item.nombre_proyecto
            .toLowerCase()
            .includes(nameFilter.toLowerCase()) &&
          item.objetivos
            .toLowerCase()
            .includes(objetivoFilter.toLowerCase()) && */
      (!clienteFilter?.value || item.id_cliente === clienteFilter.value) &&
      (!consultoresFilter?.value ||
        item.consultores_asignados_id?.includes(consultoresFilter.value)) &&
      (typeProjectFilter.length === 0 ||
        item.tipo_proyecto === typeProjectFilter)
    );
  });

  console.log(filteredData);

  // Gestión de eliminación
  const handleDelete = useCallback(
    async (id) => {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/proyecto/${id}`
        );
        if (response.status === 200) {
          const newData = projects.filter(
            (proyecto) => proyecto.id_proyecto !== id
          );
          setProjects(newData);
          setPage(Math.min(page, Math.ceil(newData.length / rowsPerPage) - 1));
          setOpen(false);
        }
      } catch (err) {
        console.error(err);
        setError("Error al eliminar el proyecto");
      }
    },
    [projects, setProjects, page, rowsPerPage]
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

  // Gestión de edición
  const proyectoUpdate = useCallback(
    (updatedRow) => {
      const newData = [...projects];
      if (editIIdx > -1) newData[editIIdx] = updatedRow;
      setProjects(newData);
      setEditIIdx(-1);
    },
    [editIIdx, projects, setProjects]
  );

  return {
    // Estados
    page,
    rowsPerPage,
    dialogOpen,
    setOpenDialogAdvertencia,
    editIIdx,

    open,
    data,
    error,
    openDialogAdvertencia,
    nameFilter,
    objetivoFilter,
    clienteFilter,
    consultoresFilter,
    filteredData,
    tipos_proyecto,

    // Helpers
    nombreCliente,
    nombreConsultor,
    vinculado,

    // Opciones
    filterOptions,

    // Handlers
    handleChangePage,
    handleChangeRowsPerPage,
    handleTypeProjectFilterChange,
    limpiarFiltrados,
    setDialogOpen,
    setEditIIdx,
    handleDelete,
    openConfirmation,
    handleClose,
    handleCloseDialogAdvertencia,
    proyectoUpdate,
    handleCancelI,
    handleSaveI,

    // Setters de filtros
    setNameFilter,
    setObjetivoFilter,
    setClienteFilter: handleFilterChange(setClienteFilter),
    setConsultoresFilter: handleFilterChange(setConsultoresFilter),
  };
};
