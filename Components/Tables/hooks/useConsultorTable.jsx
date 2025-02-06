// hooks/useConsultor.js
import { useState, useCallback, useMemo } from "react";
import axios from "axios";

export default function useConsultor({
  consultores,
  setConsultores,
  cargando,
  projects,
}) {
  // Estados
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [nameFilter, setNameFilter] = useState("");
  const [openDialogAdvertencia, setOpenDialogAdvertencia] = useState(false);
  const [error, setError] = useState(null);
  const [editIIdx, setEditIIdx] = useState(-1);
  const [data, setData] = useState("");

  // Handlers memoizados
  const handleClose = useCallback(() => setOpen(false), []);
  const toggleFilters = useCallback(() => setShowFilters((prev) => !prev), []);

  const handleChangePage = useCallback((_, newPage) => setPage(newPage), []);
  const handleChangeRowsPerPage = useCallback((e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  }, []);

  const handleNameFilterChange = useCallback(
    (e) => setNameFilter(e.target.value),
    []
  );
  const limpiarFiltrados = useCallback(() => setNameFilter(""), []);

  // Datos filtrados y paginados memoizados
  const filteredData = useMemo(
    () =>
      consultores.filter((item) =>
        item.nombre_consultor.toLowerCase().includes(nameFilter.toLowerCase())
      ),
    [consultores, nameFilter]
  );

  const paginatedData = useMemo(
    () =>
      filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredData, page, rowsPerPage]
  );

  // Funciones de vinculación
  const vinculado = useCallback(
    (id_consultor) =>
      projects.some((proyecto) =>
        proyecto.consultores_asignados_id.includes(id_consultor)
      ),
    [projects]
  );

  // Operaciones asyncronas
  const handleDelete = useCallback(
    async (id) => {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/consultor/${id}`
        );
        if (response.status === 200) {
          setConsultores((prev) => {
            const newDatos = prev.filter((c) => c.id_consultor !== id);
            const totalPages = Math.ceil(newDatos.length / rowsPerPage) - 1;
            if (page > totalPages) setPage(Math.max(0, totalPages));
            return newDatos;
          });
          setOpen(false);
        }
      } catch (error) {
        console.error(error);
        setError("Error al eliminar el consultor");
      }
    },
    [page, rowsPerPage, setConsultores]
  );

  const openConfirmation = useCallback((data) => {
    setOpen(true);
    setData(data);
  }, []);

  // Funciones de edición
  const handleSaveI = useCallback(() => setEditIIdx(-1), []);
  const handleCancelI = useCallback(() => setEditIIdx(-1), []);
  const consultorUpdate = useCallback(
    (updatedRow) => {
      setConsultores((prev) => {
        const updated = [...prev];
        if (editIIdx >= 0) updated[editIIdx] = updatedRow;
        return updated;
      });
    },
    [editIIdx, setConsultores]
  );

  return {
    // Estados
    open,
    dialogOpen,
    showFilters,
    page,
    rowsPerPage,
    nameFilter,
    openDialogAdvertencia,
    error,
    editIIdx,
    data,

    // Setters
    setDialogOpen,
    setEditIIdx,
    setOpenDialogAdvertencia,

    // Handlers
    handleClose,
    toggleFilters,
    handleChangePage,
    handleChangeRowsPerPage,
    handleNameFilterChange,
    limpiarFiltrados,
    openConfirmation,
    handleDelete,
    handleSaveI,
    handleCancelI,

    // Helpers
    vinculado,

    // Data memoizada
    paginatedData,
    filteredData,
  };
}
