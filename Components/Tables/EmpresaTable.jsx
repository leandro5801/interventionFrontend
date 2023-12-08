import styles from "../../styles/Home.module.css";
import { useState } from "react";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import FilterListOffOutlinedIcon from "@mui/icons-material/FilterListOffOutlined";

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FormDialog from "../Forms/FormDialog";
import EmpresaForm from "../Forms/EmpresaForm";

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
import { ConfirmationNumber } from "@mui/icons-material";
import axios from "axios";

function EmpresaTable({ empresas, setEmpresas, cargando, uebs }) {
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
  const filteredData =
    empresas &&
    empresas.filter(
      (item) =>
        item.nombre_empresa &&
        item.nombre_empresa.toLowerCase().includes(nameFilter.toLowerCase())
    );

  const [data, setData] = useState("");

  function openConfirmation(data) {
    // event.preventDefault();
    setOpen(true);
    setData(data);
  }

  // function handleDelete(idNum) {
  //   const newEmpresa = empresas.filter((empresa) => empresa.id !== idNum);
  //   setEmpresas(newEmpresa);
  //   setOpen(false);
  // }

  const vinculado = (id_empresa) => {
    const ueb = uebs.find((dato) => dato.id_empresa === id_empresa);
    return ueb ? true : false;
  };
  const [openDialogAdvertencia, setOpenDialogAdvertencia] = useState(false);
  const handleCloseDialogAdvertencia = () => {
    setOpenDialogAdvertencia(false);
  };

  const [error, setError] = useState(null);

  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/empresa/${id}`
      );
      if (response.status === 200) {
        const newDatos = empresas.filter(
          (empresa) => empresa.id_empresa !== id
        );
        setEmpresas(newDatos);
        // Calcula el número total de páginas después de la eliminación
        const totalPages = Math.ceil(newDatos.length / rowsPerPage) - 1;

        // Si la página actual está fuera del rango, restablécela a la última página disponible
        if (page > totalPages) {
          setPage(totalPages);
        }
        setOpen(false);
      } else {
        throw new Error("Error al eliminar la empresa");
      }
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un problema al eliminar la empresa. Por favor, inténtalo de nuevo."
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

  const empresaUpdate = (updatedRow) => {
    // Crea una copia de los datos de la tabla
    const updatedEmpresasData = [...empresas];

    // Actualiza los datos de la fila que se está editando
    updatedEmpresasData[editIIdx] = updatedRow;

    // Actualiza el estado de los datos en la tabla
    setEmpresas(updatedEmpresasData);
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
        {/* Renderizar las empresas aquí */}
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
                  FormComponent={EmpresaForm}
                  setEmpresas={setEmpresas}
                  empresas={empresas}
                  onSave={() => {
                    setDialogOpen(false);
                  }}
                  onCancel={() => {
                    setDialogOpen(false);
                  }}
                ></FormDialog>
              </div>
              <>
                {empresas.length === 0 && (
                  <div className={styles.divIconH2}>
                    <h5> No hay Empresas</h5>{" "}
                  </div>
                )}
                {empresas.length === 0 || (
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell className={styles.spacing}>Nombre</TableCell>
                        <TableCell className={styles.spacing}></TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {filteredData
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((empresa) => (
                          <TableRow
                            key={empresa.id_empresa}
                            className={styles.trStyle}
                          >
                            <TableCell className={styles.tdStyle}>
                              {empresa.nombre_empresa}
                            </TableCell>

                            <TableCell className={styles.tdStyleIcon}>
                              {empresa.cargar_empresa === false ? (
                                <>
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    onClick={() =>
                                      setEditIIdx(
                                        empresas.findIndex(
                                          (item) =>
                                            item.id_empresa ===
                                            empresa?.id_empresa
                                        )
                                      )
                                    }
                                    className={styles.faIcon}
                                  />
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    onClick={() =>
                                      vinculado(empresa?.id_empresa)
                                        ? setOpenDialogAdvertencia(true)
                                        : openConfirmation(empresa?.id_empresa)
                                    }
                                    data-task-id={empresa?.id_empresa}
                                    className={styles.faIcon}
                                  />
                                </>
                              ) : (
                                false
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Confirmar Eliminación</DialogTitle>
                        <DialogContent>
                          <p>¿Está seguro de eliminar esta empresa?</p>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={() => handleDelete(data)}>
                            Aceptar
                          </Button>
                          <Button onClick={handleClose}>Cancelar</Button>
                        </DialogActions>
                      </Dialog>
                      <Dialog
                        open={openDialogAdvertencia}
                        onClose={handleCloseDialogAdvertencia}
                      >
                        <Alert severity="warning">
                          <AlertTitle>Advertencia</AlertTitle>
                          No se puede eliminar una empresa que ya esté vinculada
                          a una UEB
                          <div className={styles.botonAlert}>
                            <Button onClick={handleCloseDialogAdvertencia}>
                              Aceptar
                            </Button>
                          </div>
                        </Alert>
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

              <FormDialog
                open={editIIdx !== -1}
                onClose={handleCancelI}
                FormComponent={EmpresaForm}
                setEmpresas={setEmpresas}
                empresas={empresas}
                empresa={empresas[editIIdx]}
                onSave={handleSaveI}
                onCancel={handleCancelI}
              ></FormDialog>
            </TableContainer>
          </div>
        </div>
      </>
    );
  }
}

export default EmpresaTable;
