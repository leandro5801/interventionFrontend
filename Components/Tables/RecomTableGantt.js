import styles from "../../styles/Home.module.css";
import { useState, useEffect } from "react";

import Settings from "../GanttChart/Settings";
import DialogForm from "../Forms/Dialog";
import RecomendationForm from "../Forms/RecomendationForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faPlus,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  TablePagination,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  Button,
} from "@mui/material";

function RecomendationTable({
  tableRData,
  setTableRData,
  recomendations,
  setRecomendations,
  selectedIntervention,
  classifications,
  consultores,
  dialogRecomendationOpen,
  setDialogRecomendationOpen,
}) {
  //Para abrir formulario de crear recomendacion
  function toggleFormulario() {
    setDialogRecomendationOpen(!dialogRecomendationOpen);
  }
  // Para editar una recomendacion desde la tabla

  const [editRIdx, setEditRIdx] = useState(-1);

  const handleSaveR = () => {
    setEditRIdx(-1);
  };

  const handleCancelR = () => {
    setEditRIdx(-1);
  };

  const recomendationUpdate = (updatedRow) => {
    // Crea una copia de los datos de la tabla
    const updatedTableRData = [...tableRData];

    // Actualiza los datos de la fila que se está editando
    updatedTableRData[editRIdx] = updatedRow;

    // Actualiza el estado de los datos en la tabla
    setTableRData(updatedTableRData);
  };

  //  Para el filtrado por criterios (consultor y tipo)
  const [showFilters, setShowFilters] = useState(false);
  const [consultorFilterValue, setConsultorFilterValue] = useState(null);
  const [classificationFilterValue, setClassificationFilterValue] =
    useState(null);

  //  Filtrar los datos de la tabla
  //   const filtredData = tableRData.filter((row) => {
  //     let consultorMatch = true;
  //     let classificationMatch = true;

  //     if (consultorFilterValue) {
  //       consultorMatch = row.consultor === consultorFilterValue;
  //     }
  //     if (classificationFilterValue) {
  //       classificationMatch = row.classification === classificationFilterValue;
  //     }

  //     return consultorMatch && classificationMatch;
  //   });

  // Obtener los valores únicos para cada columna después de aplicar cada filtro individualmente
  //   const uniqueConsultors = [
  //     ...new Set(
  //       tableRData
  //         .filter(
  //           (row) =>
  //             !classificationFilterValue ||
  //             row.classification === classificationFilterValue
  //         )
  //         .map((row) => row.consultor)
  //     ),
  //   ];
  //   const uniqueClassification = [
  //     ...new Set(
  //       tableRData
  //         .filter(
  //           (row) =>
  //             !consultorFilterValue || row.consultor === consultorFilterValue
  //         )
  //         .map((row) => row.classification)
  //     ),
  //   ];

  // Alternar la visibilidad de las opciones de filtrado y restablecer los valores de filtrado
  const toggleFilters = () => {
    setShowFilters(!showFilters);
    setConsultorFilterValue(null);
    setClassificationFilterValue(null);
  };

  // sms de confirmacion
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");

  function openConfirmation(data) {
    // event.preventDefault();
    setOpen(true);
    setData(data);
  }

  function handleDelete(idNum) {
    const newRecomendation = tableRData.filter(
      (recomendacion) => recomendacion.id !== idNum
    );

    setTableRData(newRecomendation);
    const newRecomendations = recomendations.filter(
      (recomendacion) => recomendacion.id !== idNum
    );
    setRecomendations(newRecomendations);
    // update state (if data on backend - make API request to update data)

    setOpen(false);
  }
  const handleClose = () => {
    setOpen(false);
  };
  // Para el paginado de la tabla
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {tableRData.length === 0 && (
        <div className={styles.divIconH2}>
          <h4> No hay Recomendaciones</h4>{" "}
        </div>
      )}
      {tableRData.length === 0 || (
        <div>
          <div className={styles.divIconH2}>
            <h4>Recomendaciones</h4>
          </div>
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell className={styles.letraEnNegrita}>
                    Recomendación
                  </TableCell>
                  <TableCell className={styles.letraEnNegrita}>Descripción</TableCell>
                  <TableCell className={styles.letraEnNegrita}>Consultor</TableCell>
                  <TableCell className={styles.letraEnNegrita}>Tipo</TableCell>
                  <TableCell className={styles.letraEnNegrita}>Seguimiento</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {tableRData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((recomendation) => (
                    <TableRow key={recomendation.id} className={styles.trStyle}>
                      <TableCell >
                        {recomendation.name}
                      </TableCell>
                      <TableCell >
                        {recomendation.description}
                      </TableCell>
                      <TableCell >
                        {recomendation.consultor}
                      </TableCell>
                      <TableCell >
                        {recomendation.classification}
                      </TableCell>
                      <TableCell >
                        {recomendation.follow}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
              <TableRow>
                <TablePagination
                  className={styles.tablePagination}
                  rowsPerPageOptions={[2, 4, 8]}
                  count={tableRData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage="Filas por página:"
                />
              </TableRow>
            </TableFooter>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
}
export default RecomendationTable;
