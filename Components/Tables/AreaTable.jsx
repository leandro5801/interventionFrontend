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
import AreaForm from "../Forms/AreaForm";

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

function AreaTable({
  areas,
  setAreas,
  empresas,
  uebs,
  direcciones,
  cargando,
  trabajadores,
  uebPorId,
  direccionPorId,
  nombreEmpresa,
  nombreUeb,
  nombreDireccion,
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
  const [empresaFilter, setEmpresaFilter] = useState([]);
  const [uebFilter, setUebFilter] = useState([]);
  const [structureFilter, setStructureFilter] = useState([]);

  const optionEmpresas =
    empresas &&
    empresas.map((item) => ({
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

  const optionDirecciones =
    direcciones &&
    direcciones
      .filter((item) =>
        uebFilter && uebFilter.value ? item.id_ueb === uebFilter.value : true
      )
      .map((item) => ({
        value: item.id_direccion,
        label: item.nombre_direccion,
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

  const handleStructureFilterChange = (data) => {
    data ? setStructureFilter(data) : setStructureFilter([]);
  };
  const limpiarFiltrados = () => {
    setNameFilter("");
    setEmpresaFilter([]);
    setUebFilter([]);
    setStructureFilter([]);
  };
  const filteredData = areas.filter(
    (item) =>
      item.nombre_area.toLowerCase().includes(nameFilter.toLowerCase()) &&
      (empresaFilter.length === 0 ||
        item.id_empresa === empresaFilter.value ||
        !item.id_empresa) &&
      (empresaFilter.length === 0 ||
        uebPorId(direccionPorId(item.id_direccion).id_ueb).id_empresa ===
          empresaFilter.value) &&
      (uebFilter.length === 0 ||
        direccionPorId(item.id_direccion).id_ueb === uebFilter.value) &&
      (structureFilter.length === 0 ||
        item.id_direccion === structureFilter.value)
  );
  // sms de confirmacion
  const [data, setData] = useState("");

  function openConfirmation(data) {
    // event.preventDefault();
    setOpen(true);
    setData(data);
  }

  // function handleDelete(idNum) {
  //   const newArea = areas.filter((area) => area.id !== idNum);
  //   setAreas(newArea);
  //   setOpen(false);
  // }

  const vinculado = (id_area) => {
    const trabajador = trabajadores.find((dato) => dato.id_area === id_area);
    return trabajador ? true : false;
  };
  const [openDialogAdvertencia, setOpenDialogAdvertencia] = useState(false);
  const handleCloseDialogAdvertencia = () => {
    setOpenDialogAdvertencia(false);
  };

  const [error, setError] = useState(null);
  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/area/${id}`
      );
      if (response.status === 200) {
        const newDatos = areas.filter((area) => area.id_area !== id);
        setAreas(newDatos);
        // Calcula el número total de páginas después de la eliminación
        const totalPages = Math.ceil(newDatos.length / rowsPerPage) - 1;

        // Si la página actual está fuera del rango, restablécela a la última página disponible
        if (page > totalPages) {
          setPage(totalPages);
        }
        setOpen(false);
      } else {
        throw new Error("Error al eliminar el área");
      }
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un problema al eliminar el área. Por favor, inténtalo de nuevo."
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

  const areaUpdate = (updatedRow) => {
    // Crea una copia de los datos de la tabla
    const updatedAreasData = [...areas];

    // Actualiza los datos de la fila que se está editando
    updatedAreasData[editIIdx] = updatedRow;

    // Actualiza el estado de los datos en la tabla
    setAreas(updatedAreasData);
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
              <>
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
                    FormComponent={AreaForm}
                    setAreas={setAreas}
                    areas={areas}
                    onSave={() => {
                      setDialogOpen(false);
                    }}
                    onCancel={() => {
                      setDialogOpen(false);
                    }}
                    empresas={empresas}
                    uebs={uebs}
                    direcciones={direcciones}
                    uebPorId={uebPorId}
                    direccionPorId={direccionPorId}
                    nombreEmpresa={nombreEmpresa}
                    nombreUeb={nombreUeb}
                    nombreDireccion={nombreDireccion}
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
                {areas.length === 0 && (
                  <div className={styles.divIconH2}>
                    <h5> No hay areas</h5>{" "}
                  </div>
                )}
                {areas.length === 0 || (
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
                            <Select
                              styles={customStyles}
                              className={styles.selectGestionesGantt}
                              defaultValue={structureFilter}
                              onChange={(structureFilter) => {
                                handleStructureFilterChange(structureFilter);
                              }}
                              options={optionDirecciones}
                              placeholder="Dirección"
                              isClearable
                            />
                          )}
                        </TableCell>
                        <TableCell className={styles.spacing}>
                          Area
                          {showFilters && (
                            <input
                              className={styles.inputFilter}
                              type="text"
                              value={nameFilter}
                              onChange={handleNameFilterChange}
                              placeholder="Filtrar por areas"
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
                        .map((area) => (
                          <TableRow
                            key={area.id_area}
                            className={styles.trStyle}
                          >
                            <TableCell className={styles.tdStyle}>
                              {nombreEmpresa(
                                uebPorId(
                                  direccionPorId(area.id_direccion).id_ueb
                                ).id_empresa
                              )}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              {nombreUeb(
                                direccionPorId(area.id_direccion).id_ueb
                              )}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              {nombreDireccion(area.id_direccion)}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              {area.nombre_area}
                            </TableCell>
                            <TableCell className={styles.tdStyleIcon}>
                              <FontAwesomeIcon
                                icon={faEdit}
                                onClick={() =>
                                  setEditIIdx(
                                    filteredData.findIndex(
                                      (item) => item.id_area === area?.id_area
                                    )
                                  )
                                }
                                className={styles.faIcon}
                              />
                              <FontAwesomeIcon
                                icon={faTrash}
                                onClick={() =>
                                  vinculado(area?.id_area)
                                    ? setOpenDialogAdvertencia(true)
                                    : openConfirmation(area?.id_area)
                                }
                                data-task-id={area?.id_area}
                                className={styles.faIcon}
                              />
                              <Dialog
                                open={open}
                                onClose={handleClose}
                              >
                                <DialogTitle>Confirmar Eliminación</DialogTitle>
                                <DialogContent>
                                  <p>¿Está seguro de eliminar esta area?</p>
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
                  No se puede eliminar un área que ya esté vinculada a
                  trabajadores
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
                FormComponent={AreaForm}
                setAreas={setAreas}
                area={areas[editIIdx]}
                areas={areas}
                uebPorId={uebPorId}
                direccionPorId={direccionPorId}
                nombreEmpresa={nombreEmpresa}
                nombreUeb={nombreUeb}
                nombreDireccion={nombreDireccion}
                onSave={handleSaveI}
                onCancel={handleCancelI}
                empresas={empresas}
                uebs={uebs}
                direcciones={direcciones}
              ></FormDialog>
            </TableContainer>
          </div>
        </div>
      </>
    );
  }
}

export default AreaTable;
