import styles from "../../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import FilterListOffOutlinedIcon from "@mui/icons-material/FilterListOffOutlined";

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FormDialog from "../Forms/FormDialog";
import ProyectoForm from "../Forms/ProyectoForm";

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

const options = [
  { value: "Proyecto Aica", label: "Proyecto Aica" },
  { value: "Proyecto Liorad", label: "Proyecto Liorad" },
];

function ProjectTable({
  projects,
  setProjects,
  consultores,
  clientes,
  cargando,
}) {
  const nombreCliente = (id_cliente) => {
    const cliente = clientes.find(
      (cliente) => cliente.id_cliente === id_cliente
    );
    const name = cliente ? cliente.nombre_cliente : "no se encontro el nombre";
    return name;
  };

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
  const [dialogOpen, setDialogOpen] = useState(false);

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
  const [consultoresFilter, setConsultoresFilter] = useState([]);

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleObjetivoFilterChange = (event) => {
    setObjetivoFilter(event.target.value);
  };
  const handleClienteFilterChange = (event) => {
    setClienteFilter(event.target.value);
  };
  const handleConsultoresFilterChange = (event) => {
    const newConsultor = event.target.value;
    setConsultoresFilter([newConsultor]);
  };
  const limpiarFiltrados = () => {
    setNameFilter("");
    setObjetivoFilter("");
    setClienteFilter("");
    setConsultoresFilter("");
  };
  const filteredData = projects.filter(
    (item) =>
      item.nombre_proyecto.toLowerCase().includes(nameFilter.toLowerCase()) &&
      item.objetivos.toLowerCase().includes(objetivoFilter.toLowerCase()) &&
      nombreCliente(item.id_cliente)
        .toLowerCase()
        .includes(clienteFilter.toLowerCase()) &&
      item.consultores.some((consultor) =>
        consultor.name.toLowerCase().includes(consultoresFilter)
      )
  );
  // sms de confirmacion
  const [data, setData] = useState("");

  function openConfirmation(data) {
    // event.preventDefault();
    setOpen(true);
    setData(data);
  }

  // function handleDelete(idNum) {
  //   const newIntervention = projects.filter(
  //     (intervencion) => intervencion.id !== idNum
  //   );
  //   setProjects(newIntervention);
  //   setOpen(false);
  // }
  const [error, setError] = useState(null);
  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/proyecto/${id}`
      );
      if (response.status === 200) {
        setProjects(projects.filter((proyecto) => proyecto.id_proyecto !== id));
        setOpen(false);
      } else {
        throw new Error("Error al eliminar el proyecto");
      }
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un problema al eliminar el usuario. Por favor, inténtalo de nuevo."
      );
    }
  }

  // Para editar una recomendacion desde la tabla

  const [editIIdx, setEditIIdx] = useState(-1);

  const handleSaveI = () => {
    setEditIIdx(-1);
  };

  const handleCancelI = () => {
    setEditIIdx(-1);
  };

  const proyectoUpdate = (updatedRow) => {
    // Crea una copia de los datos de la tabla
    const updatedProyectoData = [...projects];

    // Actualiza los datos de la fila que se está editando
    updatedProyectoData[editIIdx] = updatedRow;

    // Actualiza el estado de los datos en la tabla
    setProjects(updatedProyectoData);
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
                    setDialogOpen(true);
                  }}
                >
                  Nuevo +
                </Button>
                <FormDialog
                  open={dialogOpen}
                  onClose={() => {
                    setDialogOpen(false);
                  }}
                  FormComponent={ProyectoForm}
                  setProjects={setProjects}
                  projects={projects}
                  onSave={() => {
                    setDialogOpen(false);
                  }}
                  onCancel={() => {
                    setDialogOpen(false);
                  }}
                  consultoress={consultores}
                  clientes={clientes}
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
              <>
                {projects.length === 0 && (
                  <div className={styles.divIconH2}>
                    <h5> No hay proyectos</h5>{" "}
                  </div>
                )}
                {projects.length === 0 || (
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
                              value={consultoresFilter}
                              onChange={handleConsultoresFilterChange}
                              placeholder="Filtrar por consultores"
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
                        .map((project) => (
                          <TableRow key={project.id_proyecto} className={styles.trStyle}>
                            <TableCell className={styles.tdStyle}>
                              {project.nombre_proyecto}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              {project.objetivo}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              {project.cliente}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              {project.consultores
                                .map((consultor) => consultor.name)
                                .join(", ")}
                            </TableCell>

                            <TableCell className={styles.tdStyle}>
                              <FontAwesomeIcon
                                icon={faEdit}
                                onClick={() =>
                                  setEditIIdx(
                                    filteredData.findIndex(
                                      (item) => item.id_proyecto === project?.id_proyecto
                                    )
                                  )
                                }
                                className={styles.faIcon}
                              />
                              <FontAwesomeIcon
                                icon={faTrash}
                                onClick={() => openConfirmation(project?.id_proyecto)}
                                data-task-id={project?.id_proyecto}
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
              <FormDialog
                open={editIIdx !== -1}
                onClose={handleCancelI}
                FormComponent={ProyectoForm}
                setProjects={proyectoUpdate}
                project={projects[editIIdx]}
                onSave={handleSaveI}
                onCancel={handleCancelI}
                consultoress={consultores}
              ></FormDialog>
            </TableContainer>
          </div>
        </div>
      </>
    );
  }
}

export default ProjectTable;
