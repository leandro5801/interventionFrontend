import styles from "../../styles/Home.module.css";
import { useMemo, useState } from "react";
import axios from "axios";
import { customStyles } from "../../styles/SelectFilterStyles";

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
  Alert,
  AlertTitle,
} from "@mui/material";

import Select from "react-select";

function ProjectCargarDatosTable({
  projects,
  setProjects,
  consultores,
  clientes,
  cargando,
  interventions,
}) {
  const nombreCliente = (id_cliente) => {
    const cliente = clientes.find(
      (cliente) => cliente.id_cliente === id_cliente
    );
    const name = cliente ? cliente.nombre_cliente : "no se encontro el nombre";
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
  //para los select de proyecto etc
  const [selectedOption, setSelectedOption] = useState(null);

  //para el sms de confirmacion
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const handleClose = () => {
    setOpen(false);
  };

  const tipos_proyecto = useMemo(() => {
    return [
      ...new Set(
        projects
          .filter((project) => project.tipo_proyecto)
          .map((project) => project.tipo_proyecto)
      ),
    ]?.map((type) => ({
      label: type,
      value: type,
    }));
  }, [projects]);
  console.log(tipos_proyecto);

  function onSubmit(data) {
    // event.preventDefault();
    setOpen(true);
    setFormData(data);
  }
  //para el formulario
  const [dialogOpenCharge, setDialogOpenCharge] = useState(false);
  const handleCloseDialog = () => {
    setDialogOpenCharge(false);
  };

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

  const [typeProjectFilter, setTypeProjectFilter] = useState("");
  const [objetivoFilter, setObjetivoFilter] = useState("");
  const [clienteFilter, setClienteFilter] = useState([]);
  const [consultoresFilter, setConsultoresFilter] = useState([]);

  const consultoresOptions =
    consultores &&
    consultores.map((item) => ({
      value: item.id_consultor,
      label: item.nombre_consultor,
    }));
  const clienteOptions =
    clientes &&
    clientes.map((item) => ({
      value: item.id_cliente,
      label: item.nombre_cliente,
    }));
  const handleTypeProjectFilterChange = (data) => {
    console.log(data);

    data ? setTypeProjectFilter(data.value) : setTypeProjectFilter("");
  };

  const handleObjetivoFilterChange = (event) => {
    setObjetivoFilter(event.target.value);
  };
  const handleConsultoresFilterChange = (data) => {
    console.log(data);

    data ? setConsultoresFilter(data) : setConsultoresFilter([]);
  };
  const handleClienteFilterChange = (data) => {
    data ? setClienteFilter(data) : setClienteFilter([]);
  };

  const limpiarFiltrados = () => {
    setTypeProjectFilter("");
    setObjetivoFilter("");
    setClienteFilter([]);
    setConsultoresFilter([]);
  };

  const filteredData = projects.filter(
    (item) =>
      (clienteFilter.length === 0 ||
        (item.id_cliente !== null &&
          item.id_cliente === clienteFilter.value)) &&
      (consultoresFilter.length === 0 ||
        item.consultores_asignados_id?.some(
          (consultor) => consultor === consultoresFilter.value
        )) &&
      (typeProjectFilter.length === 0 ||
        item.tipo_proyecto === typeProjectFilter)
    //  && consultoresFilter &&
    //   item.consultores_asignados_id.some((consultor) => consultor === consultoresFilter)
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

  const vinculado = (id_proyecto) => {
    const intervencion = interventions.find(
      (dato) => dato.id_proyecto === id_proyecto
    );
    return intervencion ? true : false;
  };
  const [openDialogAdvertencia, setOpenDialogAdvertencia] = useState(false);
  const handleCloseDialogAdvertencia = () => {
    setOpenDialogAdvertencia(false);
  };

  const [error, setError] = useState(null);
  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/proyecto/${id}`
      );
      if (response.status === 200) {
        const newDatos = projects.filter(
          (proyecto) => proyecto.id_proyecto !== id
        );
        setProjects(newDatos);
        // Calcula el número total de páginas después de la eliminación
        const totalPages = Math.ceil(newDatos.length / rowsPerPage) - 1;

        // Si la página actual está fuera del rango, restablécela a la última página disponible
        if (page > totalPages) {
          setPage(totalPages);
        }
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
  async function handleChargeProjects() {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/proyecto/proyecto`
      );
      if (response.status === 200) {
        console.log(response.data);

        setProjects(response.data);
      } else {
        throw new Error("Error al cargar los proyectos");
      }
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un problema al cargar los proyectos. Por favor, inténtalo de nuevo."
      );
    }
    setDialogOpenCharge(false);
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
                    setDialogOpenCharge(true);
                  }}
                >
                  Cargar
                </Button>
                <div className={styles.filtrosEstructuraContentInt}>
                  {" "}
                  <Select
                    styles={customStyles}
                    className={styles.selectGestionesGantt}
                    defaultValue={clienteFilter}
                    onChange={(clienteFilter) => {
                      handleClienteFilterChange(clienteFilter);
                    }}
                    options={clienteOptions}
                    placeholder="Clientes"
                    isClearable
                  />
                  <Select
                    styles={customStyles}
                    className={styles.selectGestionesGantt}
                    defaultValue={consultoresFilter}
                    onChange={(consultoresFilter) => {
                      handleConsultoresFilterChange(consultoresFilter);
                    }}
                    options={consultoresOptions}
                    placeholder="Consultor"
                    isClearable
                  />
                  {tipos_proyecto.length > 0 && (
                    <Select
                      styles={customStyles}
                      className={styles.selectGestionesGantt}
                      // defaultValue={typeProjectFilter}
                      onChange={(tipo_proyecto) => {
                        handleTypeProjectFilterChange(tipo_proyecto);
                      }}
                      options={tipos_proyecto}
                      placeholder="Tipo Proyecto"
                      isClearable
                    />
                  )}
                </div>

                <Dialog open={dialogOpenCharge} onClose={handleCloseDialog}>
                  <DialogTitle /* position={"revert-layer"} */>
                    Confirmar Carga
                  </DialogTitle>
                  <DialogContent>
                    <p>¿Está seguro de cargar todos los proyectos?</p>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleChargeProjects}>Aceptar</Button>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                  </DialogActions>
                </Dialog>
              </div>

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
                        </TableCell>

                        <TableCell className={styles.letraEnNegrita}>
                          Objetivo
                        </TableCell>
                        <TableCell className={styles.letraEnNegrita}>
                          Cliente
                        </TableCell>
                        <TableCell className={styles.letraEnNegrita}>
                          Consultor
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
                          <TableRow
                            key={project.id_proyecto}
                            className={styles.trStyle}
                          >
                            <TableCell className={styles.tdStyle}>
                              {project.nombre_proyecto}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              {project.objetivos
                                ? project.objetivos
                                : "No hay objetivos"}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              {nombreCliente(parseInt(project.id_cliente))}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              {project.consultores_asignados_id
                                ? project.consultores_asignados_id
                                    .map((consultor) =>
                                      nombreConsultor(consultor)
                                    )
                                    .join(", ")
                                : "No hay consultores"}
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
            </TableContainer>
          </div>
        </div>
      </>
    );
  }
}

export default ProjectCargarDatosTable;
