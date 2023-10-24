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

function TrabajadorTable({trabajadores,setTrabajadores}) {
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
  const [empresaFilter, setEmpresaFilter] = useState("");
  const [uebFilter, setUebFilter] = useState("");
  const [direccionFilter, setDireccionFilter] = useState("");
  const [areaFilter, setAreaFilter] = useState("");

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleEmpresaFilterChange = (event) => {
    setEmpresaFilter(event.target.value);
  };
  const handleUebFilterChange = (event) => {
    setUebFilter(event.target.value);
  };
  const handleDireccionFilterChange = (event) => {
    setDireccionFilter(event.target.value);
  };
  const handleAreaFilterChange = (event) => {
    setAreaFilter(event.target.value);
  };
  const filteredData = trabajadores.filter(
    (item) =>
      item.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      item.empresa.toLowerCase().includes(empresaFilter.toLowerCase()) &&
      item.ueb.toLowerCase().includes(uebFilter.toLowerCase()) &&
      item.direccion.toLowerCase().includes(direccionFilter.toLowerCase()) &&
      item.area.toLowerCase().includes(areaFilter.toLowerCase())
  );
  // sms de confirmacion
  const [data, setData] = useState("");

  function openConfirmation(data) {
    // event.preventDefault();
    setOpen(true);
    setData(data);
  }

  function handleDelete(idNum) {
    const newTrabajador = trabajadores.filter((trabajador) => trabajador.id !== idNum);
    setTrabajadores(newTrabajador);
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
    const updatedInterventonsData = [...areas];

    // Actualiza los datos de la fila que se está editando
    updatedInterventonsData[editIIdx] = updatedRow;

    // Actualiza el estado de los datos en la tabla
    setProjects(updatedInterventonsData);
  };
  return (
    <>
      <div className={styles.divTableInter}>
        {trabajadores.length === 0 && (
          <div className={styles.divIconH2}>
            <h2> No hay Intervenciones</h2>{" "}
          </div>
        )}
        {trabajadores.length === 0 || (
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
                interventions={uebs}
                onSave={() => {
                  setDialogCreInteOpen(false);
                }}
                onCancel={() => {
                  setDialogCreInteOpen(false);
                }}
                consultores={consultores}
            
            >
             
            </FormDialog> */}
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
                  <TableCell className={styles.spacing}>
                      Empresa
                      {showFilters && (
                        <input
                          className={styles.inputFilter}
                          type="text"
                          value={empresaFilter}
                          onChange={handleEmpresaFilterChange}
                          placeholder="Filtrar por empresa"
                        />
                      )}
                    </TableCell>
                    <TableCell className={styles.spacing}>
                      Ueb
                      {showFilters && (
                        <input
                          className={styles.inputFilter}
                          type="text"
                          value={uebFilter}
                          onChange={handleUebFilterChange}
                          placeholder="Filtrar por ueb"
                        />
                      )}
                    </TableCell>
                    <TableCell className={styles.spacing}>
                      Dirección
                      {showFilters && (
                        <input
                          className={styles.inputFilter}
                          type="text"
                          value={direccionFilter}
                          onChange={handleDireccionFilterChange}
                          placeholder="Filtrar por dirección"
                        />
                      )}
                    </TableCell>
                    <TableCell className={styles.spacing}>
                      Área
                      {showFilters && (
                        <input
                          className={styles.inputFilter}
                          type="text"
                          value={areaFilter}
                          onChange={handleAreaFilterChange}
                          placeholder="Filtrar por areas"
                        />
                      )}
                    </TableCell>
                    <TableCell className={styles.spacing}></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((trabajador) => (
                      <TableRow key={trabajador.id} className={styles.trStyle}>
                        <TableCell className={styles.tdStyle}>
                          {trabajador.name}
                        </TableCell>
                        <TableCell className={styles.tdStyle}>
                          {trabajador.empresa}
                        </TableCell>
                        <TableCell className={styles.tdStyle}>
                          {trabajador.ueb}
                        </TableCell>
                        <TableCell className={styles.tdStyle}>
                          {trabajador.direccion}
                        </TableCell>
                        <TableCell className={styles.tdStyle}>
                          {trabajador.area}
                        </TableCell>
                        <td className={styles.tdStyle}>
                          <FontAwesomeIcon
                            icon={faEdit}
                            onClick={() =>
                              setEditIIdx(
                                filteredData.findIndex((item) => item.id === trabajador?.id)
                              )
                            }
                            className={styles.faIcon}
                          />
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() => openConfirmation(trabajador?.id)}
                            data-task-id={trabajador?.id}
                            className={styles.faIcon}
                          />
                          <Dialog
                            open={open}
                            onClose={handleClose}
                            BackdropProps={{ invisible: true }}
                          >
                            <DialogTitle>Confirmar Eliminación</DialogTitle>
                            <DialogContent>
                              <p>¿Está seguro de eliminar este trabajador?</p>
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
            intervention={uebs[editIIdx]}
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

export default TrabajadorTable;
