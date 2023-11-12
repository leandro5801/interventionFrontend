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
import TrabajadorForm from "../Forms/TrabajadorForm";

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

function TrabajadorTable({
  trabajadores,
  setTrabajadores,
  empresas,
  uebs,
  direcciones,
  areas,
  cargando,
}) {
  //para retornar el nombre de la empresa y no el id
  const uebPorId = (idUeb) => {
    const ueb = uebs.find((e) => e.idUeb === idUeb);
    return ueb;
  };
  const direccionPorId = (idDireccion) => {
    const direccion = direcciones.find((e) => e.idDireccion === idDireccion);
    return direccion;
  };
  const areaPorId = (idArea) => {
    const area = areas.find((e) => e.idArea === idArea);
    return area;
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
  const nombreArea = (idArea) => {
    const area = areas.find((e) => e.idArea === idArea);
    const name = area ? area.nombreArea : "no se encontro el nombre";
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
  const [areaFilter, setAreaFilter] = useState([]);

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

  const optionAreas =
    areas &&
    areas
      .filter((item) =>
        structureFilter && structureFilter.value
          ? item.idDireccion === structureFilter.value
          : true
      )
      .map((item) => ({
        value: item.idArea,
        label: item.nombreArea,
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
  const handleAreaFilterChange = (data) => {
    data ? setAreaFilter(data) : setAreaFilter([]);
  };
  const limpiarFiltrados = () => {
    setNameFilter("");
    setEmpresaFilter([]);
    setUebFilter([]);
    setStructureFilter([]);
    setAreaFilter([]);
  };
  const filteredData = trabajadores.filter(
    (item) =>
      item.nombreTrabajador.toLowerCase().includes(nameFilter.toLowerCase()) &&
      (empresaFilter.length === 0 ||
        uebPorId(direccionPorId(areaPorId(item.idArea).idDireccion).idUeb)
          .idEmpresa === empresaFilter.value) &&
      (uebFilter.length === 0 ||
        direccionPorId(areaPorId(item.idArea).idDireccion).idUeb ===
          uebFilter.value) &&
      (structureFilter.length === 0 ||
        areaPorId(item.idArea).idDireccion === structureFilter.value) &&
      (areaFilter.length === 0 || item.idArea === areaFilter.value)
  );
  // sms de confirmacion
  const [data, setData] = useState("");

  function openConfirmation(data) {
    // event.preventDefault();
    setOpen(true);
    setData(data);
  }

  // function handleDelete(idNum) {
  //   const newTrabajador = trabajadores.filter(
  //     (trabajador) => trabajador.id !== idNum
  //   );
  //   setTrabajadores(newTrabajador);
  //   setOpen(false);
  // }
  const [error, setError] = useState(null);
  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/trabajador/${id}`
      );
      if (response.status === 200) {
        setAreas(
          trabajadores.filter((trabajador) => trabajador.idTrabajador !== id)
        );
        setOpen(false);
      } else {
        throw new Error("Error al eliminar el trabajador");
      }
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un problema al eliminar el trabajador. Por favor, inténtalo de nuevo."
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

  const trabajadorUpdate = (updatedRow) => {
    // Crea una copia de los datos de la tabla
    const updatedTrabajadoresData = [...trabajadores];

    // Actualiza los datos de la fila que se está editando
    updatedTrabajadoresData[editIIdx] = updatedRow;

    // Actualiza el estado de los datos en la tabla
    setTrabajadores(updatedTrabajadoresData);
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
                    FormComponent={TrabajadorForm}
                    setTrabajadores={setTrabajadores}
                    trabajadores={trabajadores}
                    onSave={() => {
                      setDialogOpen(false);
                    }}
                    onCancel={() => {
                      setDialogOpen(false);
                    }}
                    empresas={empresas}
                    uebs={uebs}
                    direcciones={direcciones}
                    areas={areas}
                    uebPorId={uebPorId}
                  direccionPorId={direccionPorId}
                  areaPorId={areaPorId}
                  nombreEmpresa={nombreEmpresa}
                  nombreUeb={nombreUeb}
                  nombreDireccion={nombreDireccion}
                  nombreArea={nombreArea}
                  ></FormDialog>
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
                {trabajadores.length === 0 && (
                  <div className={styles.divIconH2}>
                    <h5> No hay trabajadores</h5>{" "}
                  </div>
                )}
                {trabajadores.length === 0 || (
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
                          Área
                          {showFilters && (
                            <Select
                              styles={customStyles}
                              className={styles.selectGestionesGantt}
                              defaultValue={areaFilter}
                              onChange={(areaFilter) => {
                                handleAreaFilterChange(areaFilter);
                              }}
                              options={optionAreas}
                              placeholder="Área"
                              isClearable
                            />
                          )}
                        </TableCell>
                        <TableCell className={styles.spacing}>
                          Trabajador
                          {showFilters && (
                            <input
                              className={styles.inputFilter}
                              type="text"
                              value={nameFilter}
                              onChange={handleNameFilterChange}
                              placeholder="Filtrar por trabajador"
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
                        .map((trabajador) => (
                          <TableRow
                            key={trabajador.idTrabajador}
                            className={styles.trStyle}
                          >
                            <TableCell className={styles.tdStyle}>
                              {nombreEmpresa(
                                uebPorId(
                                  direccionPorId(
                                    areaPorId(trabajador.idArea).idDireccion
                                  ).idUeb
                                ).idEmpresa
                              )}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              {nombreUeb(
                                direccionPorId(
                                  areaPorId(trabajador.idArea).idDireccion
                                ).idUeb
                              )}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              {nombreDireccion(
                                areaPorId(trabajador.idArea).idDireccion
                              )}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              {nombreArea(trabajador.idArea)}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              {trabajador.nombreTrabajador}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              <FontAwesomeIcon
                                icon={faEdit}
                                onClick={() =>
                                  setEditIIdx(
                                    filteredData.findIndex(
                                      (item) => item.idTrabajador === trabajador?.idTrabajador
                                    )
                                  )
                                }
                                className={styles.faIcon}
                              />
                              <FontAwesomeIcon
                                icon={faTrash}
                                onClick={() => openConfirmation(trabajador?.idTrabajador)}
                                data-task-id={trabajador?.idTrabajador}
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
                                    ¿Está seguro de eliminar este trabajador?
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
                <FormDialog
                  open={editIIdx !== -1}
                  onClose={handleCancelI}
                  FormComponent={TrabajadorForm}
                  setTrabajadores={setTrabajadores}
                  trabajador={trabajadores[editIIdx]}
                  trabajadores={trabajadores}
                  onSave={handleSaveI}
                  onCancel={handleCancelI}
                  empresas={empresas}
                  uebs={uebs}
                  direcciones={direcciones}
                  areas={areas}
                  uebPorId={uebPorId}
                  direccionPorId={direccionPorId}
                  areaPorId={areaPorId}
                  nombreEmpresa={nombreEmpresa}
                  nombreUeb={nombreUeb}
                  nombreDireccion={nombreDireccion}
                  nombreArea={nombreArea}
                ></FormDialog>
              </TableContainer>
            </div>
          
        </div>
      </>
    );
  }
}

export default TrabajadorTable;
