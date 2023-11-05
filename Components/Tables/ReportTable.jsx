import styles from "../../styles/Home.module.css";
import { useState, useEffect } from "react";
import Select from "react-select";
import { customStyles } from "../../styles/SelectFilterStyles";

import FormDialog from "../Forms/FormDialog";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faPlus,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import FilterListOffOutlinedIcon from "@mui/icons-material/FilterListOffOutlined";

//sms de confirmacion
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
const options = [
  { value: "Proyecto Aica", label: "Proyecto Aica" },
  { value: "Proyecto Liorad", label: "Proyecto Liorad" },
];
function ReportTable({ recomendations, setRecomendations, interventions, projects }) {
  //para retornar el nombre de la empresa y no el id
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

  const [nameFilter, setNameFilter] = useState("");
  const [descriptionFilter, setDescriptionFilter] = useState("");
  const [consultorFilter, setConsultorFilter] = useState("");
  const [classificationFilter, setClassificationFilter] = useState("");
  const [followFilter, setFollowFilter] = useState("");


  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleDescriptionFilterChange = (event) => {
    setDescriptionFilter(event.target.value);
  };
  const handleConsultorFilterChange = (event) => {
    setConsultorFilter(event.target.value);
  };
  const handleClassificationFilterChange = (event) => {
    setClassificationFilter(event.target.value);
  };
  const handleFollowFilterChange = (event) => {
    setFollowFilter(event.target.value);
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
      item.consultor.toLowerCase().includes(consultorFilter.toLowerCase()) &&
      item.classification
        .toLowerCase()
        .includes(classificationFilter.toLowerCase()) &&
      item.follow.toLowerCase().includes(followFilter.toLowerCase())
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
        <TableContainer component={Paper} className={styles.tableReport}>
          <div className={styles.btnNuevoContent}>
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
                  onClick={toggleFilters}
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
                <TableCell className={styles.spacingReport}>
                  Recomendación
                  {showFilters && (
                    <input
                      className={styles.inputFilterReport}
                      type="text"
                      value={nameFilter}
                      onChange={handleNameFilterChange}
                      placeholder="Filtrar por recomendación"
                    />
                  )}
                </TableCell>
                <TableCell className={styles.spacingReport}>
                  Descripción
                  {showFilters && (
                    <input
                      className={styles.inputFilterReport}
                      type="text"
                      value={descriptionFilter}
                      onChange={handleDescriptionFilterChange}
                      placeholder="Filtrar por descripción"
                    />
                  )}
                </TableCell>
                <TableCell className={styles.spacingReport}>
                  Seguida
                  {showFilters && (
                    <input
                      className={styles.inputFilterReport}
                      type="text"
                      value={followFilter}
                      onChange={handleFollowFilterChange}
                      placeholder="Filtrar por seguidas"
                    />
                  )}
                </TableCell>
                <TableCell className={styles.spacingReport}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((recomendation) => (
                  <TableRow key={recomendation.id} className={styles.trStyle}>
                    <TableCell className={styles.tdStyle}>
                      {recomendation.name}
                    </TableCell>
                    <TableCell className={styles.tdStyleReport}>
                      {recomendation.description}
                    </TableCell>
                    <TableCell className={styles.tdStyle}>
                      {recomendation.follow}
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
      </>
    </>
  );
}
export default ReportTable;
