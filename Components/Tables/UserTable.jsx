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
  const nombreRol = (id_rol) => {
    const role = roles.find((rol) => rol.id_rol === id_rol);
    const name = role ? role.nombre_rol : "no se encontro el nombre";
    return name;
  };

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

  const limpiarFiltrados = () => {
    setNameFilter("");
    setUserNameFilter("");
    setRoleFilter("");
  };
  const filteredData = users
    .map((item) => {
      const role = roles.find((role) => item.id_rol === role.id_rol);
      const roleName = role ? role.nombre_rol : "Rol no encontrado";
      return { ...item, roleName };
    })
    .filter(
      (item) =>
        item.nombre_usuario
          .toLowerCase()
          .includes(userNameFilter.toLowerCase()) &&
        nombreRol(item.id_rol).toLowerCase().includes(roleFilter.toLowerCase())
    );

  // sms de confirmacion
  const [data, setData] = useState("");
  function openConfirmation(data) {
    // event.preventDefault();
    setOpen(true);
    setData(data);
  }

  // function handleDelete(idNum) {
  //   const newUser = users.filter((user) => user.id_usuario !== idNum);
  //   setUsers(newUser);
  //   setOpen(false);
  // }

  const clienteVinculado = (id_usuario) => {
    const cliente = clientes.find((dato) => dato.id_usuario === id_usuario);
    return cliente ? true : false;
  };
  const consultorVinculado = (id_usuario) => {
    const consultor = consultores.find(
      (dato) => dato.id_usuario === id_usuario
    );
    return consultor ? true : false;
  };
  const [openDialogAdvertenciaCliente, setOpenDialogAdvertenciaCliente] =
    useState(false);
  const [openDialogAdvertenciaConsultor, setOpenDialogAdvertenciaConsultor] =
    useState(false);

  const [esUsuarioPropio, setEsUsuarioPropio] = useState(false);
  const [openDialogAdvertencia, setOpenDialogAdvertencia] = useState(false);
  const handleCloseDialogAdvertencia = () => {
    setOpenDialogAdvertencia(false);
  };
  const handleCloseDialogAdvertenciaConsultor = () => {
    setOpenDialogAdvertenciaConsultor(false);
  };
  const handleCloseDialogAdvertenciaCliente = () => {
    setOpenDialogAdvertenciaCliente(false);
  };
  const handleUsuarioPropio = () => {
    handleClose();
    setEsUsuarioPropio(true);
    setOpenDialogAdvertencia(true);
  };

  const [error, setError] = useState(null);
  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/usuario/${id}`
      );
      if (response.status === 200) {
        const newDatos = users.filter((usuario) => usuario.id_usuario !== id);
        setUsers(newDatos);
  
        // Calcula el número total de páginas después de la eliminación
        const totalPages = Math.ceil(newDatos.length / rowsPerPage) - 1;
  
        // Si la página actual está fuera del rango, restablécela a la última página disponible
        if (page > totalPages) {
          setPage(totalPages);
        }
        setOpen(false);
        
      } else {
        throw new Error("Error al eliminar el usuario");
      }
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un problema al eliminar el usuario. Por favor, inténtalo de nuevo."
      );
    }
  }
  // Para editar una recomendacion desde la tabla

  const [editIIdx, setEditIIdx] = useState(-1);

  const handleSaveI = () => {
    setEditIIdx(-1);
  };

  const handleCancelI = () => {
    setEditIIdx(-1);
  };

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
                  nombreRol={nombreRol}
                ></FormDialog>
                {/* SELECCIONAR PROYECTO ETC */}

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
              <>
                {users.length === 0 && (
                  <div className={styles.divIconH2}>
                    <h5> No hay usuarios</h5>{" "}
                  </div>
                )}
                {users.length === 0 || (
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
                      {filteredData
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((user) => (
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
                            <TableCell className={styles.tdStyle}>
                              <FontAwesomeIcon
                                icon={faEdit}
                                onClick={() =>
                                  setEditIIdx(
                                    filteredData.findIndex(
                                      (item) =>
                                        item.id_usuario === user?.id_usuario
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
                                    user?.id_usuario
                                  ) {
                                    handleUsuarioPropio();
                                  } else if (
                                    clienteVinculado(user?.id_usuario)
                                  ) {
                                    setOpenDialogAdvertenciaCliente(true);
                                  } else if (
                                    consultorVinculado(user?.id_usuario)
                                  ) {
                                    setOpenDialogAdvertenciaConsultor(true);
                                  } else {
                                    openConfirmation(user?.id_usuario);
                                  }
                                }}
                                data-task-id={user?.id_usuario}
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
                                  <Button onClick={handleClose}>
                                    Cancelar
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </TableCell>
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
                )}
              </>
              <Dialog
                open={openDialogAdvertencia}
                onClose={handleCloseDialogAdvertencia}
                BackdropProps={{ invisible: true }}
              >
                {esUsuarioPropio ? (
                  <Alert severity="warning">
                    <AlertTitle>Advertencia</AlertTitle>
                    No se puede eliminar el usuario en uso
                    <div className={styles.botonAlert}>
                      <Button onClick={handleCloseDialogAdvertencia}>
                        Aceptar
                      </Button>
                    </div>
                  </Alert>
                ) : (
                  false
                )}
              </Dialog>
              <Dialog
                open={openDialogAdvertenciaCliente}
                onClose={setOpenDialogAdvertenciaCliente}
                BackdropProps={{ invisible: true }}
              >
                <Alert severity="warning">
                  <AlertTitle>Advertencia</AlertTitle>
                  No se puede eliminar un usuario que ya esté vinculado a un
                  cliente
                  <div className={styles.botonAlert}>
                    <Button onClick={handleCloseDialogAdvertenciaCliente}>
                      Aceptar
                    </Button>
                  </div>
                </Alert>
              </Dialog>
              <Dialog
                open={openDialogAdvertenciaConsultor}
                onClose={handleCloseDialogAdvertenciaConsultor}
                BackdropProps={{ invisible: true }}
              >
                <Alert severity="warning">
                  <AlertTitle>Advertencia</AlertTitle>
                  No se puede eliminar un usuario que ya esté vinculado a un
                  consultor
                  <div className={styles.botonAlert}>
                    <Button onClick={handleCloseDialogAdvertenciaConsultor}>
                      Aceptar
                    </Button>
                  </div>
                </Alert>
              </Dialog>
              <FormDialog
                open={editIIdx !== -1}
                onClose={handleCancelI}
                FormComponent={UserForm}
                setUsers={setUsers}
                users={users}
                user={users[editIIdx]}
                onSave={handleSaveI}
                onCancel={handleCancelI}
                roles={roles}
                nombreRol={nombreRol}
              ></FormDialog>
            </TableContainer>
          </div>
        </div>
      </>
    );
  }
}

export default UserTable;
