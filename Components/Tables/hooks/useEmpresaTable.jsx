import { useState, useCallback, useMemo } from "react";
import axios from "axios";

export const useEmpresaTable = ({ empresas, setEmpresas, uebs }) => {
  // Estados
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [nameFilter, setNameFilter] = useState("");
  const [editIIdx, setEditIIdx] = useState(-1);
  const [openDialogAdvertencia, setOpenDialogAdvertencia] = useState(false);
  const [error, setError] = useState(null);

  // Filtrado y paginación
  const filteredData = useMemo(
    () =>
      empresas.filter((empresa) =>
        empresa.nombre_empresa?.toLowerCase().includes(nameFilter.toLowerCase())
      ),
    [empresas, nameFilter]
  );

  const paginatedData = useMemo(
    () =>
      filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredData, page, rowsPerPage]
  );

  // Handlers
  const handleChangePage = useCallback((_, newPage) => setPage(newPage), []);

  const handleChangeRowsPerPage = useCallback((e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  }, []);

  const toggleFilters = useCallback(() => {
    setShowFilters((prev) => !prev);
    setNameFilter("");
  }, []);

  const vinculado = useCallback(
    (id_empresa) => uebs.some((ueb) => ueb.id_empresa === id_empresa),
    [uebs]
  );

  const handleDelete = useCallback(
    async (id) => {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/empresa/${id}`
        );
        if (response.status === 200) {
          const newData = empresas.filter(
            (empresa) => empresa.id_empresa !== id
          );
          setEmpresas(newData);
          setPage(Math.min(page, Math.ceil(newData.length / rowsPerPage) - 1));
          setOpen(false);
        }
      } catch (err) {
        console.error(err);
        setError("Error al eliminar la empresa");
      }
    },
    [empresas, setEmpresas, page, rowsPerPage]
  );

  const openConfirmation = useCallback((id) => {
    setOpen(true);
    setData(id);
  }, []);

  const empresaUpdate = useCallback(
    (updatedRow) => {
      const newData = [...empresas];
      if (editIIdx > -1) newData[editIIdx] = updatedRow;
      setEmpresas(newData);
      setEditIIdx(-1);
    },
    [editIIdx, empresas, setEmpresas]
  );
  const handleCancelI = useCallback(() => setEditIIdx(-1), []);
  return {
    // Estados
    page,
    rowsPerPage,
    open,
    data,
    dialogOpen,
    showFilters,
    nameFilter,
    editIIdx,
    openDialogAdvertencia,
    error,
    filteredData,
    paginatedData,

    // Handlers
    setDialogOpen,
    setEditIIdx,
    setOpenDialogAdvertencia,
    handleChangePage,
    handleChangeRowsPerPage,
    setNameFilter,
    handleDelete,
    openConfirmation,
    empresaUpdate,
    vinculado,
    handleCancelI,

    // Acciones
    handleClose: useCallback(() => setOpen(false), []),
    handleCloseForm: useCallback(() => setDialogOpen(false), []),
    handleCloseDialogAdvertencia: useCallback(
      () => setOpenDialogAdvertencia(false),
      []
    ),
  };
};
