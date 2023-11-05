import styles from "../../styles/Home.module.css";
import { useState } from "react";
import { useRouter } from 'next/router';

import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import FilterListOffOutlinedIcon from "@mui/icons-material/FilterListOffOutlined";

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FormDialog from "../Forms/FormDialog";
import UserForm from "../Forms/UserForm"


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

import Select from "react-select";

function InterventionTable({ users, setUsers, roles, setRoles }) {
  //para el sms de confirmacion
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const handleClose = () => {
    setOpen(false);
  };

  function onSubmit(data) {
    // event.preventDefault();
    setOpen(true);
    setFormData(data);
  }
  //para el formulario
  const [dialogOpen, setDialogOpen] = useState(false);

  //  Para el filtrado por criterios
  const [showFilters, setShowFilters] = useState(false);

  // Alternar la visibilidad de las opciones de filtrado y restablecer los valores de filtrado
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Para el paginado de la tabla
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //Para filtrar la tabla

  const [nameFilter, setNameFilter] = useState("");
  const [userNameFilter, setUserNameFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleUserNameFilterChange = (event) => {
    setUserNameFilter(event.target.value);
  };
  const handleRoleFilterChange = (event) => {
    setRoleFilter(event.target.value);
  };

  //seleccionar rol
  // const userRol =

  const filteredData = users.map((item) => {
    const role = roles.find((role) => (item.role_id === role.id ));
    const roleName = role ? role.name_role : "Rol no encontrado";
    return { ...item, roleName };
  }).filter(
    (item) =>
      item.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      item.user_name.toLowerCase().includes(userNameFilter.toLowerCase()) &&
      item.roleName.toLowerCase().includes(roleFilter.toLowerCase())
  );
  

  function openConfirmation(data) {
    // event.preventDefault();
    setOpen(true);
    setData(data);
  }

  function handleDelete(idNum) {
    const newUser = users.filter((user) => user.id !== idNum);
    setUsers(newUser);
    setOpen(false);
  }

  // Para editar una recomendacion desde la tabla

  const [editIIdx, setEditIIdx] = useState(-1);

  const handleSaveI = () => {
    setEditIIdx(-1);
  };

  const handleCancelI = () => {
    setEditIIdx(-1);
  };

  const userUpdate = (updatedRow) => {
    // Crea una copia de los datos de la tabla
    const updatedUserData = [...users];

    // Actualiza los datos de la fila que se está editando
    updatedUserData[editIIdx] = updatedRow;

    // Actualiza el estado de los datos en la tabla
    setUsers(updatedUserData);
  };
  return (
    <>
      <div className={styles.divTableInter}>
        {users.length === 0 && (
          <div className={styles.divIconH2}>
            <h2> No hay Intervenciones</h2>{" "}
          </div>
        )}
        {users.length === 0 || (
          <div>
            <div className={styles.divIconH2}></div>
            <TableContainer component={Paper} className={styles.table}>
              <div className={styles.btnNuevoContent}>
                <Button
                  className={styles.btn}
                  onClick={() => {
                    setDialogOpen(true);
                  }}
                >
                  Nuevo +
                </Button>
                <FormDialog
                  open={dialogOpen}
                  onClose={() => {
                    setDialogOpen(false);
                  }}
                  FormComponent={UserForm}
                  setUsers={setUsers}
                  setRoles={setRoles}
                  users={users}
                  onSave={() => {
                    setDialogOpen(false);
                  }}
                  onCancel={() => {
                    setDialogOpen(false);
                  }}
                  roles={roles}
                ></FormDialog>
                {/* SELECCIONAR PROYECTO ETC */}

                <div className={styles.filterListOffOutlinedContent}>
                  {showFilters ? (
                    <FilterListOffOutlinedIcon
                      onClick={toggleFilters}
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
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell className={styles.spacing}>
                      Nombre
                      {showFilters && (
                        <input
                          className={styles.inputFilter}
                          type="text"
                          value={nameFilter}
                          onChange={handleNameFilterChange}
                          placeholder="Filtrar por nombre"
                        />
                      )}
                    </TableCell>
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
                  {filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user) => (
                      <TableRow key={user.id} className={styles.trStyle}>
                        <TableCell className={styles.tdStyle}>
                          {user.name}
                        </TableCell>
                        <TableCell className={styles.tdStyle}>
                          {user.user_name}
                        </TableCell>
                        <TableCell className={styles.tdStyle}>
                          {user.roleName}
                        </TableCell>
                        <td className={styles.tdStyle}>
                          <FontAwesomeIcon
                            icon={faEdit}
                            onClick={() =>
                              setEditIIdx(
                                filteredData.findIndex(
                                  (item) => item.id === user?.id
                                )
                              )
                            }
                            className={styles.faIcon}
                          />
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() => openConfirmation(user?.id)}
                            data-task-id={user?.id}
                            className={styles.faIcon}
                          />
                          <Dialog
                            open={open}
                            onClose={handleClose}
                            BackdropProps={{ invisible: true }}
                          >
                            <DialogTitle>Confirmar Eliminación</DialogTitle>
                            <DialogContent>
                              <p>¿Está seguro de eliminar este usuario?</p>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={() => handleDelete(data)}>
                                Aceptar
                              </Button>
                              <Button onClick={handleClose}>Cancelar</Button>
                            </DialogActions>
                          </Dialog>
                        </td>
                      </TableRow>
                    ))}
                </TableBody>

                <TableFooter>
                  <TableRow>
                    <TablePagination
                      className={styles.tablePagination}
                      rowsPerPageOptions={[4, 5, 10]}
                      count={filteredData.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      labelRowsPerPage="Filas por página:"
                    />
                  </TableRow>
                </TableFooter>
              </Table>
              <FormDialog
                open={editIIdx !== -1}
                onClose={handleCancelI}
                FormComponent={UserForm}
                setUsers={userUpdate}
                user={users[editIIdx]}
                onSave={handleSaveI}
                onCancel={handleCancelI}
                roles={roles}
              ></FormDialog>
            </TableContainer>
          </div>
        )}
      </div>
    </>
  );
}

export default InterventionTable;
