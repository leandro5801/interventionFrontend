import { useState, useCallback, useMemo } from "react";
import axios from "axios";

export const useUebTable = ({ uebs, setUebs, empresas, direcciones }) => {
  // Estados
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [nameFilter, setNameFilter] = useState("");
  const [empresaFilter, setEmpresaFilter] = useState(null);
  const [editIIdx, setEditIIdx] = useState(-1);
  const [openDialogAdvertencia, setOpenDialogAdvertencia] = useState(false);
  const [error, setError] = useState(null);

  // Filtrado y paginación
  const filteredData = useMemo(
    () =>
      uebs.filter(
        (ueb) =>
          (empresaFilter?.value
            ? ueb.id_empresa === empresaFilter.value
            : true) &&
          ueb.nombre_ueb?.toLowerCase().includes(nameFilter.toLowerCase())
      ),
    [uebs, empresaFilter, nameFilter]
  );

  const paginatedData = useMemo(
    () =>
      filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredData, page, rowsPerPage]
  );

  // Opciones de filtro
  const optionEmpresas = useMemo(
    () =>
      empresas
        .filter((empresa) => empresa.cargar_empresa === false)
        .map((empresa) => ({
          value: empresa.id_empresa,
          label: empresa.nombre_empresa,
        })),
    [empresas]
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
    setEmpresaFilter(null);
  }, []);

  const vinculado = useCallback(
    (id_ueb) => direcciones.some((direccion) => direccion.id_ueb === id_ueb),
    [direcciones]
  );

  const handleDelete = useCallback(
    async (id) => {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/ueb/${id}`
        );
        if (response.status === 200) {
          const newData = uebs.filter((ueb) => ueb.id_ueb !== id);
          setUebs(newData);
          setPage(Math.min(page, Math.ceil(newData.length / rowsPerPage) - 1));
          setOpen(false);
        }
      } catch (err) {
        console.error(err);
        setError("Error al eliminar la UEB");
      }
    },
    [uebs, setUebs, page, rowsPerPage]
  );

  const openConfirmation = useCallback((id) => {
    setOpen(true);
    setData(id);
  }, []);

  const UebUpdate = useCallback(
    (updatedRow) => {
      const newData = [...uebs];
      if (editIIdx > -1) newData[editIIdx] = updatedRow;
      setUebs(newData);
      setEditIIdx(-1);
    },
    [editIIdx, uebs, setUebs]
  );

  const nombreEmpresa = useCallback(
    (id_empresa) =>
      empresas.find((e) => e.id_empresa === id_empresa)?.nombre_empresa ||
      "No encontrado",
    [empresas]
  );

  return {
    // Estados
    page,
    rowsPerPage,
    open,
    data,
    dialogOpen,
    showFilters,
    nameFilter,
    empresaFilter,
    editIIdx,
    openDialogAdvertencia,
    error,
    filteredData,
    paginatedData,
    optionEmpresas,

    // Handlers
    setDialogOpen,
    setEditIIdx,
    setOpenDialogAdvertencia,
    handleChangePage,
    handleChangeRowsPerPage,
    setNameFilter,
    setEmpresaFilter,
    handleDelete,
    openConfirmation,
    UebUpdate,
    vinculado,

    // Acciones
    handleClose: useCallback(() => setOpen(false), []),
    handleCloseForm: useCallback(() => setDialogOpen(false), []),
    handleCloseI: useCallback(() => setEditIIdx(-1), []),
    handleCloseDialogAdvertencia: useCallback(
      () => setOpenDialogAdvertencia(false),
      []
    ),

    // Helpers
    nombreEmpresa,
  };
};
