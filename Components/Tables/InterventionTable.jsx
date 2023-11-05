import styles from "../../styles/Home.module.css";
import { useState } from "react";
import { customStyles } from "../../styles/SelectFilterStyles";

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

function InterventionTable({
  interventions,
  setInterventions,
  projects,
  empresas,
  uebs,
  direcciones,
  areas,
  trabajadores,
}) {
  const [consultores, setConsultores] = useState(consultoress);

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
    consultoress &&
    consultoress.map((item) => ({
      value: item.name,
      label: item.name,
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

  const handleStructureFilterChange = (data) => {
    data ? setStructureFilter(data) : setStructureFilter([]);
  };

  const handleAreaFilterChange = (data) => {
    data ? setAreaFilter(data) : setAreaFilter([]);
  };
  const handleConsultorFilterChange = (data) => {
    data ? setConsultorFilter(data) : setConsultorFilter([]);
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
  //para los select de proyecto, empresa etc
  const [projectFilter, setProjectFilter] = useState([]);
  const [empresaFilter, setEmpresaFilter] = useState([]);
  const [uebFilter, setUebFilter] = useState([]);

  const optionProjects =
    projects &&
    projects.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  const optionEmpresas =
    empresas &&
    empresas.map((item) => ({
      value: item.id,
      label: item.name,
    }));

  const optionUebs =
    uebs &&
    uebs
      .filter((item) =>
        empresaFilter && empresaFilter.value
          ? item.empresaId === empresaFilter.value
          : true
      )
      .map((item) => ({
        value: item.id,
        label: item.name,
      }));

  const optionDirecciones =
    direcciones &&
    direcciones
      .filter((item) =>
        uebFilter && uebFilter.value ? item.ueb === uebFilter.label : true
      )
      .map((item) => ({
        value: item.id,
        label: item.name,
      }));

  const optionAreas =
    areas &&
    areas
      .filter((item) =>
        structureFilter && structureFilter.value
          ? item.direccion === structureFilter.label
          : true
      )
      .map((item) => ({
        value: item.id,
        label: item.name,
      }));
  //-----------------------------------------------

  const filteredData = interventions.filter(
    (item) =>
      (projectFilter.length === 0 || item.projectId === projectFilter.value) &&
      (empresaFilter.length === 0 ||
        item.empresaId === empresaFilter.value ||
        !item.empresaId) &&
      (uebFilter.length === 0 || item.uebId === uebFilter.value) &&
      (structureFilter.length === 0 ||
        item.structure === structureFilter.label) &&
      (areaFilter.length === 0 || item.area === areaFilter.label) &&
      item.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      item.description
        .toLowerCase()
        .includes(descriptionFilter.toLowerCase()) &&
      (consultorFilter.length === 0 ||
        item.consultor === consultorFilter.value) &&
      item.worker.toLowerCase().includes(workerFilter.toLowerCase()) &&
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

  return (
    <>
      <div className={styles.divTableInter}>
        {interventions.length === 0 && (
          <div className={styles.divIconH2}>
            <h2> No hay Intervenciones</h2>{" "}
          </div>
        )}
        {interventions.length === 0 || (
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
                ></FormDialog>

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
              <div className={styles.filtrosEstructuraContentInt}>
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

              <Table stickyHeader>
                <TableHead>
                  <TableRow>
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
                    <TableCell className={styles.letraEnNegrita}></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((tsk) => (
                      <TableRow key={tsk.id}>
                        <TableCell>{tsk.name}</TableCell>
                        <TableCell>{tsk.description}</TableCell>

                        {/* <TableCell >{tsk.ueb}</TableCell>
                    <TableCell >
                      {tsk.structure}
                    </TableCell>
                    <TableCell >{tsk.area}</TableCell> */}
                        <TableCell>{tsk.consultor}</TableCell>
                        <TableCell>{tsk.worker}</TableCell>
                        <td>
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
                open={editIIdx !== -1}
                onClose={handleCancelI}
                FormComponent={IntervrntionForm}
                setInterventions={interventionUpdate}
                intervention={interventions[editIIdx]}
                onSave={handleSaveI}
                onCancel={handleCancelI}
                consultores={consultores}
                trabajadores={trabajadores}
                empresas={empresas}
                uebs={uebs}
                direcciones={direcciones}
                areas={areas}
              ></FormDialog>
            </TableContainer>
          </div>
        )}
      </div>
    </>
  );
}

export default InterventionTable;
