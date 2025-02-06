// hooks/useDireccion.js
import { useState, useCallback, useMemo } from "react";
import axios from "axios";

export default function useDireccion({
  direcciones,
  setDirecciones,
  empresas,
  uebs,
  areas,
}) {
  // Estados
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [nameFilter, setNameFilter] = useState("");
  const [empresaFilter, setEmpresaFilter] = useState([]);
  const [uebFilter, setUebFilter] = useState([]);
  const [openDialogAdvertencia, setOpenDialogAdvertencia] = useState(false);
  const [error, setError] = useState(null);
  const [editIIdx, setEditIIdx] = useState(-1);
  const [data, setData] = useState("");

  // Helpers memoizados
  const uebPorId = useCallback(
    (id_ueb) => uebs.find((e) => e.id_ueb === id_ueb),
    [uebs]
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

  const vinculado = useCallback(
    (id_direccion) => areas.some((dato) => dato.id_direccion === id_direccion),
    [areas]
  );

  // Handlers memoizados
  const handleClose = useCallback(() => setOpen(false), []);

  const toggleFilters = useCallback(() => {
    setShowFilters((prev) => {
      if (prev) limpiarFiltrados();
      return !prev;
    });
  }, []);

  const handleChangePage = useCallback((_, newPage) => setPage(newPage), []);

  const handleChangeRowsPerPage = useCallback((e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  }, []);

  const handleNameFilterChange = useCallback(
    (e) => setNameFilter(e.target.value),
    []
  );

  const handleEmpresaFilterChange = useCallback(
    (data) => setEmpresaFilter(data || []),
    []
  );

  const handleUebFilterChange = useCallback(
    (data) => setUebFilter(data || []),
    []
  );

  const limpiarFiltrados = useCallback(() => {
    setNameFilter("");
    setEmpresaFilter([]);
    setUebFilter([]);
  }, []);

  // Filtros y opciones memoizados
  const optionEmpresas = useMemo(
    () =>
      empresas
        ?.filter((e) => !e.cargar_empresa)
        .map((e) => ({ value: e.id_empresa, label: e.nombre_empresa })) || [],
    [empresas]
  );

  const optionUebs = useMemo(
    () =>
      uebs
        ?.filter(
          (e) => !empresaFilter.value || e.id_empresa === empresaFilter.value
        )
        .map((e) => ({ value: e.id_ueb, label: e.nombre_ueb })) || [],
    [uebs, empresaFilter.value]
  );

  const filteredData = useMemo(
    () =>
      direcciones.filter(
        (item) =>
          (!empresaFilter.value ||
            uebPorId(item.id_ueb)?.id_empresa === empresaFilter.value) &&
          (!uebFilter.value || item.id_ueb === uebFilter.value) &&
          item.nombre_direccion.toLowerCase().includes(nameFilter.toLowerCase())
      ),
    [direcciones, empresaFilter.value, uebFilter.value, nameFilter, uebPorId]
  );

  const paginatedData = useMemo(
    () =>
      filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredData, page, rowsPerPage]
  );

  // Operaciones asyncronas memoizadas
  const handleDelete = useCallback(
    async (id) => {
      console.log(id);

      try {
        const response = await axios.delete(
          `http://localhost:3000/api/direccion/${id}`
        );
        if (response.status === 200) {
          setDirecciones((prev) => {
            const newDatos = prev.filter((d) => d.id_direccion !== id);
            if (page > Math.ceil(newDatos.length / rowsPerPage) - 1) {
              setPage(
                Math.max(0, Math.ceil(newDatos.length / rowsPerPage) - 1)
              );
            }
            return newDatos;
          });
        }
        setOpen(false);
      } catch (error) {
        console.error(error);
        setError("Error al eliminar la dirección");
      }
    },
    [page, rowsPerPage, setDirecciones]
  );

  const openConfirmation = useCallback((data) => {
    setOpen(true);
    setData(data);
  }, []);

  return {
    // Estados
    open,
    dialogOpen,
    showFilters,
    page,
    rowsPerPage,
    nameFilter,
    empresaFilter,
    uebFilter,
    openDialogAdvertencia,
    error,
    editIIdx,
    data,

    // Setters
    setDialogOpen,
    setOpenDialogAdvertencia,
    setEditIIdx,

    // Handlers
    handleClose,
    toggleFilters,
    handleChangePage,
    handleChangeRowsPerPage,
    handleNameFilterChange,
    handleEmpresaFilterChange,
    handleUebFilterChange,
    limpiarFiltrados,
    openConfirmation,
    handleDelete,
    handleCloseDialogAdvertencia: useCallback(
      () => setOpenDialogAdvertencia(false),
      []
    ),
    handleCloseI: useCallback(() => setEditIIdx(-1), []),
    handleCloseForm: useCallback(() => setDialogOpen(false), []),

    // Helpers
    nombreEmpresa,
    nombreUeb,
    vinculado,
    uebPorId,

    // Data memoizada
    optionEmpresas,
    optionUebs,
    filteredData,
    paginatedData,
  };
}
