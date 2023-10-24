import styles from "../../styles/Home.module.css";
import { useState } from "react";

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
} from "@mui/material";

import Select from "react-select";

// Para probar con consultores y trabajadoresBORRAR DESPUES Y CARGAR DEL LISTADO DE CONSULTORES REAL
const consultoress = [
  { id: 1, name: "Carlos Ramón López Paz" },
  { id: 2, name: "Laura Alfonzo Perez" },
  { id: 3, name: "Alberto López Gónzalez" },
  { id: 4, name: "Lazaro Días Alvares" },
];
const options = [
  { value: "Proyecto Aica", label: "Proyecto Aica" },
  { value: "Proyecto Liorad", label: "Proyecto Liorad" },
];

function InterventionTable({
  interventions,
  setInterventions,
  trabDirProdCit,
}) {
  const [consultores, setConsultores] = useState(consultoress);

  //para los select de proyecto etc
  const [selectedOption, setSelectedOption] = useState(null);

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

  const [nameFilter, setNameFilter] = useState("");
  const [descriptionFilter, setDescriptionFilter] = useState("");
  const [uebFilter, setUebFilter] = useState("");
  const [structureFilter, setStructureFilter] = useState("");
  const [areaFilter, setAreaFilter] = useState("");
  const [consultorFilter, setConsultorFilter] = useState("");
  const [workerFilter, setWorkerFilter] = useState("");
  const [startFilter, setStartFilter] = useState("");

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleDescriptionFilterChange = (event) => {
    setDescriptionFilter(event.target.value);
  };
  const handleUebFilterChange = (event) => {
    setUebFilter(event.target.value);
  };
  const handleStructureFilterChange = (event) => {
    setStructureFilter(event.target.value);
  };

  const handleAreaFilterChange = (event) => {
    setAreaFilter(event.target.value);
  };
  const handleConsultorFilterChange = (event) => {
    setConsultorFilter(event.target.value);
  };

  const handleWorkerFilterChange = (event) => {
    setWorkerFilter(event.target.value);
  };
  const handleStartFilterChange = (event) => {
    setStartFilter(event.target.value);
  };


  const filteredData = interventions.filter(
    (item) =>
      item.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      item.description
        .toLowerCase()
        .includes(descriptionFilter.toLowerCase()) &&
      item.ueb.toLowerCase().includes(uebFilter.toLowerCase()) &&
      item.structure.toLowerCase().includes(structureFilter.toLowerCase()) &&
      item.area.toLowerCase().includes(areaFilter.toLowerCase()) &&
      item.consultor.toLowerCase().includes(consultorFilter.toLowerCase()) &&
      item.worker.toLowerCase().includes(workerFilter.toLowerCase())&&
      item.start.toLowerCase().includes(startFilter.toLowerCase())
  );
  // sms de confirmacion
  const [data, setData] = useState("");

  function openConfirmation(data) {
    // event.preventDefault();
    setOpen(true);
    setData(data);
  }

  function handleDelete(idNum) {
    const newIntervention = interventions.filter(
      (intervencion) => intervencion.id !== idNum
    );
    setInterventions(newIntervention);
    setOpen(false);
  }

  // Para editar una recomendacion desde la tabla

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
  return (
    <>
      <div className={styles.divTableInter}>
        {interventions.length === 0 && (
          <div className={styles.divIconH2}>
            <h2> No hay Intervenciones</h2>{" "}
          </div>
        )}
        {interventions.length === 0 || (<div>
        <div className={styles.divIconH2}></div>
        <TableContainer component={Paper} className={styles.table} >
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
                trabDirProdCit={trabDirProdCit}
            >
             
            </FormDialog>
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
          <div className={styles.filtrosEstructuraContent}>
            {showFilters && (
              <input
                className={styles.inputFilter}
                type="text"
                value={uebFilter}
                onChange={handleUebFilterChange}
                placeholder="Filtrar por UEB"
              />
            )}
            {showFilters && (
              <input
                className={styles.inputFilter}
                type="text"
                value={structureFilter}
                onChange={handleStructureFilterChange}
                placeholder="Filtrar por dirección"
              />
            )}
            {showFilters && (
              <input
                className={styles.inputFilter}
                type="text"
                value={areaFilter}
                onChange={handleAreaFilterChange}
                placeholder="Filtrar por área"
              />
            )}
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

          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className={styles.spacing}>
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

                <TableCell className={styles.spacing}>
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
                <TableCell className={styles.spacing}>
                  Consultor
                  {showFilters && (
                    <input
                      className={styles.inputFilter}
                      type="text"
                      value={consultorFilter}
                      onChange={handleConsultorFilterChange}
                      placeholder="Filtrar por consultor"
                    />
                  )}
                </TableCell>
                <TableCell className={styles.spacing}>
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
                <TableCell className={styles.spacing}></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((tsk) => (
                  <TableRow key={tsk.id} className={styles.trStyle}>
                    <TableCell className={styles.tdStyle}>{tsk.name}</TableCell>
                    <TableCell className={styles.tdStyle}>
                      {tsk.description}
                    </TableCell>

                    {/* <TableCell className={styles.tdStyle}>{tsk.ueb}</TableCell>
                    <TableCell className={styles.tdStyle}>
                      {tsk.structure}
                    </TableCell>
                    <TableCell className={styles.tdStyle}>{tsk.area}</TableCell> */}
                    <TableCell className={styles.tdStyle}>
                      {tsk.consultor}
                    </TableCell>
                    <TableCell className={styles.tdStyle}>
                      {tsk.worker}
                    </TableCell>
                    <td className={styles.tdStyle}>
                      <FontAwesomeIcon
                        icon={faEdit}
                        onClick={() =>
                          setEditIIdx(
                            interventions.findIndex(
                              (item) => item.id === tsk?.id
                            )
                          )
                        }
                        className={styles.faIcon}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => openConfirmation(tsk?.id)}
                        data-task-id={tsk?.id}
                        className={styles.faIcon}
                      />
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        BackdropProps={{ invisible: true }}
                      >
                        <DialogTitle>Confirmar Eliminación</DialogTitle>
                        <DialogContent>
                          <p>¿Está seguro de eliminar esta Intervención?</p>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={() => handleDelete(data)}>
                            Aceptar
                          </Button>
                          <Button onClick={handleClose}>Cancelar</Button>
                        </DialogActions>
                      </Dialog>
                    </td>
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
          <FormDialog
            className={styles.dialogContent}
            open={editIIdx !== -1}
            onClose={handleCancelI}
            FormComponent={IntervrntionForm}
            setInterventions={interventionUpdate}
            intervention={interventions[editIIdx]}
            onSave={handleSaveI}
            onCancel={handleCancelI}
            consultores={consultores}
            trabDirProdCit={trabDirProdCit}
          >
             </FormDialog>
        
        </TableContainer></div>)}
      </div>
    </>
  );
}

export default InterventionTable;
