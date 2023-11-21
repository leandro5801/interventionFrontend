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

function ReportTable({
  recomendations,
  setRecomendations,
  interventions,
  projects,
}) {
  //para retornar el nombre de la empresa y no el id
  const intervencionPorId = (id_intervencion) => {
    const intervention = interventions.find(
      (e) => e.id_intervencion === id_intervencion
    );
    return intervention;
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

  const [nameFilter, setNameFilter] = useState("");
  const [descriptionFilter, setDescriptionFilter] = useState("");
  const [fechaFilter, setFechaFilter] = useState("");
  const [followFilter, setFollowFilter] = useState("");

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleDescriptionFilterChange = (event) => {
    setDescriptionFilter(event.target.value);
  };
  const handleFechaFilterChange = (event) => {
    setFechaFilter(event.target.value);
  };
  const handleFollowFilterChange = (event) => {
    setFollowFilter(event.target.value);
  };
  const limpiarFiltrados = () => {
    setProjectFilter([]);
    setInterventionFilter([]);
    setNameFilter("");
    setDescriptionFilter("");
    setFechaFilter("");
    setFollowFilter("");
  };

  const filteredData = recomendations.filter(
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
                      placeholder="Filtrar por recomendación"
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
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((recomendation) => (
                  <TableRow key={recomendation.id_recomendacion} >
                    <TableCell >
                      {recomendation.nombre_recomendacion}
                    </TableCell>
                    <TableCell >
                      {recomendation.descripcion_recomendacion}
                    </TableCell>
                    <TableCell >
                      {recomendation.fecha_recomendacion}
                    </TableCell>
                    <TableCell >
                      {isFollow(recomendation.seguimiento)}
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
