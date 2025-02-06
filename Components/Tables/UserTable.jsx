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
import UserForm from "../Forms/UserForm";

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
import { RollerShades } from "@mui/icons-material";
import useUser from "./hooks/useUserTable";

function UserTable({
  users,
  setUsers,
  roles,
  setRoles,
  cargando,
  user: usuarioAutenticado,
  clientes,
  consultores,
}) {
  const {
    open,
    dialogOpen,
    showFilters,
    page,
    rowsPerPage,
    userNameFilter,
    roleFilter,
    openDialogAdvertenciaCliente,
    openDialogAdvertenciaConsultor,
    esUsuarioPropio,
    openDialogAdvertencia,
    error,
    editIIdx,
    data,
    setDialogOpen,
    setEditIIdx,
    setOpenDialogAdvertenciaCliente,
    setOpenDialogAdvertenciaConsultor,
    setOpenDialogAdvertencia,
    handleClose,
    toggleFilters,
    handleChangePage,
    handleChangeRowsPerPage,
    handleUserNameFilterChange,
    handleRoleFilterChange,
    limpiarFiltrados,
    openConfirmation,
    handleDelete,
    handleUsuarioPropio,
    nombreRol,
    clienteVinculado,
    consultorVinculado,
    paginatedData,
    filteredData,
  } = useUser({
    users,
    setUsers,
    roles,
    cargando,
    usuarioAutenticado,
    clientes,
    consultores,
  });

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
                  FormComponent={UserForm}
                  {...{
                    setUsers,
                    users,
                    roles,
                    nombreRol,
                    onSave: () => setDialogOpen(false),
                    onCancel: () => setDialogOpen(false),
                  }}
                />

                <div className={styles.filterListOffOutlinedContent}>
                  {showFilters ? (
                    <FilterListOffOutlinedIcon
                      onClick={() => {
                        toggleFilters();
                        limpiarFiltrados();
                      }}
                      style={{ width: "18px", cursor: "pointer" }}
                    />
                  ) : (
                    <FilterListOutlinedIcon
                      onClick={toggleFilters}
                      style={{ width: "18px", cursor: "pointer" }}
                    />
                  )}
                </div>
              </div>

              {users.length === 0 ? (
                <div className={styles.divIconH2}>
                  <h5>No hay usuarios</h5>
                </div>
              ) : (
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell className={styles.spacing}>
                        Usuario
                        {showFilters && (
                          <input
                            className={styles.inputFilter}
                            type="text"
                            value={userNameFilter}
                            onChange={handleUserNameFilterChange}
                            placeholder="Filtrar por usuario"
                          />
                        )}
                      </TableCell>
                      <TableCell className={styles.spacing}>
                        Rol
                        {showFilters && (
                          <input
                            className={styles.inputFilter}
                            type="text"
                            value={roleFilter}
                            onChange={handleRoleFilterChange}
                            placeholder="Filtrar por rol"
                          />
                        )}
                      </TableCell>
                      <TableCell className={styles.spacing}></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {paginatedData.map((user) => (
                      <TableRow
                        key={user.id_usuario}
                        className={styles.trStyle}
                      >
                        <TableCell className={styles.tdStyle}>
                          {user.nombre_usuario}
                        </TableCell>
                        <TableCell className={styles.tdStyle}>
                          {nombreRol(user.id_rol)}
                        </TableCell>
                        <TableCell className={styles.tdStyleIcon}>
                          <FontAwesomeIcon
                            icon={faEdit}
                            onClick={() =>
                              setEditIIdx(
                                users.findIndex(
                                  (u) => u.id_usuario === user.id_usuario
                                )
                              )
                            }
                            className={styles.faIcon}
                          />
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() => {
                              if (
                                usuarioAutenticado.id_usuario ===
                                user.id_usuario
                              ) {
                                handleUsuarioPropio();
                              } else if (clienteVinculado(user.id_usuario)) {
                                setOpenDialogAdvertenciaCliente(true);
                              } else if (consultorVinculado(user.id_usuario)) {
                                setOpenDialogAdvertenciaConsultor(true);
                              } else {
                                openConfirmation(user.id_usuario);
                              }
                            }}
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
                  <p>¿Está seguro de eliminar este usuario?</p>
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
                  {esUsuarioPropio && "No se puede eliminar el usuario en uso"}
                  <Button onClick={() => setOpenDialogAdvertencia(false)}>
                    Aceptar
                  </Button>
                </Alert>
              </Dialog>

              <Dialog
                open={openDialogAdvertenciaCliente}
                onClose={() => setOpenDialogAdvertenciaCliente(false)}
              >
                <Alert severity="warning">
                  <AlertTitle>Advertencia</AlertTitle>
                  No se puede eliminar un usuario vinculado a un cliente
                  <Button
                    onClick={() => setOpenDialogAdvertenciaCliente(false)}
                  >
                    Aceptar
                  </Button>
                </Alert>
              </Dialog>

              <Dialog
                open={openDialogAdvertenciaConsultor}
                onClose={() => setOpenDialogAdvertenciaConsultor(false)}
              >
                <Alert severity="warning">
                  <AlertTitle>Advertencia</AlertTitle>
                  No se puede eliminar un usuario vinculado a un consultor
                  <Button
                    onClick={() => setOpenDialogAdvertenciaConsultor(false)}
                  >
                    Aceptar
                  </Button>
                </Alert>
              </Dialog>

              <FormDialog
                open={editIIdx !== -1}
                onClose={() => setEditIIdx(-1)}
                FormComponent={UserForm}
                {...{
                  user: users[editIIdx],
                  setUsers,
                  users,
                  roles,
                  nombreRol,
                  onSave: () => setEditIIdx(-1),
                  onCancel: () => setEditIIdx(-1),
                }}
              />
            </TableContainer>
          </div>
        </div>
      </>
    );
  }
}

export default UserTable;
