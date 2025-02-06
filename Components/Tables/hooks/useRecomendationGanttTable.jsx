import { useState, useCallback, useMemo } from "react";

export const useRecomendationGanttTable = ({
  tableRData,
  setTableRData,
  recomendations,
  setRecomendations,
  clasificaciones,
}) => {
  // Estados
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [editRIdx, setEditRIdx] = useState(-1);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [consultorFilterValue, setConsultorFilterValue] = useState(null);
  const [classificationFilterValue, setClassificationFilterValue] =
    useState(null);

  // Helpers
  const isFollow = useCallback((follow) => (follow ? "Sí" : "No"), []);

  const nombreClasificacion = useCallback(
    (id_clasificacion) => {
      return (
        clasificaciones.find((c) => c.id_clasificacion === id_clasificacion)
          ?.nombre_clasificacion || "No encontrado"
      );
    },
    [clasificaciones]
  );

  // Handlers
  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const toggleFilters = useCallback(() => {
    setShowFilters((prev) => !prev);
    setConsultorFilterValue(null);
    setClassificationFilterValue(null);
  }, []);

  const openConfirmation = useCallback((id) => {
    setOpen(true);
    setData(id);
  }, []);

  const handleDelete = useCallback(
    (idNum) => {
      const newData = tableRData.filter((item) => item.id !== idNum);
      setTableRData(newData);
      setRecomendations(recomendations.filter((item) => item.id !== idNum));
      setOpen(false);
    },
    [tableRData, recomendations, setTableRData, setRecomendations]
  );

  const handleClose = useCallback(() => setOpen(false), []);

  const recomendationUpdate = useCallback(
    (updatedRow) => {
      const newData = [...tableRData];
      if (editRIdx > -1) newData[editRIdx] = updatedRow;
      setTableRData(newData);
      setEditRIdx(-1);
    },
    [editRIdx, tableRData, setTableRData]
  );

  // Datos paginados
  const paginatedData = useMemo(
    () =>
      tableRData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [tableRData, page, rowsPerPage]
  );

  return {
    // Estados
    page,
    rowsPerPage,
    editRIdx,
    open,
    data,
    showFilters,
    consultorFilterValue,
    classificationFilterValue,
    paginatedData,

    // Handlers
    setEditRIdx,
    handleChangePage,
    handleChangeRowsPerPage,
    toggleFilters,
    openConfirmation,
    handleDelete,
    handleClose,
    recomendationUpdate,
    setConsultorFilterValue,
    setClassificationFilterValue,

    // Helpers
    isFollow,
    nombreClasificacion,
  };
};
