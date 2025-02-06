import styles from "../../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import FilterListOffOutlinedIcon from "@mui/icons-material/FilterListOffOutlined";

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FormDialog from "../Forms/FormDialog";
import ConsultorForm from "../Forms/ConsultorForm";

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
  Alert,
  AlertTitle,
} from "@mui/material";

import Select from "react-select";
import useConsultor from "./hooks/useConsultorTable";

function ConsultorTable({
  users,
  setUsers,
  consultores,
  setConsultores,
  cargando,
  projects,
}) {
  const {
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
    setDialogOpen,
    setEditIIdx,
    setOpenDialogAdvertencia,
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
    vinculado,
    paginatedData,
    filteredData,
  } = useConsultor({ consultores, setConsultores, cargando, projects });

  if (cargando) {
    return (
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={cargando}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  } else {
    return (
      <>
        <div className={styles.divTableInter}>
          <div>
            <div className={styles.divIconH2}></div>
            <TableContainer component={Paper} className={styles.table}>
              <div className={styles.btnNuevoContent}>
                <Button
                  className={styles.btn}
                  onClick={() => setDialogOpen(true)}
                >
                  Nuevo +
                </Button>

                <FormDialog
                  open={dialogOpen}
                  onClose={() => setDialogOpen(false)}
                  FormComponent={ConsultorForm}
                  {...{
                    setConsultores,
                    setUsuarios: setUsers,
                    consultores,
                    users,
                    onSave: () => setDialogOpen(false),
                    onCancel: () => setDialogOpen(false),
                  }}
                />
              </div>

              {consultores.length === 0 ? (
                <div className={styles.divIconH2}>
                  <h5>No hay consultores</h5>
                </div>
              ) : (
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell className={styles.spacing}>
                        Consultor
                        {showFilters && (
                          <input
                            className={styles.inputFilter}
                            type="text"
                            value={nameFilter}
                            onChange={handleNameFilterChange}
                            placeholder="Filtrar por consultor"
                          />
                        )}
                      </TableCell>
                      <TableCell className={styles.spacing}></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {paginatedData.map((consultor) => (
                      <TableRow
                        key={consultor.id_consultor}
                        className={styles.trStyle}
                      >
                        <TableCell className={styles.tdStyle}>
                          {consultor.nombre_consultor}
                        </TableCell>
                        <TableCell className={styles.tdStyleIcon}>
                          <FontAwesomeIcon
                            icon={faEdit}
                            onClick={() =>
                              setEditIIdx(
                                consultores.findIndex(
                                  (c) =>
                                    c.id_consultor === consultor.id_consultor
                                )
                              )
                            }
                            className={styles.faIcon}
                          />
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() =>
                              vinculado(consultor.id_consultor)
                                ? setOpenDialogAdvertencia(true)
                                : openConfirmation(consultor.id_consultor)
                            }
                            className={styles.faIcon}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>

                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        className={styles.tablePagination}
                        count={filteredData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[5, 10, 25]}
                        labelRowsPerPage="Filas por página:"
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              )}

              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirmar Eliminación</DialogTitle>
                <DialogContent>
                  <p>¿Está seguro de eliminar este consultor?</p>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => handleDelete(data)}>Aceptar</Button>
                  <Button onClick={handleClose}>Cancelar</Button>
                </DialogActions>
              </Dialog>

              <Dialog
                open={openDialogAdvertencia}
                onClose={() => setOpenDialogAdvertencia(false)}
              >
                <Alert severity="warning">
                  <AlertTitle>Advertencia</AlertTitle>
                  No se puede eliminar un consultor vinculado a un proyecto
                  <Button onClick={() => setOpenDialogAdvertencia(false)}>
                    Aceptar
                  </Button>
                </Alert>
              </Dialog>

              <FormDialog
                open={editIIdx !== -1}
                onClose={handleCancelI}
                FormComponent={ConsultorForm}
                {...{
                  consultor: consultores[editIIdx],
                  setConsultores,
                  consultores,
                  users,
                  onSave: handleSaveI,
                  onCancel: handleCancelI,
                }}
              />
            </TableContainer>
          </div>
        </div>
      </>
    );
  }
}

export default ConsultorTable;
