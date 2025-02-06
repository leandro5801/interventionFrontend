// hooks/useTrabajador.js
import { useState, useCallback, useMemo } from "react";
import axios from "axios";

export default function useTrabajador({
  trabajadores,
  setTrabajadores,
  empresas,
  uebs,
  direcciones,
  areas,
  cargando,
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
  const [areaFilter, setAreaFilter] = useState([]);
  const [error, setError] = useState(null);
  const [editIIdx, setEditIIdx] = useState(-1);
  const [data, setData] = useState("");

  // Helpers memoizados
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
      "no se encontro el nombre",
    [empresas]
  );

  const nombreUeb = useCallback(
    (id_ueb) =>
      uebs.find((e) => e.id_ueb === id_ueb)?.nombre_ueb ||
      "no se encontro el nombre",
    [uebs]
  );

  const nombreDireccion = useCallback(
    (id_direccion) =>
      direcciones.find((e) => e.id_direccion === id_direccion)
        ?.nombre_direccion || "no se encontro el nombre",
    [direcciones]
  );

  const nombreArea = useCallback(
    (id_area) =>
      areas.find((e) => e.id_area === id_area)?.nombre_area ||
      "no se encontro el nombre",
    [areas]
  );

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
  const handleAreaFilterChange = useCallback(
    (data) => setAreaFilter(data || []),
    []
  );

  const limpiarFiltrados = useCallback(() => {
    setNameFilter("");
    setEmpresaFilter([]);
    setUebFilter([]);
    setStructureFilter([]);
    setAreaFilter([]);
  }, []);

  // Datos filtrados y paginados memoizados
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

  const optionAreas = useMemo(
    () =>
      areas
        ?.filter((item) =>
          structureFilter.value
            ? item.id_direccion === structureFilter.value
            : true
        )
        .map((item) => ({ value: item.id_area, label: item.nombre_area })) ||
      [],
    [areas, structureFilter.value]
  );

  const filteredData = useMemo(
    () =>
      trabajadores.filter((item) => {
        const area = areaPorId(item.id_area);
        const direccion = direccionPorId(area?.id_direccion);
        const ueb = uebPorId(direccion?.id_ueb);

        return (
          item.nombre_trabajador
            .toLowerCase()
            .includes(nameFilter.toLowerCase()) &&
          (!empresaFilter.value || ueb?.id_empresa === empresaFilter.value) &&
          (!uebFilter.value || direccion?.id_ueb === uebFilter.value) &&
          (!structureFilter.value ||
            area?.id_direccion === structureFilter.value) &&
          (!areaFilter.value || item.id_area === areaFilter.value)
        );
      }),
    [
      trabajadores,
      nameFilter,
      empresaFilter.value,
      uebFilter.value,
      structureFilter.value,
      areaFilter.value,
      areaPorId,
      direccionPorId,
      uebPorId,
    ]
  );

  const paginatedData = useMemo(
    () =>
      filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredData, page, rowsPerPage]
  );

  // Operaciones asyncronas
  const handleDelete = useCallback(
    async (id) => {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/trabajador/${id}`
        );
        if (response.status === 200) {
          setTrabajadores((prev) => {
            const newDatos = prev.filter((t) => t.id_trabajador !== id);
            const totalPages = Math.ceil(newDatos.length / rowsPerPage) - 1;
            if (page > totalPages) setPage(Math.max(0, totalPages));
            return newDatos;
          });
          setOpen(false);
        }
      } catch (error) {
        console.error(error);
        setError("Error al eliminar el trabajador");
      }
    },
    [page, rowsPerPage, setTrabajadores]
  );

  const openConfirmation = useCallback((data) => {
    setOpen(true);
    setData(data);
  }, []);

  // Funciones de edición
  const handleSaveI = useCallback(() => setEditIIdx(-1), []);
  const handleCancelI = useCallback(() => setEditIIdx(-1), []);
  const trabajadorUpdate = useCallback(
    (updatedRow) => {
      setTrabajadores((prev) => {
        const updated = [...prev];
        if (editIIdx >= 0) updated[editIIdx] = updatedRow;
        return updated;
      });
    },
    [editIIdx, setTrabajadores]
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
    areaFilter,
    error,
    editIIdx,
    data,

    // Setters
    setDialogOpen,
    setEditIIdx,

    // Handlers
    handleClose,
    toggleFilters,
    handleChangePage,
    handleChangeRowsPerPage,
    handleNameFilterChange,
    handleEmpresaFilterChange,
    handleUebFilterChange,
    handleStructureFilterChange,
    handleAreaFilterChange,
    limpiarFiltrados,
    openConfirmation,
    handleDelete,
    handleSaveI,
    handleCancelI,
    trabajadorUpdate,

    // Helpers
    nombreEmpresa,
    nombreUeb,
    nombreDireccion,
    nombreArea,
    uebPorId,
    direccionPorId,
    areaPorId,

    // Data memoizada
    optionEmpresas,
    optionUebs,
    optionDirecciones,
    optionAreas,
    paginatedData,
    filteredData,
  };
}
