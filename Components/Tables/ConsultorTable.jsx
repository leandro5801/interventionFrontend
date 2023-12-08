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

function ConsultorTable({
  users,
  setUsers,
  consultores,
  setConsultores,
  cargando,
  projects,
}) {
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
  const filteredData = consultores.filter((item) =>
    item.nombre_consultor.toLowerCase().includes(nameFilter.toLowerCase())
  );
  // sms de confirmacion
  const [data, setData] = useState("");

  function openConfirmation(data) {
    // event.preventDefault();
    setOpen(true);
    setData(data);
  }

  // function handleDelete(idNum) {
  //   const newConsultor = consultores.filter(
  //     (consultor) => consultor.id_consultor !== idNum
  //   );
  //   setConsultores(newConsultor);
  //   setOpen(false);
  // }

  const vinculado = (id_consultor) => {
    const proyecto = projects.find((dato) =>
      dato.consultores_asignados_id.some((id) => id === id_consultor)
    );
    return proyecto ? true : false;
  };
  const [openDialogAdvertencia, setOpenDialogAdvertencia] = useState(false);
  const handleCloseDialogAdvertencia = () => {
    setOpenDialogAdvertencia(false);
  };

  const [error, setError] = useState(null);
  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/consultor/${id}`
      );
      if (response.status === 200) {
        const newDatos = (consultor) => consultor.id_consultor !== id;
        setConsultores(consultores.filter(newDatos));
        // Calcula el número total de páginas después de la eliminación
        const totalPages = Math.ceil(newDatos.length / rowsPerPage) - 1;

        // Si la página actual está fuera del rango, restablécela a la última página disponible
        if (page > totalPages) {
          setPage(totalPages);
        }
        setOpen(false);
      } else {
        throw new Error("Error al eliminar el consultor");
      }
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un problema al eliminar el consultor. Por favor, inténtalo de nuevo."
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

  const consultorUpdate = (updatedRow) => {
    // Crea una copia de los datos de la tabla
    const updatedConsultoreData = [...consultores];

    // Actualiza los datos de la fila que se está editando
    updatedConsultoreData[editIIdx] = updatedRow;

    // Actualiza el estado de los datos en la tabla
    setConsultores(updatedConsultoreData);
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
                  FormComponent={ConsultorForm}
                  setConsultores={setConsultores}
                  setUsuarios={setUsers}
                  consultores={consultores}
                  onSave={() => {
                    setDialogOpen(false);
                  }}
                  onCancel={() => {
                    setDialogOpen(false);
                  }}
                  users={users}
                ></FormDialog>
                {/* SELECCIONAR PROYECTO ETC */}
              </div>
              <>
                {consultores.length === 0 && (
                  <div className={styles.divIconH2}>
                    <h5> No hay consultores</h5>{" "}
                  </div>
                )}
                {consultores.length === 0 || (
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell className={styles.spacing}>
                          Consultor
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
                        .map((consultor) => (
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
                                    filteredData.findIndex(
                                      (item) =>
                                        item.id_consultor ===
                                        consultor?.id_consultor
                                    )
                                  )
                                }
                                className={styles.faIcon}
                              />
                              <FontAwesomeIcon
                                icon={faTrash}
                                onClick={() =>
                                  vinculado(consultor?.id_consultor)
                                    ? setOpenDialogAdvertencia(true)
                                    : openConfirmation(consultor?.id_consultor)
                                }
                                data-task-id={consultor?.id_consultor}
                                className={styles.faIcon}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Confirmar Eliminación</DialogTitle>
                        <DialogContent>
                          <p>¿Está seguro de eliminar este consultor?</p>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={() => handleDelete(data)}>
                            Aceptar
                          </Button>
                          <Button onClick={handleClose}>Cancelar</Button>
                        </DialogActions>
                      </Dialog>
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
              >
                <Alert severity="warning">
                  <AlertTitle>Advertencia</AlertTitle>
                  No se puede eliminar un consultor que ya esté vinculado a un
                  proyecto
                  <div className={styles.botonAlert}>
                    <Button onClick={handleCloseDialogAdvertencia}>
                      Aceptar
                    </Button>
                  </div>
                </Alert>
              </Dialog>
              <FormDialog
                open={editIIdx !== -1}
                onClose={handleCancelI}
                FormComponent={ConsultorForm}
                setConsultores={setConsultores}
                consultor={consultores[editIIdx]}
                consultores={consultores}
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

export default ConsultorTable;
