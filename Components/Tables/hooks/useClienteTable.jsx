// hooks/useCliente.js
import { useState, useCallback, useMemo } from "react";
import axios from "axios";

export default function useCliente({
  clientes,
  setClientes,
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
      clientes.filter((item) =>
        item.nombre_cliente?.toLowerCase().includes(nameFilter.toLowerCase())
      ),
    [clientes, nameFilter]
  );

  const paginatedData = useMemo(
    () =>
      filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredData, page, rowsPerPage]
  );

  // Funciones de vinculación
  const vinculado = useCallback(
    (id_cliente) =>
      projects.some((proyecto) => proyecto.id_cliente === id_cliente),
    [projects]
  );

  // Operaciones asyncronas
  const handleDelete = useCallback(
    async (id) => {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/cliente/${id}`
        );
        if (response.status === 200) {
          setClientes((prev) => {
            const newDatos = prev.filter((c) => c.id_cliente !== id);
            const totalPages = Math.ceil(newDatos.length / rowsPerPage) - 1;
            if (page > totalPages) setPage(Math.max(0, totalPages));
            return newDatos;
          });
          setOpen(false);
        }
      } catch (error) {
        console.error(error);
        setError("Error al eliminar el cliente");
      }
    },
    [page, rowsPerPage, setClientes]
  );

  const openConfirmation = useCallback((data) => {
    setOpen(true);
    setData(data);
  }, []);

  // Funciones de edición
  const handleSaveI = useCallback(() => setEditIIdx(-1), []);
  const handleCancelI = useCallback(() => setEditIIdx(-1), []);
  const clienteUpdate = useCallback(
    (updatedRow) => {
      setClientes((prev) => {
        const updated = [...prev];
        if (editIIdx >= 0) updated[editIIdx] = updatedRow;
        return updated;
      });
    },
    [editIIdx, setClientes]
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
