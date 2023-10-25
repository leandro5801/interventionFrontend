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

function ProjectTable({ projects, setProjects }) {
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
  const [objetivoFilter, setObjetivoFilter] = useState("");
  const [clienteFilter, setClienteFilter] = useState("");
  const [consultorFilter, setConsultorFilter] = useState("");
  const [workerFilter, setWorkerFilter] = useState("");
  const [startFilter, setStartFilter] = useState("");

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleObjetivoFilterChange = (event) => {
    setObjetivoFilter(event.target.value);
  };
  const handleClienteFilterChange = (event) => {
    setClienteFilter(event.target.value);
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

  const filteredData = projects.filter(
    (item) =>
      item.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      item.objetivo.toLowerCase().includes(objetivoFilter.toLowerCase()) &&
      item.cliente.toLowerCase().includes(clienteFilter.toLowerCase()) &&
      item.consultor.toLowerCase().includes(consultorFilter.toLowerCase())
    //   item.worker.toLowerCase().includes(workerFilter.toLowerCase())&&
    //   item.start.toLowerCase().includes(startFilter.toLowerCase())
  );
  // sms de confirmacion
  const [data, setData] = useState("");

  function openConfirmation(data) {
    // event.preventDefault();
    setOpen(true);
    setData(data);
  }

  function handleDelete(idNum) {
    const newIntervention = projects.filter(
      (intervencion) => intervencion.id !== idNum
    );
    setProjects(newIntervention);
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
    const updatedInterventonsData = [...projects];

    // Actualiza los datos de la fila que se está editando
    updatedInterventonsData[editIIdx] = updatedRow;

    // Actualiza el estado de los datos en la tabla
    setProjects(updatedInterventonsData);
  };
  return (
    <>
      <div className={styles.divTableInter}>
        {projects.length === 0 && (
          <div className={styles.divIconH2}>
            <h2> No hay Intervenciones</h2>{" "}
          </div>
        )}
        {projects.length === 0 || (
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
                {/* <FormDialog
              open={dialogCreInteOpen}
              onClose={() => {
                setDialogCreInteOpen(false);
              }}
              FormComponent={IntervrntionForm}
              setInterventions={setProjects}
                interventions={projects}
                onSave={() => {
                  setDialogCreInteOpen(false);
                }}
                onCancel={() => {
                  setDialogCreInteOpen(false);
                }}
                consultores={consultores}
            
            >
             
            </FormDialog> */}
                {/* SELECCIONAR PROYECTO ETC */}

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
              {/* <div className={styles.filtrosEstructuraContent}>
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
          </div> */}

              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                     <TableCell className={styles.letraEnNegrita}>
                      Proyecto
                      {showFilters && (
                        <input
                          className={styles.inputFilter}
                          type="text"
                          value={nameFilter}
                          onChange={handleNameFilterChange}
                          placeholder="Filtrar por proyecto"
                        />
                      )}
                    </TableCell>

                     <TableCell className={styles.letraEnNegrita}>
                      Objetivo
                      {showFilters && (
                        <input
                          className={styles.inputFilter}
                          type="text"
                          value={objetivoFilter}
                          onChange={handleObjetivoFilterChange}
                          placeholder="Filtrar por objetivo"
                        />
                      )}
                    </TableCell>
                     <TableCell className={styles.letraEnNegrita}>
                      Cliente
                      {showFilters && (
                        <input
                          className={styles.inputFilter}
                          type="text"
                          value={clienteFilter}
                          onChange={handleClienteFilterChange}
                          placeholder="Filtrar por cliente"
                        />
                      )}
                    </TableCell>
                     <TableCell className={styles.letraEnNegrita}>
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
                     <TableCell className={styles.letraEnNegrita}></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((project) => (
                      <TableRow key={project.id} className={styles.trStyle}>
                        <TableCell className={styles.tdStyle}>
                          {project.name}
                        </TableCell>
                        <TableCell className={styles.tdStyle}>
                          {project.objetivo}
                        </TableCell>
                        <TableCell className={styles.tdStyle}>
                          {project.cliente}
                        </TableCell>
                        <TableCell className={styles.tdStyle}>
                          {project.consultor}
                        </TableCell>

                        <td className={styles.tdStyle}>
                          <FontAwesomeIcon
                            icon={faEdit}
                            onClick={() =>
                              setEditIIdx(
                                filteredData.findIndex(
                                  (item) => item.id === project?.id
                                )
                              )
                            }
                            className={styles.faIcon}
                          />
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() => openConfirmation(project?.id)}
                            data-task-id={project?.id}
                            className={styles.faIcon}
                          />
                          <Dialog
                            open={open}
                            onClose={handleClose}
                            BackdropProps={{ invisible: true }}
                          >
                            <DialogTitle>Confirmar Eliminación</DialogTitle>
                            <DialogContent>
                              <p>¿Está seguro de eliminar este proyecto?</p>
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
              {/* <FormDialog
            className={styles.dialogContent}
            open={editIIdx !== -1}
            onClose={handleCancelI}
            FormComponent={IntervrntionForm}
            setInterventions={interventionUpdate}
            intervention={projects[editIIdx]}
            onSave={handleSaveI}
            onCancel={handleCancelI}
            consultores={consultores}
            trabDirProdCit={trabDirProdCit}
          >
             </FormDialog> */}
            </TableContainer>
          </div>
        )}
      </div>
    </>
  );
}

export default ProjectTable;
