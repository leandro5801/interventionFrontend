import styles from "../../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";
import { customStyles } from "../../styles/SelectFilterStyles";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import FilterListOffOutlinedIcon from "@mui/icons-material/FilterListOffOutlined";

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FormDialog from "../Forms/FormDialog";
import UebForm from "../Forms/UebForm";

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

function UebTable({ uebs, setUebs, empresas, cargando, direcciones }) {
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
  const [empresaFilter, setEmpresaFilter] = useState([]);

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleEmpresaFilterChange = (data) => {
    data ? setEmpresaFilter(data) : setEmpresaFilter([]);
  };

  const limpiarFiltrados = () => {
    setNameFilter("");
    setEmpresaFilter([]);
  };
  const optionEmpresas =
    empresas &&
    empresas
      .filter((item) => item.cargar_empresa === false)
      .map((item) => ({
        value: item.id_empresa,
        label: item.nombre_empresa,
      }));
  const filteredData = uebs.filter(
    (item) =>
      (empresaFilter.length === 0 ||
        item.id_empresa === empresaFilter.value ||
        !item.id_empresa) &&
      item.nombre_ueb.toLowerCase().includes(nameFilter.toLowerCase())
  );
  // sms de confirmacion
  const [data, setData] = useState("");

  function openConfirmation(data) {
    // event.preventDefault();
    setOpen(true);
    setData(data);
  }

  // function handleDelete(idNum) {
  //   const newUeb = uebs.filter((ueb) => ueb.id !== idNum);
  //   setUebs(newUeb);
  //   setOpen(false);
  // }

  const vinculado = (id_ueb) => {
    const direccion = direcciones.find((dato) => dato.id_ueb === id_ueb);
    return direccion ? true : false;
  };

  const [openDialogAdvertencia, setOpenDialogAdvertencia] = useState(false);
  const handleCloseDialogAdvertencia = () => {
    setOpenDialogAdvertencia(false);
  };

  const [error, setError] = useState(null);
  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/ueb/${id}`
      );
      if (response.status === 200) {
        const newDatos = uebs.filter((ueb) => ueb.id_ueb !== id);
        setUebs(newDatos);
        // Calcula el número total de páginas después de la eliminación
        const totalPages = Math.ceil(newDatos.length / rowsPerPage) - 1;

        // Si la página actual está fuera del rango, restablécela a la última página disponible
        if (page > totalPages) {
          setPage(totalPages);
        }
        setOpen(false);
      } else {
        throw new Error("Error al eliminar la ueb");
      }
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un problema al eliminar la empresa. Por favor, inténtalo de nuevo."
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

  const UebUpdate = (updatedRow) => {
    // Crea una copia de los datos de la tabla
    const updatedUebsData = [...uebs];

    // Actualiza los datos de la fila que se está editando
    updatedUebsData[editIIdx] = updatedRow;

    // Actualiza el estado de los datos en la tabla
    setUebs(updatedUebsData);
  };

  //para retornar el nombre de la empresa y no el id
  const nombreEmpresa = (id_empresa) => {
    const empresa = empresas.find((e) => e.id_empresa === id_empresa);
    const name = empresa ? empresa.nombre_empresa : "no se encontro el nombre";
    return name;
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
                <div className={styles.filtrosEstructuraContentInt}>
                  <Select
                    styles={customStyles}
                    className={styles.selectGestionesGantt}
                    defaultValue={empresaFilter}
                    onChange={(empresaFilter) => {
                      handleEmpresaFilterChange(empresaFilter);
                    }}
                    options={optionEmpresas}
                    placeholder="Empresa"
                    isClearable
                  />
                </div>
                <FormDialog
                  open={dialogOpen}
                  onClose={() => {
                    setDialogOpen(false);
                  }}
                  FormComponent={UebForm}
                  setUebs={setUebs}
                  uebs={uebs}
                  onSave={() => {
                    setDialogOpen(false);
                  }}
                  onCancel={() => {
                    setDialogOpen(false);
                  }}
                  empresas={empresas}
                ></FormDialog>
                {/* SELECCIONAR PROYECTO ETC */}
              </div>
              <>
                {uebs.length === 0 && (
                  <div className={styles.divIconH2}>
                    <h6> No hay UEB</h6>{" "}
                  </div>
                )}
                {uebs.length === 0 || (
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell className={styles.spacing}>
                          Empresa
                        </TableCell>
                        <TableCell className={styles.spacing}>Ueb</TableCell>
                        <TableCell className={styles.spacing}></TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {filteredData
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((ueb) => (
                          <TableRow key={ueb.id_ueb} className={styles.trStyle}>
                            <TableCell className={styles.tdStyle}>
                              {nombreEmpresa(ueb.id_empresa)}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              {ueb.nombre_ueb}
                            </TableCell>

                            <TableCell className={styles.tdStyleIcon}>
                              <FontAwesomeIcon
                                icon={faEdit}
                                onClick={() =>
                                  setEditIIdx(
                                    filteredData.findIndex(
                                      (item) => item.id_ueb === ueb?.id_ueb
                                    )
                                  )
                                }
                                className={styles.faIcon}
                              />
                              <FontAwesomeIcon
                                icon={faTrash}
                                onClick={() =>
                                  vinculado(ueb?.id_ueb)
                                    ? setOpenDialogAdvertencia(true)
                                    : openConfirmation(ueb?.id_ueb)
                                }
                                data-task-id={ueb?.id_ueb}
                                className={styles.faIcon}
                              />
                              <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Confirmar Eliminación</DialogTitle>
                                <DialogContent>
                                  <p>¿Está seguro de eliminar esta ueb?</p>
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
              >
                <Alert severity="warning">
                  <AlertTitle>Advertencia</AlertTitle>
                  No se puede eliminar una ueb que ya esté vinculada a una
                  dirección
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
                FormComponent={UebForm}
                setUebs={setUebs}
                uebs={uebs}
                ueb={uebs[editIIdx]}
                onSave={handleSaveI}
                onCancel={handleCancelI}
                empresas={empresas}
              ></FormDialog>
            </TableContainer>
          </div>
        </div>
      </>
    );
  }
}

export default UebTable;
