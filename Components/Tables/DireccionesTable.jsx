import styles from "../../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { customStyles } from "../../styles/SelectFilterStyles";

import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import FilterListOffOutlinedIcon from "@mui/icons-material/FilterListOffOutlined";

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FormDialog from "../Forms/FormDialog";
import DireccionForm from "../Forms/DireccionForm";

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

function DireccionTable({
  direcciones,
  setDirecciones,
  empresas,
  uebs,
  cargando,
  areas
}) {
  //para retornar el nombre de la empresa y no el id
  const uebPorId = (id_ueb) => {
    const ueb = uebs.find((e) => e.id_ueb === id_ueb);
    if (!ueb) {
      console.error(`No se encontró ninguna UEB con id_ueb: ${id_ueb}`);
      return;
    }
    return ueb;
  };
  const nombreEmpresa = (id_empresa) => {
    const empresa = empresas.find((e) => e.id_empresa === id_empresa);
    const name = empresa ? empresa.nombre_empresa : "no se encontro el nombre";
    return name;
  };
  const nombreUeb = (id_ueb) => {
    const ueb = uebs.find((e) => e.id_ueb === id_ueb);
    const name = ueb ? ueb.nombre_ueb : "no se encontro el nombre";
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
  const [empresaFilter, setEmpresaFilter] = useState([]);
  const [uebFilter, setUebFilter] = useState([]);

  const optionEmpresas =
    empresas &&
    empresas
      .filter((item) => item.cargar_empresa === false)
      .map((item) => ({
        value: item.id_empresa,
        label: item.nombre_empresa,
      }));

  const optionUebs =
    uebs &&
    uebs
      .filter((item) =>
        empresaFilter && empresaFilter.value
          ? item.id_empresa === empresaFilter.value
          : true
      )
      .map((item) => ({
        value: item.id_ueb,
        label: item.nombre_ueb,
      }));
  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleEmpresaFilterChange = (data) => {
    data ? setEmpresaFilter(data) : setEmpresaFilter([]);
  };
  const handleUebFilterChange = (data) => {
    data ? setUebFilter(data) : setUebFilter([]);
  };
  const limpiarFiltrados = () => {
    setNameFilter("");
    setEmpresaFilter([]);
    setUebFilter([]);
  };
  const filteredData = direcciones.filter(
    (item) =>
      (empresaFilter.length === 0 ||
        uebPorId(item.id_ueb).id_empresa === empresaFilter.value) &&
      (uebFilter.length === 0 || item.id_ueb === uebFilter.value) &&
      item.nombre_direccion.toLowerCase().includes(nameFilter.toLowerCase())
  );

  // sms de confirmacion
  const [data, setData] = useState("");

  function openConfirmation(data) {
    // event.preventDefault();
    setOpen(true);
    setData(data);
  }

  // function handleDelete(idNum) {
  //   const newDireccion = direcciones.filter((direccion) => direccion.id !== idNum);
  //   setDirecciones(newDireccion);
  //   setOpen(false);
  // }

  const vinculado = (id_direccion) => {
    const area = areas.find(
      (dato) => dato.id_direccion === id_direccion
    );
    return area ? true : false;
  };
  const [openDialogAdvertencia, setOpenDialogAdvertencia] = useState(false);
  const handleCloseDialogAdvertencia = () => {
    setOpenDialogAdvertencia(false);
  };


  const [error, setError] = useState(null);
  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/direccion/${id}`
      );
      if (response.status === 200) {
        const newDatos = direcciones.filter(
          (direccion) => direccion.id_direccion !== id
        );
        setDirecciones(newDatos);
        // Calcula el número total de páginas después de la eliminación
        const totalPages = Math.ceil(newDatos.length / rowsPerPage) - 1;

        // Si la página actual está fuera del rango, restablécela a la última página disponible
        if (page > totalPages) {
          setPage(totalPages);
        }
        setOpen(false);
      } else {
        throw new Error("Error al eliminar la dirección");
      }
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un problema al eliminar la dirección. Por favor, inténtalo de nuevo."
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

  const direccionUpdate = (updatedRow) => {
    // Crea una copia de los datos de la tabla
    const updatedDireccionData = [...direcciones];

    // Actualiza los datos de la fila que se está editando
    updatedDireccionData[editIIdx] = updatedRow;

    // Actualiza el estado de los datos en la tabla
    setDirecciones(updatedDireccionData);
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
                  FormComponent={DireccionForm}
                  setDirecciones={setDirecciones}
                  direcciones={direcciones}
                  onSave={() => {
                    setDialogOpen(false);
                  }}
                  onCancel={() => {
                    setDialogOpen(false);
                  }}
                  empresas={empresas}
                  uebPorId={uebPorId}
                  uebs={uebs}
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
                {direcciones.length === 0 && (
                  <div className={styles.divIconH2}>
                    <h5> No hay direcciones</h5>{" "}
                  </div>
                )}
                {direcciones.length === 0 || (
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell className={styles.spacing}>
                          Empresa
                          {showFilters && (
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
                          )}
                        </TableCell>
                        <TableCell className={styles.spacing}>
                          Ueb
                          {showFilters && (
                            <Select
                              styles={customStyles}
                              className={styles.selectGestionesGantt}
                              defaultValue={uebFilter}
                              onChange={(uebFilter) => {
                                handleUebFilterChange(uebFilter);
                              }}
                              options={optionUebs}
                              placeholder="Ueb"
                              isClearable
                            />
                          )}
                        </TableCell>
                        <TableCell className={styles.spacing}>
                          Dirección
                          {showFilters && (
                            <input
                              className={styles.inputFilter}
                              type="text"
                              value={nameFilter}
                              onChange={handleNameFilterChange}
                              placeholder="Filtrar por dirección"
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
                        .map((direccion) => (
                          <TableRow
                            key={direccion.id_direccion}
                            className={styles.trStyle}
                          >
                            <TableCell className={styles.tdStyle}>
                              {nombreEmpresa(
                                uebPorId(direccion.id_ueb).id_empresa
                              )}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              {nombreUeb(direccion.id_ueb)}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              {direccion.nombre_direccion}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              <FontAwesomeIcon
                                icon={faEdit}
                                onClick={() =>
                                  setEditIIdx(
                                    filteredData.findIndex(
                                      (item) =>
                                        item.id_direccion ===
                                        direccion?.id_direccion
                                    )
                                  )
                                }
                                className={styles.faIcon}
                              />
                              <FontAwesomeIcon
                                icon={faTrash}
                                onClick={() =>
                                  vinculado(direccion?.id_direccion)
                                    ? setOpenDialogAdvertencia(true)
                                    : openConfirmation(direccion?.id_direccion)
                                }
                                data-task-id={direccion?.id_direccion}
                                className={styles.faIcon}
                              />
                              <Dialog
                                open={open}
                                onClose={handleClose}
                                BackdropProps={{ invisible: true }}
                              >
                                <DialogTitle>Confirmar Eliminación</DialogTitle>
                                <DialogContent>
                                  <p>
                                    ¿Está seguro de eliminar esta dirección?
                                  </p>
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
                <Alert severity="warning">
                  <AlertTitle>Advertencia</AlertTitle>
                  No se puede eliminar una dirección que ya esté vinculada a
                  un área
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
                FormComponent={DireccionForm}
                setDirecciones={setDirecciones}
                direcciones={direcciones}
                direccion={direcciones[editIIdx]}
                onSave={handleSaveI}
                onCancel={handleCancelI}
                empresas={empresas}
                uebPorId={uebPorId}
                uebs={uebs}
                nombreEmpresa={nombreEmpresa}
                nombreUeb={nombreUeb}
              ></FormDialog>
            </TableContainer>
          </div>
        </div>
      </>
    );
  }
}

export default DireccionTable;
