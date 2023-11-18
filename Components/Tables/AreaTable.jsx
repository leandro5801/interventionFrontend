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
} from "@mui/material";

import Select from "react-select";

function AreaTable({ areas, setAreas, empresas, uebs, direcciones, cargando }) {
  //para retornar el nombre de la empresa y no el id
  const uebPorId = (idUeb) => {
    const ueb = uebs.find((e) => e.idUeb === idUeb);
    if (!ueb) {
      console.error(`No se encontró ninguna UEB con idUeb: ${idUeb}`);
      return;
    }
    return ueb;
  };
  const direccionPorId = (idDireccion) => {
    const direccion = direcciones.find((e) => e.idDireccion === idDireccion);
    return direccion;
  };
  const nombreEmpresa = (idEmpresa) => {
    const empresa = empresas.find((e) => e.idEmpresa === idEmpresa);
    const name = empresa ? empresa.nombreEmpresa : "no se encontro el nombre";
    return name;
  };
  const nombreUeb = (idUeb) => {
    const ueb = uebs.find((e) => e.idUeb === idUeb);
    const name = ueb ? ueb.nombreUeb : "no se encontro el nombre";
    return name;
  };
  const nombreDireccion = (idDireccion) => {
    const direccion = direcciones.find((e) => e.idDireccion === idDireccion);
    const name = direccion
      ? direccion.nombreDireccion
      : "no se encontro el nombre";
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
  const [structureFilter, setStructureFilter] = useState([]);

  const optionEmpresas =
    empresas &&
    empresas.map((item) => ({
      value: item.idEmpresa,
      label: item.nombreEmpresa,
    }));

  const optionUebs =
    uebs &&
    uebs
      .filter((item) =>
        empresaFilter && empresaFilter.value
          ? item.idEmpresa === empresaFilter.value
          : true
      )
      .map((item) => ({
        value: item.idUeb,
        label: item.nombreUeb,
      }));

  const optionDirecciones =
    direcciones &&
    direcciones
      .filter((item) =>
        uebFilter && uebFilter.value ? item.idUeb === uebFilter.value : true
      )
      .map((item) => ({
        value: item.idDirecciones,
        label: item.nombreDirecciones,
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
      item.nombreArea.toLowerCase().includes(nameFilter.toLowerCase()) &&
      (empresaFilter.length === 0 || item.empresa === empresaFilter.label) &&
      (empresaFilter.length === 0 ||
        uebPorId(direccionPorId(item.idDireccion).idUeb).idEmpresa ===
          empresaFilter.value) &&
      (uebFilter.length === 0 ||
        direccionPorId(item.idDireccion).idUeb === uebFilter.value) &&
      (structureFilter.length === 0 ||
        item.idDireccion === structureFilter.value)
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

  const [error, setError] = useState(null);
  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/area/${id}`
      );
      if (response.status === 200) {
        setAreas(areas.filter((area) => area.idArea !== id));
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
                            key={area.idArea}
                            className={styles.trStyle}
                          >
                            <TableCell className={styles.tdStyle}>
                              {/* {nombreEmpresa(
                              uebPorId(direccionPorId(area.idDireccion).idUeb)
                                .idEmpresa
                            )} */}

                              {nombreEmpresa(
                                uebPorId(direccionPorId(area.idDireccion).idUeb)
                                  .idEmpresa
                              )}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              {nombreUeb(
                                direccionPorId(area.idDireccion).idUeb
                              )}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              {nombreDireccion(area.idDireccion)}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              {area.nombreArea}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              <FontAwesomeIcon
                                icon={faEdit}
                                onClick={() =>
                                  setEditIIdx(
                                    filteredData.findIndex(
                                      (item) => item.idArea === area?.idArea
                                    )
                                  )
                                }
                                className={styles.faIcon}
                              />
                              <FontAwesomeIcon
                                icon={faTrash}
                                onClick={() => openConfirmation(area?.idArea)}
                                data-task-id={area?.idArea}
                                className={styles.faIcon}
                              />
                              <Dialog
                                open={open}
                                onClose={handleClose}
                                BackdropProps={{ invisible: true }}
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
