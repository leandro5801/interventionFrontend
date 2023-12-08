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
import AreaCargarDatosForm from "../Forms/AreaCargarDatosForm";

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

function AreaCargarDatosTable({
  areas,
  setAreas,
  empresas,
  uebs,
  direcciones,
  cargando,
  trabajadores,
  uebPorId,
  direccionPorId,
  nombreEmpresa,
  nombreUeb,
  nombreDireccion,
}) {
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
  const [structureFilter, setStructureFilter] = useState([]);

  const optionEmpresas =
    empresas &&
    empresas.map((item) => ({
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

  const optionDirecciones =
    direcciones &&
    direcciones
      .filter((item) =>
        uebFilter && uebFilter.value ? item.id_ueb === uebFilter.value : true
      )
      .map((item) => ({
        value: item.id_direccion,
        label: item.nombre_direccion,
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

  const handleStructureFilterChange = (data) => {
    data ? setStructureFilter(data) : setStructureFilter([]);
  };
  const limpiarFiltrados = () => {
    setNameFilter("");
    setEmpresaFilter([]);
    setUebFilter([]);
    setStructureFilter([]);
  };
  const filteredData = areas.filter(
    (item) =>
      item.nombre_area.toLowerCase().includes(nameFilter.toLowerCase()) &&
      (empresaFilter.length === 0 || item.empresa === empresaFilter.label) &&
      (empresaFilter.length === 0 ||
        uebPorId(direccionPorId(item.id_direccion).id_ueb).id_empresa ===
          empresaFilter.value) &&
      (uebFilter.length === 0 ||
        direccionPorId(item.id_direccion).id_ueb === uebFilter.value) &&
      (structureFilter.length === 0 ||
        item.id_direccion === structureFilter.value)
  );
  //para el formulario
  const [dialogOpen, setDialogOpen] = useState(false);

  const [error, setError] = useState(null);
  const [cargandoUeb, setCargandoArea] = useState(false);

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
              <>
                <div className={styles.btnNuevoContent}>
                  <Button
                    className={styles.btn}
                    onClick={() => {
                      setDialogOpen(true);
                    }}
                  >
                    Cargar Áreas
                  </Button>
                  <FormDialog
                    open={dialogOpen}
                    onClose={() => {
                      setDialogOpen(false);
                    }}
                    FormComponent={AreaCargarDatosForm}
                    setAreas={setAreas}
                    areas={areas}
                    onSave={() => {
                      setDialogOpen(false);
                    }}
                    onCancel={() => {
                      setDialogOpen(false);
                    }}
                    empresas={empresas}
                    uebs={uebs}
                    direcciones={direcciones}
                    uebPorId={uebPorId}
                    direccionPorId={direccionPorId}
                    nombreEmpresa={nombreEmpresa}
                    nombreUeb={nombreUeb}
                    nombreDireccion={nombreDireccion}
                    setOpenDialogError={setOpenDialogError}
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
                {areas.length === 0 && (
                  <div className={styles.divIconH2}>
                    <h5> No hay areas</h5>{" "}
                  </div>
                )}
                {areas.length === 0 || (
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
                            <Select
                              styles={customStyles}
                              className={styles.selectGestionesGantt}
                              defaultValue={structureFilter}
                              onChange={(structureFilter) => {
                                handleStructureFilterChange(structureFilter);
                              }}
                              options={optionDirecciones}
                              placeholder="Dirección"
                              isClearable
                            />
                          )}
                        </TableCell>
                        <TableCell className={styles.spacing}>
                          Area
                          {showFilters && (
                            <input
                              className={styles.inputFilter}
                              type="text"
                              value={nameFilter}
                              onChange={handleNameFilterChange}
                              placeholder="Filtrar por areas"
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
                        .map((area) => (
                          <TableRow
                            key={area.id_area}
                            className={styles.trStyle}
                          >
                            <TableCell className={styles.tdStyle}>
                              {nombreEmpresa(
                                uebPorId(
                                  direccionPorId(area.id_direccion).id_ueb
                                ).id_empresa
                              )}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              {nombreUeb(
                                direccionPorId(area.id_direccion).id_ueb
                              )}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              {nombreDireccion(area.id_direccion)}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              {area.nombre_area}
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
                <Dialog
                  open={openDialogError}
                  onClose={handleCloseDialogError}
                >
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Ha ocurrido un error. Inténtelo más tarde.
                    <div className={styles.botonAlert}>
                      <Button onClick={handleCloseDialogError}>Aceptar</Button>
                    </div>
                  </Alert>
                </Dialog>
              </>
            </TableContainer>
          </div>
        </div>
      </>
    );
  }
}

export default AreaCargarDatosTable;
