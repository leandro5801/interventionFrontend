import styles from "../../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";
import Select from "react-select";
import { customStyles } from "../../styles/SelectFilterStyles";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import Settings from "../GanttChart/Settings";
import DialogForm from "../Forms/Dialog";
import FormDialog from "../Forms/FormDialog";
import RecomendationEditForm from "../Forms/RecomendationEditForm";
import CreateRecomendationForm from "../Forms/RecomendationCreateForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faPlus,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import FilterListOffOutlinedIcon from "@mui/icons-material/FilterListOffOutlined";

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

function RecomendationTable({
  filtredRecomendations,
  recomendations,
  setRecomendations,
  interventions,
  projects,
  consultores,
  consultor,
  clasificaciones,
  cargando,
}) {
  //para retornar la intervencion
  const intervencionPorId = (id_intervencion) => {
    const intervention = interventions.find(
      (e) => e.id_intervencion === id_intervencion
    );
    return intervention;
  };
  const proyectoPorId = (id_proyecto) => {
    const proyecto = projects.find((e) => e.id_proyecto === id_proyecto);
    return proyecto;
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

  const nombreIntervencion = (id_intervencion) => {
    const intervencion = interventions.find(
      (intervencion) => intervencion.id_intervencion === id_intervencion
    );
    const name = intervencion
      ? intervencion.nombre_intervencion
      : "no se encontro el nombre";
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

  const nombreClasificacion = (id_clasificacion) => {
    const clasificacion = clasificaciones.find(
      (clasificacion) => clasificacion.id_clasificacion === id_clasificacion
    );
    const name = clasificacion
      ? clasificacion.nombre_clasificacion
      : "no se encontro el nombre";
    return name;
  };

  const isFollow = (follow) => {
    const name = follow ? "Sí" : "No";
    return name;
  };

  //para los select de proyecto etc
  const [selectedOption, setSelectedOption] = useState(null);

  //Para abrir formulario de crear recomendacion
  //para el formulario
  const [dialogCreRecOpen, setDialogRecOpen] = useState(false);

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
  // Para editar una recomendacion desde la tabla

  const [editRIdx, setEditRIdx] = useState(-1);

  const handleSaveR = () => {
    setEditRIdx(-1);
  };

  const handleCancelR = () => {
    setEditRIdx(-1);
  };

  const recomendationUpdate = (updatedRow) => {
    // Crea una copia de los datos de la tabla
    const updatedTableRData = [...filtredRecomendations];

    // Actualiza los datos de la fila que se está editando
    updatedTableRData[editRIdx] = updatedRow;

    // Actualiza el estado de los datos en la tabla
    setRecomendations(updatedTableRData);
  };

  //  Para el filtrado por criterios (consultor, trabajador)
  const [showFilters, setShowFilters] = useState(false);

  // Alternar la visibilidad de las opciones de filtrado y restablecer los valores de filtrado
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  //para filtrar por proyecto e intervencion
  const [projectFilter, setProjectFilter] = useState([]);
  const optionProjects =
    projects &&
    projects.map((item) => ({
      value: item.id_proyecto,
      label: item.nombre_proyecto,
    }));
  const [interventionFilter, setInterventionFilter] = useState([]);
  const optioninterventions =
    interventions &&
    interventions
      .filter((item) =>
        projectFilter && projectFilter.value
          ? item.id_proyecto === projectFilter.value
          : true
      )
      .map((item) => ({
        value: item.id_intervencion,
        label: item.nombre_intervencion,
      }));
  const handleProjectFilterChange = (data) => {
    data ? setProjectFilter(data) : setProjectFilter([]);
  };
  const handleInterventionFilterChange = (data) => {
    data ? setInterventionFilter(data) : setInterventionFilter([]);
  };

  //Para filtrar la tabla
  const optionConsultores =
    consultores &&
    consultores.map((item) => ({
      value: item.id_consultor,
      label: item.nombre_consultor,
    }));
  const optionClasificaciones =
    clasificaciones &&
    clasificaciones.map((item) => ({
      value: item.id_clasificacion,
      label: item.nombre_clasificacion,
    }));
  const [nameFilter, setNameFilter] = useState("");
  const [descriptionFilter, setDescriptionFilter] = useState("");
  const [consultorFilter, setConsultorFilter] = useState([]);
  const [fechaFilter, setFechaFilter] = useState("");
  const [classificationFilter, setClassificationFilter] = useState([]);
  const [followFilter, setFollowFilter] = useState("");

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleDescriptionFilterChange = (event) => {
    setDescriptionFilter(event.target.value);
  };
  const handleConsultorFilterChange = (data) => {
    data ? setConsultorFilter(data) : setConsultorFilter([]);
  };
  const handleFechaFilterChange = (event) => {
    setFechaFilter(event.target.value);
  };
  const handleClassificationFilterChange = (data) => {
    data ? setClassificationFilter(data) : setClassificationFilter([]);
  };
  const handleFollowFilterChange = (event) => {
    setFollowFilter(event.target.value);
  };
  const limpiarFiltrados = () => {
    setProjectFilter([]);
    setInterventionFilter([]);
    setConsultorFilter([]);
    setClassificationFilter([]);
    setNameFilter("");
    setDescriptionFilter("");
    setFechaFilter("");
    setFollowFilter("");
  };
  const filteredData = filtredRecomendations.filter(
    (item) =>
      (projectFilter.length === 0 ||
        intervencionPorId(item.id_intervencion).id_proyecto ===
          projectFilter.value) &&
      (interventionFilter.length === 0 ||
        item.id_intervencion === interventionFilter.value) &&
      item.nombre_recomendacion
        .toLowerCase()
        .includes(nameFilter.toLowerCase()) &&
      item.descripcion_recomendacion
        .toLowerCase()
        .includes(descriptionFilter.toLowerCase()) &&
      (consultorFilter.length === 0 ||
        item.id_consultor === consultorFilter.value) &&
      (classificationFilter.length === 0 ||
        item.id_clasificacion === classificationFilter.value) &&
      isFollow(item.seguimiento)
        .toLowerCase()
        .includes(followFilter.toLowerCase()) &&
      item.fecha_recomendacion.toLowerCase().includes(fechaFilter.toLowerCase())
  );

  // sms de confirmacion
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");

  function openConfirmation(data) {
    // event.preventDefault();
    setOpen(true);
    setData(data);
  }

  // function handleDelete(idNum) {
  //   const newRecomendation = recomendations.filter(
  //     (recomendacion) => recomendacion.id !== idNum
  //   );

  //   setRecomendations(newRecomendation);

  //   // update state (if data on backend - make API request to update data)

  //   setOpen(false);
  // }

  const [error, setError] = useState(null);
  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/recomendacion/${id}`
      );
      if (response.status === 200) {
        const newDatos = filtredRecomendations.filter(
          (recomendacion) => recomendacion.id_recomendacion !== id
        );
        setRecomendations(newDatos);
        // Calcula el número total de páginas después de la eliminación
        const totalPages = Math.ceil(newDatos.length / rowsPerPage) - 1;

        // Si la página actual está fuera del rango, restablécela a la última página disponible
        if (page > totalPages) {
          setPage(totalPages);
        }
        setOpen(false);
      } else {
        throw new Error("Error al eliminar la recomendacion");
      }
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un problema al eliminar la recomendacion. Por favor, inténtalo de nuevo."
      );
    }
  }
  const handleClose = () => {
    setOpen(false);
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
        <>
          <div className={styles.divIconH2}></div>
          <TableContainer component={Paper} className={styles.table}>
            <div className={styles.btnNuevoContent}>
              <Button
                className={styles.btn}
                onClick={() => {
                  setDialogRecOpen(true);
                }}
              >
                Nuevo +
              </Button>
              <div className={styles.filtrosEstructuraContentInt}>
                {" "}
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
                 <Select
                  styles={customStyles}
                  className={styles.selectGestionesGantt}
                  defaultValue={interventionFilter}
                  onChange={(interventionFilter) => {
                    handleInterventionFilterChange(interventionFilter);
                  }}
                  options={optioninterventions}
                  placeholder="Intervención"
                  isClearable
                  
                />
              </div>
              <div className={styles.filtrosEstructuraContentInt}>
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
                {showFilters && (
                  <Select
                    styles={customStyles}
                    className={styles.selectGestionesGantt}
                    defaultValue={classificationFilter}
                    onChange={(classificationFilter) => {
                      handleClassificationFilterChange(classificationFilter);
                    }}
                    options={optionClasificaciones}
                    placeholder="Tipo"
                    isClearable
                  />
                )}
              </div>
              <div className={styles.filtrosEstructuraContentInt}>
                {showFilters && (
                  <input
                    className={styles.inputFilter}
                    type="date"
                    value={fechaFilter}
                    onChange={handleFechaFilterChange}
                    placeholder="Filtrar por fecha"
                  />
                )}
              </div>
              <FormDialog
                open={dialogCreRecOpen}
                onClose={() => {
                  setDialogRecOpen(false);
                }}
                FormComponent={CreateRecomendationForm}
                recomendations={recomendations}
                filtredRecomendations={filtredRecomendations}
                classifications={clasificaciones}
                setTableRData={setRecomendations}
                setRecomendations={setRecomendations}
                consultores={consultores}
                consultor={consultor}
                interventions={interventions}
                onSave={() => {
                  setDialogRecOpen(false);
                }}
                onCancel={() => {
                  setDialogRecOpen(false);
                }}
                nombreConsultor={nombreConsultor}
                nombreClasificacion={nombreClasificacion}
                isFollow={isFollow}
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
              {filtredRecomendations.length === 0 && (
                <div className={styles.divIconH2}>
                  <h5> No hay Recomendaciones</h5>{" "}
                </div>
              )}
              {filtredRecomendations.length === 0 || (
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell className={styles.letraEnNegrita}>
                        Proyecto
                      </TableCell>
                      <TableCell className={styles.letraEnNegrita}>
                        Intervención
                      </TableCell>
                      <TableCell className={styles.letraEnNegrita}>
                        Recomendación
                      </TableCell>
                      <TableCell className={styles.letraEnNegrita}>
                        Descripción
                      </TableCell>
                      <TableCell className={styles.letraEnNegrita}>
                        Consultor
                      </TableCell>
                      <TableCell className={styles.letraEnNegrita}>
                        Fecha
                      </TableCell>
                      <TableCell className={styles.letraEnNegrita}>
                        Tipo
                      </TableCell>
                      <TableCell className={styles.letraEnNegrita}>
                        Seguida
                      </TableCell>
                      <TableCell className={styles.letraEnNegrita}></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((recomendation) => (
                        <TableRow key={recomendation.id_recomendacion}>
                          <TableCell>
                            {nombreProyecto(
                              intervencionPorId(recomendation.id_intervencion)
                                .id_proyecto
                            )}
                          </TableCell>
                          <TableCell>
                            {nombreIntervencion(recomendation.id_intervencion)}
                          </TableCell>
                          <TableCell>
                            {recomendation.nombre_recomendacion}
                          </TableCell>
                          <TableCell>
                            {recomendation.descripcion_recomendacion}
                          </TableCell>
                          <TableCell>
                            {nombreConsultor(recomendation.id_consultor)}
                          </TableCell>
                          <TableCell>
                            {recomendation.fecha_recomendacion}
                          </TableCell>
                          <TableCell>
                            {nombreClasificacion(
                              recomendation.id_clasificacion
                            )}
                          </TableCell>
                          <TableCell>
                            {isFollow(recomendation.seguimiento)}
                          </TableCell>
                          <TableCell className={styles.tdStyleIcon}>
                            <FontAwesomeIcon
                              icon={faEdit}
                              onClick={() =>
                                setEditRIdx(
                                  filtredRecomendations.findIndex(
                                    (item) =>
                                      item.id_recomendacion ===
                                      recomendation?.id_recomendacion
                                  )
                                )
                              }
                              className={styles.faIcon}
                            />
                            <FontAwesomeIcon
                              icon={faTrash}
                              onClick={() =>
                                openConfirmation(
                                  recomendation?.id_recomendacion
                                )
                              }
                              data-task-id={recomendation?.id_recomendacion}
                              className={styles.faIcon}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      className="my-custom-dialog"
                    >
                      <DialogTitle>Confirmar Eliminación</DialogTitle>
                      <DialogContent>
                        <p>¿Está seguro de eliminar esta recomendación?</p>
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
          </TableContainer>
          {/* Para editar  */}
          <FormDialog
            open={editRIdx !== -1}
            onClose={handleCancelR}
            FormComponent={RecomendationEditForm}
            setRecomendations={setRecomendations}
            recomendations={recomendations}
            filtredRecomendations={filtredRecomendations}
            recomendation={filtredRecomendations[editRIdx]}
            onSave={handleSaveR}
            onCancel={handleCancelR}
            consultores={consultores}
            consultor={consultor}
            classifications={clasificaciones}
            nombreConsultor={nombreConsultor}
            nombreClasificacion={nombreClasificacion}
            isFollow={isFollow}
          ></FormDialog>
        </>
      </>
    );
  }
}
export default RecomendationTable;
