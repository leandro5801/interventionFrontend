import styles from "../../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { customStyles } from "../../styles/SelectFilterStyles";

import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import FilterListOffOutlinedIcon from "@mui/icons-material/FilterListOffOutlined";

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FormDialog from "../Forms/FormDialog";
import DireccionForm from "../Forms/DireccionForm";

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

function DireccionCargarDatosTable({
  direcciones,
  setDirecciones,
  empresas,
  uebs,
  cargando,
  areas,
}) {
  //para retornar el nombre de la empresa y no el id
  const uebPorId = (id_ueb) => {
    const ueb = uebs.find((e) => e.id_ueb === id_ueb);
    if (!ueb) {
      console.error(`No se encontró ninguna UEB con id_ueb: ${id_ueb}`);
      return;
    }
    return ueb;
  };
  const nombreEmpresa = (id_empresa) => {
    const empresa = empresas.find((e) => e.id_empresa === id_empresa);
    const name = empresa ? empresa.nombre_empresa : "no se encontro el nombre";
    return name;
  };
  const nombreUeb = (id_ueb) => {
    const ueb = uebs.find((e) => e.id_ueb === id_ueb);
    const name = ueb ? ueb.nombre_ueb : "no se encontro el nombre";
    return name;
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

  const [nameFilter, setNameFilter] = useState("");
  const [empresaFilter, setEmpresaFilter] = useState([]);
  const [uebFilter, setUebFilter] = useState([]);

  const optionEmpresas =
    empresas &&
    empresas
      .filter((item) => item.cargar_empresa === false)
      .map((item) => ({
        value: item.id_empresa,
        label: item.nombre_empresa,
      }));

  const optionUebs =
    uebs &&
    uebs
      .filter((item) =>
        empresaFilter && empresaFilter.value
          ? item.id_empresa === empresaFilter.value
          : true
      )
      .map((item) => ({
        value: item.id_ueb,
        label: item.nombre_ueb,
      }));
  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleEmpresaFilterChange = (data) => {
    data ? setEmpresaFilter(data) : setEmpresaFilter([]);
  };
  const handleUebFilterChange = (data) => {
    data ? setUebFilter(data) : setUebFilter([]);
  };
  const limpiarFiltrados = () => {
    setNameFilter("");
    setEmpresaFilter([]);
    setUebFilter([]);
  };
  const filteredData = direcciones.filter(
    (item) =>
      (empresaFilter.length === 0 ||
        uebPorId(item.id_ueb).id_empresa === empresaFilter.value) &&
      (uebFilter.length === 0 || item.id_ueb === uebFilter.value) &&
      item.nombre_direccion.toLowerCase().includes(nameFilter.toLowerCase())
  );

  const [error, setError] = useState(null);
  const [cargandoDirecciones, setCargandoDirecciones] = useState(false);
  async function fetchUeb() {
    setCargandoDirecciones(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/direccion/direccion"
      );
      setDirecciones(response.data);
    } catch (error) {
      setOpenDialogError(true);
    } finally {
      setCargandoDirecciones(false);
    }
  }
  const [openDialogError, setOpenDialogError] = useState(false);
  const handleCloseDialogError = () => {
    setOpenDialogError(false);
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
                  Cargar Direcciones
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
                {direcciones.length === 0 && (
                  <div className={styles.divIconH2}>
                    <h5> No hay direcciones</h5>{" "}
                  </div>
                )}
                {direcciones.length === 0 || (
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell className={styles.spacing}>
                          Empresa
                          {showFilters && (
                            <Select
                              styles={customStyles}
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
                            <Select
                              styles={customStyles}
                              className={styles.selectGestionesGantt}
                              defaultValue={uebFilter}
                              onChange={(uebFilter) => {
                                handleUebFilterChange(uebFilter);
                              }}
                              options={optionUebs}
                              placeholder="Ueb"
                              isClearable
                            />
                          )}
                        </TableCell>
                        <TableCell className={styles.spacing}>
                          Dirección
                          {showFilters && (
                            <input
                              className={styles.inputFilter}
                              type="text"
                              value={nameFilter}
                              onChange={handleNameFilterChange}
                              placeholder="Filtrar por dirección"
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
                        .map((direccion) => (
                          <TableRow
                            key={direccion.id_direccion}
                            className={styles.trStyle}
                          >
                            <TableCell className={styles.tdStyle}>
                              {nombreEmpresa(
                                uebPorId(direccion.id_ueb).id_empresa
                              )}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              {nombreUeb(direccion.id_ueb)}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              {direccion.nombre_direccion}
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

export default DireccionCargarDatosTable;
