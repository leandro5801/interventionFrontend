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
import ClienteForm from "../Forms/ClienteForm";

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
import useCliente from "./hooks/useClienteTable";

function ClienteTable({
  users,
  setUsers,
  clientes,
  setClientes,
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
  } = useCliente({ clientes, setClientes, cargando, projects });
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
                  FormComponent={ClienteForm}
                  {...{
                    setClientes,
                    setUsuarios: setUsers,
                    clientes,
                    users,
                    onSave: () => setDialogOpen(false),
                    onCancel: () => setDialogOpen(false),
                  }}
                />
              </div>

              {clientes.length === 0 ? (
                <div className={styles.divIconH2}>
                  <h5>No hay clientes</h5>
                </div>
              ) : (
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell className={styles.spacing}>
                        Cliente
                        {showFilters && (
                          <input
                            className={styles.inputFilter}
                            type="text"
                            value={nameFilter}
                            onChange={handleNameFilterChange}
                            placeholder="Filtrar por cliente"
                          />
                        )}
                      </TableCell>
                      <TableCell className={styles.spacing}></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {paginatedData.map((cliente) => (
                      <TableRow
                        key={cliente.id_cliente}
                        className={styles.trStyle}
                      >
                        <TableCell className={styles.tdStyle}>
                          {cliente.nombre_cliente}
                        </TableCell>
                        <TableCell className={styles.tdStyleIcon}>
                          <FontAwesomeIcon
                            icon={faEdit}
                            onClick={() =>
                              setEditIIdx(
                                clientes.findIndex(
                                  (c) => c.id_cliente === cliente.id_cliente
                                )
                              )
                            }
                            className={styles.faIcon}
                          />
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() =>
                              vinculado(cliente.id_cliente)
                                ? setOpenDialogAdvertencia(true)
                                : openConfirmation(cliente.id_cliente)
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
                  <p>¿Está seguro de eliminar este cliente?</p>
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
                  No se puede eliminar un cliente vinculado a un proyecto
                  <Button onClick={() => setOpenDialogAdvertencia(false)}>
                    Aceptar
                  </Button>
                </Alert>
              </Dialog>

              <FormDialog
                open={editIIdx !== -1}
                onClose={handleCancelI}
                FormComponent={ClienteForm}
                {...{
                  cliente: clientes[editIIdx],
                  setClientes,
                  clientes,
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

export default ClienteTable;
