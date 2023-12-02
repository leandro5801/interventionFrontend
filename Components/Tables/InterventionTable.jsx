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
import IntervrntionForm from "../Forms/IntervrntionForm";

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

function InterventionTable({
  interventions,
  setInterventions,
  projects,
  empresas,
  uebs,
  direcciones,
  areas,
  trabajadores,
  consultores,
  consultor,
  cargando,
  recomendations,
}) {
  //para retornar el nombre de y no el id
  const uebPorId = (id_ueb) => {
    const ueb = uebs.find((e) => e.id_ueb === id_ueb);
    if (!ueb) {
      console.error(`No se encontró ninguna UEB con id_ueb: ${id_ueb}`);
      return;
    }
    return ueb;
  };
  const direccionPorId = (id_direccion) => {
    const direccion = direcciones.find((e) => e.id_direccion === id_direccion);
    if (!direccion) {
      console.error(
        `No se encontró ninguna direccion con idUeb: ${id_direccion}`
      );
      return;
    }
    return direccion;
  };
  const areaPorId = (id_area) => {
    const area = areas.find((e) => e.id_area === id_area);
    return area;
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
  const nombreDireccion = (id_direccion) => {
    const direccion = direcciones.find((e) => e.id_direccion === id_direccion);
    const name = direccion
      ? direccion.nombre_direccion
      : "no se encontro el nombre";
    return name;
  };
  const nombreArea = (idArea) => {
    const area = areas.find((e) => e.idArea === idArea);
    const name = area ? area.nombreArea : "no se encontro el nombre";
    return name;
  };
  const nombreConsultor = (id_consultor) => {
    const consultor = consultores.find(
      (consultor) => consultor.id_consultor === id_consultor
    );
    const name = consultor
      ? consultor.nombre_consultor
      : "no se encontro el nombre";
    return name;
  };
  const nombreTrabajador = (id_trabajador) => {
    const trabajador = trabajadores.find(
      (trabajador) => trabajador.id_trabajador === id_trabajador
    );
    const name = trabajador
      ? trabajador.nombre_trabajador
      : "no se encontro el nombre";
    return name;
  };
  const nombreProyecto = (id_proyecto) => {
    const proyecto = projects.find(
      (proyecto) => proyecto.id_proyecto === id_proyecto
    );
    const name = proyecto
      ? proyecto.nombre_proyecto
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
  const [dialogCreInteOpen, setDialogCreInteOpen] = useState(false);

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
  const optionConsultores =
    consultores &&
    consultores.map((item) => ({
      value: item.id_consultor,
      label: item.nombre_consultor,
    }));

  const [nameFilter, setNameFilter] = useState("");
  const [descriptionFilter, setDescriptionFilter] = useState("");
  const [structureFilter, setStructureFilter] = useState([]);
  const [areaFilter, setAreaFilter] = useState([]);
  const [consultorFilter, setConsultorFilter] = useState([]);
  const [workerFilter, setWorkerFilter] = useState("");
  const [startFilter, setStartFilter] = useState("");

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleDescriptionFilterChange = (event) => {
    setDescriptionFilter(event.target.value);
  };

  const handleWorkerFilterChange = (event) => {
    setWorkerFilter(event.target.value);
  };
  const handleStartFilterChange = (event) => {
    setStartFilter(event.target.value);
  };
  const handleProjectFilterChange = (data) => {
    data ? setProjectFilter(data) : setProjectFilter([]);
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
  const handleConsultorFilterChange = (data) => {
    data ? setConsultorFilter(data) : setConsultorFilter([]);
  };

  const limpiarFiltrados = () => {
    setProjectFilter([]);
    setEmpresaFilter([]);
    setUebFilter([]);
    setStructureFilter([]);
    setAreaFilter([]);
    setConsultorFilter([]);
    setStartFilter("");
    setNameFilter("");
    setDescriptionFilter("");
    setWorkerFilter("");
  };
  //para los select de proyecto, empresa etc
  const [projectFilter, setProjectFilter] = useState([]);
  const [empresaFilter, setEmpresaFilter] = useState([]);
  const [uebFilter, setUebFilter] = useState([]);

  const optionProjects =
    projects &&
    projects.map((item) => ({
      value: item.id_proyecto,
      label: item.nombre_proyecto,
    }));
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

  const optionAreas =
    areas &&
    areas
      .filter((item) =>
        structureFilter && structureFilter.value
          ? item.id_direccion === structureFilter.value
          : true
      )
      .map((item) => ({
        value: item.id_area,
        label: item.nombre_area,
      }));
  //-----------------------------------------------

  const filteredData = interventions.filter(
    (item) =>
      (projectFilter.length === 0 ||
        item.id_proyecto === projectFilter.value) &&
      (empresaFilter.length === 0 ||
        uebPorId(direccionPorId(areaPorId(item.id_area).idDireccion).idUeb)
          .id_empresa === empresaFilter.value) &&
      (uebFilter.length === 0 ||
        direccionPorId(areaPorId(item.id_area).idDireccion).idUeb ===
          uebFilter.value) &&
      (structureFilter.length === 0 ||
        areaPorId(item.id_area).idDireccion === structureFilter.value) &&
      (areaFilter.length === 0 || item.id_area === areaFilter.value) &&
      item.nombre_intervencion
        .toLowerCase()
        .includes(nameFilter.toLowerCase()) &&
      item.descripcion
        .toLowerCase()
        .includes(descriptionFilter.toLowerCase()) &&
      (consultorFilter.length === 0 ||
        item.id_consultor === consultorFilter.value) &&
      nombreTrabajador(item.id_trabajador)
        .toLowerCase()
        .includes(workerFilter.toLowerCase()) &&
      item.start_date.toLowerCase().includes(startFilter.toLowerCase())
  );

  // sms de confirmacion
  const [data, setData] = useState("");

  function openConfirmation(data) {
    // event.preventDefault();
    setOpen(true);
    setData(data);
  }

  // function handleDelete(idNum) {
  //   const newIntervention = interventions.filter(
  //     (intervencion) => intervencion.id !== idNum
  //   );
  //   setInterventions(newIntervention);
  //   setOpen(false);
  // }

  const vinculado = (id_intervencion) => {
    const recomendacion = recomendations.find(
      (dato) => dato.id_intervencion === id_intervencion
    );
    return recomendacion ? true : false;
  };
  const [openDialogAdvertencia, setOpenDialogAdvertencia] = useState(false);
  const handleCloseDialogAdvertencia = () => {
    setOpenDialogAdvertencia(false);
  };

  const [error, setError] = useState(null);
  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/intervencion/${id}`
      );
      if (response.status === 200) {
        const newDatos = interventions.filter(
          (intervencion) => intervencion.id_intervencion !== id
        );
        setInterventions(newDatos);
        // Calcula el número total de páginas después de la eliminación
        const totalPages = Math.ceil(newDatos.length / rowsPerPage) - 1;

        // Si la página actual está fuera del rango, restablécela a la última página disponible
        if (page > totalPages) {
          setPage(totalPages);
        }
        setOpen(false);
      } else {
        throw new Error("Error al eliminar la intervencion");
      }
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un problema al eliminar la intervencion. Por favor, inténtalo de nuevo."
      );
    }
  }

  // Para editar una intervencion desde la tabla

  const [editIIdx, setEditIIdx] = useState(-1);

  const handleSaveI = () => {
    setEditIIdx(-1);
  };

  const handleCancelI = () => {
    setEditIIdx(-1);
  };

  const interventionUpdate = (updatedRow) => {
    // Crea una copia de los datos de la tabla
    const updatedInterventonsData = [...interventions];

    // Actualiza los datos de la fila que se está editando
    updatedInterventonsData[editIIdx] = updatedRow;

    // Actualiza el estado de los datos en la tabla
    setInterventions(updatedInterventonsData);
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
                    setDialogCreInteOpen(true);
                  }}
                >
                  Nuevo +
                </Button>
                <FormDialog
                  open={dialogCreInteOpen}
                  onClose={() => {
                    setDialogCreInteOpen(false);
                  }}
                  FormComponent={IntervrntionForm}
                  setInterventions={setInterventions}
                  interventions={interventions}
                  onSave={() => {
                    setDialogCreInteOpen(false);
                  }}
                  onCancel={() => {
                    setDialogCreInteOpen(false);
                  }}
                  consultores={consultores}
                  trabajadores={trabajadores}
                  empresas={empresas}
                  uebs={uebs}
                  direcciones={direcciones}
                  areas={areas}
                  projects={projects}
                  nombreEmpresa={nombreEmpresa}
                  nombreUeb={nombreUeb}
                  nombreTrabajador={nombreTrabajador}
                  nombreDireccion={nombreDireccion}
                  nombreArea={nombreArea}
                  nombreConsultor={nombreConsultor}
                  nombreProyecto={nombreProyecto}
                  areaPorId={areaPorId}
                  direccionPorId={direccionPorId}
                  uebPorId={uebPorId}
                  consultor={consultor}
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
              <div className={styles.filtrosEstructuraContentInt}>
                {/* SELECCIONAR PROYECTO ETC */}

                {showFilters && (
                  <Select
                    styles={customStyles}
                    className={styles.selectGestiones}
                    defaultValue={empresaFilter}
                    onChange={(empresaFilter) => {
                      handleEmpresaFilterChange(empresaFilter);
                    }}
                    options={optionEmpresas}
                    placeholder="Empresa"
                    isClearable
                  />
                )}
                {showFilters && (
                  <Select
                    styles={customStyles}
                    className={styles.selectGestiones}
                    defaultValue={uebFilter}
                    onChange={(uebFilter) => {
                      handleUebFilterChange(uebFilter);
                    }}
                    options={optionUebs}
                    placeholder="Ueb"
                    isClearable
                  />
                )}
                {showFilters && (
                  <Select
                    styles={customStyles}
                    className={styles.selectGestiones}
                    defaultValue={structureFilter}
                    onChange={(structureFilter) => {
                      handleStructureFilterChange(structureFilter);
                    }}
                    options={optionDirecciones}
                    placeholder="Dirección"
                    isClearable
                  />
                )}
                {showFilters && (
                  <Select
                    styles={customStyles}
                    className={styles.selectGestiones}
                    defaultValue={areaFilter}
                    onChange={(areaFilter) => {
                      handleAreaFilterChange(areaFilter);
                    }}
                    options={optionAreas}
                    placeholder="Área"
                    isClearable
                  />
                )}
                <div className={styles.divFechaFilter}>
                  {showFilters && (
                    <input
                      className={styles.inputFilter}
                      type="date"
                      value={startFilter}
                      onChange={handleStartFilterChange}
                      placeholder="Filtrar por fecha"
                    />
                  )}
                </div>
              </div>
              <>
                {interventions.length === 0 && (
                  <div className={styles.divIconH2}>
                    <h5> No hay Intervenciones</h5>{" "}
                  </div>
                )}
                {interventions.length === 0 || (
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell className={styles.letraEnNegrita}>
                          Proyecto
                          {showFilters && (
                            <Select
                              styles={customStyles}
                              className={styles.selectGestionesGantt}
                              defaultValue={projectFilter}
                              onChange={(projectFilter) => {
                                handleProjectFilterChange(projectFilter);
                              }}
                              options={optionProjects}
                              placeholder="Proyecto"
                              isClearable
                            />
                          )}
                        </TableCell>
                        <TableCell className={styles.letraEnNegrita}>
                          Intervención
                          {showFilters && (
                            <input
                              className={styles.inputFilter}
                              type="text"
                              value={nameFilter}
                              onChange={handleNameFilterChange}
                              placeholder="Filtrar por intervención"
                            />
                          )}
                        </TableCell>

                        <TableCell className={styles.letraEnNegrita}>
                          Descripción
                          {showFilters && (
                            <input
                              className={styles.inputFilter}
                              type="text"
                              value={descriptionFilter}
                              onChange={handleDescriptionFilterChange}
                              placeholder="Filtrar por descripción"
                            />
                          )}
                        </TableCell>
                        <TableCell className={styles.letraEnNegrita}>
                          Consultor
                          {showFilters && (
                            <Select
                              styles={customStyles}
                              className={styles.selectGestionesGantt}
                              defaultValue={consultorFilter}
                              onChange={(consultorFilter) => {
                                handleConsultorFilterChange(consultorFilter);
                              }}
                              options={optionConsultores}
                              placeholder="Consultor"
                              isClearable
                            />
                          )}
                        </TableCell>
                        <TableCell className={styles.letraEnNegrita}>
                          Trabajador
                          {showFilters && (
                            <input
                              className={styles.inputFilter}
                              type="text"
                              value={workerFilter}
                              onChange={handleWorkerFilterChange}
                              placeholder="Filtrar por trabajador"
                            />
                          )}
                        </TableCell>
                        <TableCell
                          className={styles.letraEnNegrita}
                        ></TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {filteredData
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((tsk) => (
                          <TableRow key={tsk.id_intervencion}>
                            <TableCell>
                              {nombreProyecto(tsk.id_proyecto)}
                            </TableCell>
                            <TableCell>{tsk.nombre_intervencion}</TableCell>
                            <TableCell>{tsk.descripcion}</TableCell>

                            <TableCell>
                              {nombreConsultor(tsk.id_consultor)}
                            </TableCell>
                            <TableCell>
                              {nombreTrabajador(tsk.id_trabajador)}
                            </TableCell>
                            <TableCell>
                              <FontAwesomeIcon
                                icon={faEdit}
                                onClick={() =>
                                  setEditIIdx(
                                    interventions.findIndex(
                                      (item) =>
                                        item.id_intervencion ===
                                        tsk?.id_intervencion
                                    )
                                  )
                                }
                                className={styles.faIcon}
                              />
                              <FontAwesomeIcon
                                icon={faTrash}
                                onClick={() =>
                                  vinculado(tsk?.id_intervencion)
                                    ? setOpenDialogAdvertencia(true)
                                    : openConfirmation(tsk?.id_intervencion)
                                }
                                data-task-id={tsk?.id_intervencion}
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
                                    ¿Está seguro de eliminar esta Intervención?
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
                  No se puede eliminar una intervención que ya esté vinculada a
                  una recomendación
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
                FormComponent={IntervrntionForm}
                interventions={interventions}
                setInterventions={setInterventions}
                intervention={interventions[editIIdx]}
                onSave={handleSaveI}
                onCancel={handleCancelI}
                consultores={consultores}
                consultor={consultor}
                trabajadores={trabajadores}
                empresas={empresas}
                uebs={uebs}
                direcciones={direcciones}
                areas={areas}
                projects={projects}
                nombreEmpresa={nombreEmpresa}
                nombreUeb={nombreUeb}
                nombreTrabajador={nombreTrabajador}
                nombreDireccion={nombreDireccion}
                nombreArea={nombreArea}
                nombreConsultor={nombreConsultor}
                nombreProyecto={nombreProyecto}
                areaPorId={areaPorId}
                direccionPorId={direccionPorId}
                uebPorId={uebPorId}
              ></FormDialog>
            </TableContainer>
          </div>
        </div>
      </>
    );
  }
}

export default InterventionTable;
