//import { useRecomendationGanttTable } from "./hooks/useRecomendationTable";
import styles from "../../styles/Home.module.css";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import { useRecomendationGanttTable } from "./hooks/useRecomendationGanttTable";

function RecomendationTable({
  tableRData,
  setTableRData,
  recomendations,
  setRecomendations,
  nombreConsultor,
  clasificaciones,
  dialogRecomendationOpen,
  setDialogRecomendationOpen,
}) {
  const {
    page,
    rowsPerPage,
    editRIdx,
    open,
    data,
    showFilters,
    consultorFilterValue,
    classificationFilterValue,
    paginatedData,

    handleChangePage,
    handleChangeRowsPerPage,

    isFollow,
    nombreClasificacion,
  } = useRecomendationGanttTable({
    tableRData,
    setTableRData,
    recomendations,
    setRecomendations,
    clasificaciones,
  });

  return (
    <>
      {tableRData.length === 0 ? (
        <div className={styles.divIconH2}>
          <h5> No hay Recomendaciones</h5>
        </div>
      ) : (
        <div>
          <div className={styles.divIconH2}>
            <h4>Recomendaciones</h4>
          </div>
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {[
                    "Recomendación",
                    "Descripción",
                    "Consultor",
                    "Fecha",
                    "Tipo",
                    "Seguida",
                  ].map((header, idx) => (
                    <TableCell key={idx} className={styles.letraEnNegrita}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedData.map((recomendation) => (
                  <TableRow
                    key={recomendation.id_recomendacion}
                    className={styles.trStyle}
                  >
                    <TableCell>{recomendation.nombre_recomendacion}</TableCell>
                    <TableCell>
                      {recomendation.descripcion_recomendacion}
                    </TableCell>
                    <TableCell>
                      {nombreConsultor(recomendation.id_consultor)}
                    </TableCell>
                    <TableCell>{recomendation.fecha_recomendacion}</TableCell>
                    <TableCell>
                      {nombreClasificacion(recomendation.id_clasificacion)}
                    </TableCell>
                    <TableCell>{isFollow(recomendation.seguimiento)}</TableCell>
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
