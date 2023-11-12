import styles from "../../styles/Home.module.css";
import { useState, useEffect } from "react";
import Select from "react-select";
import { customStyles } from "../../styles/SelectFilterStyles";

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

// Para probar con consultores y trabajadoresBORRAR DESPUES Y CARGAR DEL LISTADO DE CONSULTORES REAL
const consultoress = [
  { id: 1, name: "Carlos Ramón López Paz" },
  { id: 2, name: "Laura Alfonzo Perez" },
  { id: 3, name: "Alberto López Gónzalez" },
  { id: 4, name: "Lazaro Días Alvares" },
];
const clasificacioness = [
  { id: 1, name: "Tipo 1" },
  { id: 2, name: "Tipo 2" },
  { id: 3, name: "Tipo 3" },
  { id: 4, name: "Tipo 4" },
];

function RecomendationTable({
  recomendations,
  setRecomendations,
  interventions,
  projects,
}) {
  //para retornar la intervencion
  const interventionPorId = (interventionId) => {
    const intervention = interventions.find((e) => e.id === interventionId);
    return intervention;
  };
  const [consultores, setConsultores] = useState(consultoress);
  const [clasificaciones, setClasificaciones] = useState(clasificacioness);

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
    const updatedTableRData = [...recomendations];

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
      value: item.id,
      label: item.name,
    }));
  const [interventionFilter, setInterventionFilter] = useState([]);
  const optioninterventions =
    interventions &&
    interventions
      .filter((item) =>
        projectFilter && projectFilter.value
          ? item.projectId === projectFilter.value
          : true
      )
      .map((item) => ({
        value: item.id,
        label: item.name,
      }));
  const handleProjectFilterChange = (data) => {
    data ? setProjectFilter(data) : setProjectFilter([]);
  };
  const handleInterventionFilterChange = (data) => {
    data ? setInterventionFilter(data) : setInterventionFilter([]);
  };

  //Para filtrar la tabla
  const optionConsultores =
    consultoress &&
    consultoress.map((item) => ({
      value: item.name,
      label: item.name,
    }));
  const optionClasificaciones =
    clasificacioness &&
    clasificacioness.map((item) => ({
      value: item.name,
      label: item.name,
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
  const filteredData = recomendations.filter(
    (item) =>
      (projectFilter.length === 0 ||
        interventionPorId(item.idIntervention).projectId ===
          projectFilter.value) &&
      (interventionFilter.length === 0 ||
        item.idIntervention === interventionFilter.value) &&
      item.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      item.description
        .toLowerCase()
        .includes(descriptionFilter.toLowerCase()) &&
      (consultorFilter.length === 0 ||
        item.consultor === consultorFilter.value) &&
      (classificationFilter.length === 0 ||
        item.classification === classificationFilter.value) &&
      item.follow.toLowerCase().includes(followFilter.toLowerCase()) &&
      item.fecha.toLowerCase().includes(fechaFilter.toLowerCase())
  );

  // sms de confirmacion
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");

  function openConfirmation(data) {
    // event.preventDefault();
    setOpen(true);
    setData(data);
  }

  function handleDelete(idNum) {
    const newRecomendation = recomendations.filter(
      (recomendacion) => recomendacion.id !== idNum
    );

    setRecomendations(newRecomendation);

    // update state (if data on backend - make API request to update data)

    setOpen(false);
  }
  const handleClose = () => {
    setOpen(false);
  };
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
            <FormDialog
              open={dialogCreRecOpen}
              onClose={() => {
                setDialogRecOpen(false);
              }}
              FormComponent={CreateRecomendationForm}
              recomendations={recomendations}
              classifications={clasificaciones}
              setTableRData={setRecomendations}
              setRecomendations={setRecomendations}
              consultores={consultores}
              interventions={interventions}
              onSave={() => {
                setDialogRecOpen(false);
              }}
              onCancel={() => {
                setDialogRecOpen(false);
              }}
            ></FormDialog>
            {/* SELECCIONAR PROYECTO ETC */}

            {showFilters && (
              <Select
                styles={customStyles}
                className={styles.selectGestiones}
                defaultValue={projectFilter}
                onChange={(projectFilter) => {
                  handleProjectFilterChange(projectFilter);
                }}
                options={optionProjects}
                placeholder="Proyecto"
                isClearable
              />
            )}
            {showFilters && (
              <Select
                styles={customStyles}
                className={styles.selectGestiones}
                defaultValue={interventionFilter}
                onChange={(interventionFilter) => {
                  handleInterventionFilterChange(interventionFilter);
                }}
                options={optioninterventions}
                placeholder="Intervención"
                isClearable
              />
            )}
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
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className={styles.letraEnNegrita}>
                  Recomendación
                  {showFilters && (
                    <input
                      className={styles.inputFilter}
                      type="text"
                      value={nameFilter}
                      onChange={handleNameFilterChange}
                      placeholder="filtrar por recomendación..."
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
                      placeholder="filtrar por descripción"
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
                  Fecha
                  {showFilters && (
                    <input
                      className={styles.inputFilter}
                      type="date"
                      value={fechaFilter}
                      onChange={handleFechaFilterChange}
                      placeholder="Filtrar por fecha"
                    />
                  )}
                </TableCell>
                <TableCell className={styles.letraEnNegrita}>
                  Tipo
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
                </TableCell>
                <TableCell className={styles.letraEnNegrita}>
                  Seguida
                  {showFilters && (
                    <input
                      className={styles.inputFilter}
                      type="text"
                      value={followFilter}
                      onChange={handleFollowFilterChange}
                      placeholder="Filtrar por seguidas"
                    />
                  )}
                </TableCell>
                <TableCell className={styles.letraEnNegrita}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((recomendation) => (
                  <TableRow key={recomendation.id}>
                    <TableCell>{recomendation.name}</TableCell>
                    <TableCell>{recomendation.description}</TableCell>
                    <TableCell>{recomendation.consultor}</TableCell>
                    <TableCell>{recomendation.fecha}</TableCell>
                    <TableCell>{recomendation.classification}</TableCell>
                    <TableCell>{recomendation.follow}</TableCell>
                    <TableCell>
                      <FontAwesomeIcon
                        icon={faEdit}
                        onClick={() =>
                          setEditRIdx(
                            recomendations.findIndex(
                              (item) => item.id === recomendation?.id
                            )
                          )
                        }
                        className={styles.faIcon}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => openConfirmation(recomendation?.id)}
                        data-task-id={recomendation?.id}
                        className={styles.faIcon}
                      />
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        className="my-custom-dialog"
                        BackdropProps={{ invisible: true }}
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
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  className={styles.tablePagination}
                  rowsPerPageOptions={[4, 5, 10]}
                  count={recomendations.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage="Filas por página:"
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        {/* Para editar  */}
        <FormDialog
          open={editRIdx !== -1}
          onClose={handleCancelR}
          FormComponent={RecomendationEditForm}
          setTableRData={recomendationUpdate}
          recomendation={recomendations[editRIdx]}
          onSave={handleSaveR}
          onCancel={handleCancelR}
          consultores={consultores}
          classifications={clasificaciones}
        ></FormDialog>
      </>
    </>
  );
}
export default RecomendationTable;
