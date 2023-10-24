import styles from "../../styles/Home.module.css";
import { useState, useEffect } from "react";
import Select from "react-select";

import FormDialog from "../Forms/FormDialog";
import RecomendationForm from "../Forms/RecomendationForm";
import CreateRecomendationForm from "../Forms/CreateRecomendationForm";

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
function RecomendationTable({
  tableRData,
  recomendations,
  setRecomendations,
  interventions,
}) {
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
    const updatedTableRData = [...tableRData];

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

  //Para filtrar la tabla

  const [nameFilter, setNameFilter] = useState("");
  const [descriptionFilter, setDescriptionFilter] = useState("");
  const [consultorFilter, setConsultorFilter] = useState("");
  const [classificationFilter, setClassificationFilter] = useState("");
  const [followFilter, setFollowFilter] = useState("");
  //  const [processFilter, setProcessFilter] = useState("");
  //  const [uebFilter, setUebFilter] = useState("");
  //  const [structureFilter, setStructureFilter] = useState("");
  //  const [areaFilter, setAreaFilter] = useState("");

  //  const [workerFilter, setWorkerFilter] = useState("");

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
  //  const handleProcessFilterChange = (event) => {
  //    setProcessFilter(event.target.value);
  //  };

  //  const handleUebFilterChange = (event) => {
  //    setUebFilter(event.target.value);
  //  };
  //  const handleStructureFilterChange = (event) => {
  //    setStructureFilter(event.target.value);
  //  };

  //  const handleAreaFilterChange = (event) => {
  //    setAreaFilter(event.target.value);
  //  };

  //  const handleWorkerFilterChange = (event) => {
  //    setWorkerFilter(event.target.value);
  //  };

  const filteredData = tableRData.filter(
    (item) =>
      item.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      item.description
        .toLowerCase()
        .includes(descriptionFilter.toLowerCase()) &&
      item.consultor.toLowerCase().includes(consultorFilter.toLowerCase())
      && item.classification.toLowerCase().includes(classificationFilter.toLowerCase())
      && item.follow.toLowerCase().includes(followFilter.toLowerCase())
    // item.ueb.toLowerCase().includes(uebFilter.toLowerCase())
    //  &&
    //  item.structure.toLowerCase().includes(structureFilter.toLowerCase()) &&
    //  item.area.toLowerCase().includes(areaFilter.toLowerCase()) &&
    //  item.worker.toLowerCase().includes(workerFilter.toLowerCase())
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
    const newRecomendation = tableRData.filter(
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

            <Select
              className={styles.selectGestiones}
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              placeholder="Proyecto"
            />
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
          <Table  stickyHeader>
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
                <TableCell className={styles.spacingReport}>Seguida
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
                  count={tableRData.length}
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
          FormComponent={RecomendationForm}
          setTableRData={recomendationUpdate}
          recomendation={tableRData[editRIdx]}
          onSave={handleSaveR}
          onCancel={handleCancelR}
          consultores={consultores}
          classifications={clasificaciones}
        >
          
        </FormDialog>
      </>
    </>
  );
}
export default RecomendationTable;
