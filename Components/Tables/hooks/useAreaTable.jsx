// hooks/useArea.js
import { useState, useCallback, useMemo } from "react";
import axios from "axios";

export default function useArea({
  areas,
  setAreas,
  empresas,
  uebs,
  direcciones,
  trabajadores,
  uebPorId,
  direccionPorId,
  nombreEmpresa,
  nombreUeb,
  nombreDireccion,
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
  const [structureFilter, setStructureFilter] = useState([]);
  const [openDialogAdvertencia, setOpenDialogAdvertencia] = useState(false);
  const [error, setError] = useState(null);
  const [editIIdx, setEditIIdx] = useState(-1);
  const [data, setData] = useState("");

  // Helpers memoizados
  const vinculado = useCallback(
    (id_area) => trabajadores.some((dato) => dato.id_area === id_area),
    [trabajadores]
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
  const handleStructureFilterChange = useCallback(
    (data) => setStructureFilter(data || []),
    []
  );

  const limpiarFiltrados = useCallback(() => {
    setNameFilter("");
    setEmpresaFilter([]);
    setUebFilter([]);
    setStructureFilter([]);
  }, []);

  // Filtros y opciones memoizados
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
          empresaFilter.value ? item.id_empresa === empresaFilter.value : true
        )
        .map((item) => ({ value: item.id_ueb, label: item.nombre_ueb })) || [],
    [uebs, empresaFilter.value]
  );

  const optionDirecciones = useMemo(
    () =>
      direcciones
        ?.filter((item) =>
          uebFilter.value ? item.id_ueb === uebFilter.value : true
        )
        .map((item) => ({
          value: item.id_direccion,
          label: item.nombre_direccion,
        })) || [],
    [direcciones, uebFilter.value]
  );

  // Datos filtrados y paginados memoizados
  const filteredData = useMemo(
    () =>
      areas.filter((item) => {
        const direccion = direccionPorId(item.id_direccion);
        const ueb = uebPorId(direccion?.id_ueb);

        return (
          item.nombre_area.toLowerCase().includes(nameFilter.toLowerCase()) &&
          (!empresaFilter.value || ueb?.id_empresa === empresaFilter.value) &&
          (!uebFilter.value || direccion?.id_ueb === uebFilter.value) &&
          (!structureFilter.value ||
            item.id_direccion === structureFilter.value)
        );
      }),
    [
      areas,
      nameFilter,
      empresaFilter.value,
      uebFilter.value,
      structureFilter.value,
      direccionPorId,
      uebPorId,
    ]
  );

  const paginatedData = useMemo(
    () =>
      filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredData, page, rowsPerPage]
  );

  // Operaciones asyncronas memoizadas
  const handleDelete = useCallback(
    async (id) => {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/area/${id}`
        );
        if (response.status === 200) {
          setAreas((prev) => {
            const newDatos = prev.filter((area) => area.id_area !== id);
            const totalPages = Math.ceil(newDatos.length / rowsPerPage) - 1;
            if (page > totalPages) setPage(Math.max(0, totalPages));
            return newDatos;
          });
          setOpen(false);
        }
      } catch (error) {
        console.error(error);
        setError("Error al eliminar el área");
      }
    },
    [page, rowsPerPage, setAreas]
  );

  const openConfirmation = useCallback((data) => {
    setOpen(true);
    setData(data);
  }, []);

  // Funciones de edición
  const handleSaveI = useCallback(() => setEditIIdx(-1), []);
  const handleCancelI = useCallback(() => setEditIIdx(-1), []);
  const areaUpdate = useCallback(
    (updatedRow) => {
      setAreas((prev) => {
        const updated = [...prev];
        if (editIIdx >= 0) updated[editIIdx] = updatedRow;
        return updated;
      });
    },
    [editIIdx, setAreas]
  );

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
    structureFilter,
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
    handleEmpresaFilterChange,
    handleUebFilterChange,
    handleStructureFilterChange,
    limpiarFiltrados,
    openConfirmation,
    handleDelete,
    handleSaveI,
    handleCancelI,
    areaUpdate,

    // Helpers
    vinculado,
    nombreEmpresa,
    nombreUeb,
    nombreDireccion,
    uebPorId,
    direccionPorId,

    // Data memoizada
    optionEmpresas,
    optionUebs,
    optionDirecciones,
    paginatedData,
    filteredData,
  };
}
