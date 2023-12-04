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
import UebForm from "../Forms/UebForm";

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

function UebCargarDatosTable({
  uebs,
  setUebs,
  empresas,
  cargando,
  direcciones,
}) {
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
  const [empresaFilter, setEmpresaFilter] = useState([]);

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleEmpresaFilterChange = (data) => {
    data ? setEmpresaFilter(data) : setEmpresaFilter([]);
  };

  const limpiarFiltrados = () => {
    setNameFilter("");
    setEmpresaFilter([]);
  };
  const optionEmpresas =
    empresas &&
    empresas
      .filter((item) => item.cargar_empresa === false)
      .map((item) => ({
        value: item.id_empresa,
        label: item.nombre_empresa,
      }));
  const filteredData = uebs.filter(
    (item) =>
      (empresaFilter.length === 0 ||
        item.id_empresa === empresaFilter.value ||
        !item.id_empresa) &&
      item.nombre_ueb.toLowerCase().includes(nameFilter.toLowerCase())
  );
  // sms de confirmacion
  const [data, setData] = useState("");

  function openConfirmation(data) {
    // event.preventDefault();
    setOpen(true);
    setData(data);
  }

  const [error, setError] = useState(null);
  const [cargandoUeb, setCargandoUeb] = useState(false);

  async function fetchUeb() {
    setCargandoUeb(true);
    try {
      const response = await axios.get("http://localhost:3000/api/ueb/ueb");
      setUebs(response.data);
      console.log(response.data);
    } catch (error) {
      setError(
        "Hubo un problema al obtener los datos. Por favor, inténtalo de nuevo."
      );
      setOpenDialogError(true);
      // alert("Hubo un problema al obtener los datos. Por favor, inténtalo de nuevo.");
    } finally {
      setCargandoUeb(false);
    }
  }
  const [openDialogError, setOpenDialogError] = useState(false);
  const handleCloseDialogError = () => {
    setOpenDialogError(false);
  };
  //para retornar el nombre de la empresa y no el id
  const nombreEmpresa = (id_empresa) => {
    const empresa = empresas.find((e) => e.id_empresa === id_empresa);
    const name = empresa ? empresa.nombre_empresa : "no se encontro el nombre";
    return name;
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
        {/* Renderizar las empresas aquí */}
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
                    fetchUeb();
                  }}
                >
                  Cargar UEB +
                </Button>

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
              <>
                {uebs.length === 0 && (
                  <div className={styles.divIconH2}>
                    <h6> No hay UEB</h6>{" "}
                  </div>
                )}
                {uebs.length === 0 || (
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell className={styles.spacing}>
                          Empresa
                          {showFilters && (
                            <Select
                              className={styles.selectGestionesGantt}
                              defaultValue={empresaFilter}
                              onChange={(empresaFilter) => {
                                handleEmpresaFilterChange(empresaFilter);
                              }}
                              options={optionEmpresas}
                              placeholder="Empresa"
                              isClearable
                            />
                          )}
                        </TableCell>
                        <TableCell className={styles.spacing}>
                          Ueb
                          {showFilters && (
                            <input
                              className={styles.inputFilter}
                              type="text"
                              value={nameFilter}
                              onChange={handleNameFilterChange}
                              placeholder="Filtrar por ueb"
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {filteredData
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((ueb) => (
                          <TableRow key={ueb.id_ueb} className={styles.trStyle}>
                            <TableCell className={styles.tdStyle}>
                              {nombreEmpresa(ueb.id_empresa)}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              {ueb.nombre_ueb}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                    <Dialog
                      open={openDialogError}
                      onClose={handleCloseDialogError}
                      BackdropProps={{ invisible: true }}
                    >
                      <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        Puede que el servidor no esté conectado. Inténtelo más
                        tarde.
                        <div className={styles.botonAlert}>
                          <Button onClick={handleCloseDialogError}>
                            Aceptar
                          </Button>
                        </div>
                      </Alert>
                    </Dialog>
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

export default UebCargarDatosTable;
