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
} from "@mui/material";

import Select from "react-select";

function ClienteTable({ users, setUsers, clientes, setClientes, cargando }) {
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

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const limpiarFiltrados = () => {
    setNameFilter("");
  };
  const filteredData = clientes.filter(
    (item) =>
      item.nombre_cliente &&
      item.nombre_cliente.toLowerCase().includes(nameFilter.toLowerCase())
  );
  // sms de confirmacion
  const [data, setData] = useState("");

  function openConfirmation(data) {
    // event.preventDefault();
    setOpen(true);
    setData(data);
  }

  // function handleDelete(idNum) {
  //   const newCliente = clientes.filter(
  //     (cliente) => cliente.id_cliente !== idNum
  //   );
  //   setClientes(newCliente);
  //   setOpen(false);
  // }
  const [error, setError] = useState(null);
  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/cliente/${id}`
      );
      if (response.status === 200) {
        setClientes(clientes.filter((cliente) => cliente.id_cliente !== id));
        setOpen(false);
      } else {
        throw new Error("Error al eliminar el cliente");
      }
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un problema al eliminar el cliente. Por favor, inténtalo de nuevo."
      );
    }
  }
  const [editIIdx, setEditIIdx] = useState(-1);

  const handleSaveI = () => {
    setEditIIdx(-1);
  };

  const handleCancelI = () => {
    setEditIIdx(-1);
  };

  const clienteUpdate = (updatedRow) => {
    // Crea una copia de los datos de la tabla
    const updatedClienteData = [...clientes];

    // Actualiza los datos de la fila que se está editando
    updatedClienteData[editIIdx] = updatedRow;

    // Actualiza el estado de los datos en la tabla
    setClientes(updatedClienteData);
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
                  FormComponent={ClienteForm}
                  setClientes={setClientes}
                  setUsuarios={setUsers}
                  clientes={clientes}
                  onSave={() => {
                    setDialogOpen(false);
                  }}
                  onCancel={() => {
                    setDialogOpen(false);
                  }}
                  users={users}
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
                {clientes.length === 0 && (
                  <div className={styles.divIconH2}>
                    <h5> No hay clientes</h5>{" "}
                  </div>
                )}
                {clientes.length === 0 || (
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
                      {filteredData
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((cliente) => (
                          <TableRow
                            key={cliente.id_cliente}
                            className={styles.trStyle}
                          >
                            <TableCell className={styles.tdStyle}>
                              {cliente.nombre_cliente}
                            </TableCell>

                            <TableCell className={styles.tdStyle}>
                              <FontAwesomeIcon
                                icon={faEdit}
                                onClick={() =>
                                  setEditIIdx(
                                    filteredData.findIndex(
                                      (item) =>
                                        item.id_cliente === cliente?.id_cliente
                                    )
                                  )
                                }
                                className={styles.faIcon}
                              />
                              <FontAwesomeIcon
                                icon={faTrash}
                                onClick={() =>
                                  openConfirmation(cliente?.id_cliente)
                                }
                                data-task-id={cliente?.id_cliente}
                                className={styles.faIcon}
                              />
                              <Dialog
                                open={open}
                                onClose={handleClose}
                                BackdropProps={{ invisible: true }}
                              >
                                <DialogTitle>Confirmar Eliminación</DialogTitle>
                                <DialogContent>
                                  <p>¿Está seguro de eliminar este cliente?</p>
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
              <FormDialog
                open={editIIdx !== -1}
                onClose={handleCancelI}
                FormComponent={ClienteForm}
                setClientes={setClientes}
                cliente={clientes[editIIdx]}
                clientes={clientes}
                onSave={handleSaveI}
                onCancel={handleCancelI}
                users={users}
              ></FormDialog>
            </TableContainer>
          </div>
        </div>
      </>
    );
  }
}

export default ClienteTable;
