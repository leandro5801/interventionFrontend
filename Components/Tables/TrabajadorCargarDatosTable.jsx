import styles from "../../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { customStyles } from "../../styles/SelectFilterStyles";

import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import FilterListOffOutlinedIcon from "@mui/icons-material/FilterListOffOutlined";

import TrabajadorCargarDatosForm from "../Forms/TrabajadorCargarDatosForm";
import FormDialog from "../Forms/FormDialog";

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

function TrabajadorCargarDatosTable({
  trabajadores,
  setTrabajadores,
  empresas,
  uebs,
  direcciones,
  areas,
  cargando,
}) {
  //para retornar el nombre de y no el id
  const uebPorId = (id_ueb) => {
    const ueb = uebs.find((e) => e.id_ueb === id_ueb);
    if (!ueb) {
      console.error(`No se encontró ninguna UEB con id_ueb: ${id_ueb}`);
      return;
    }
    return ueb;
  };
  const direccionPorId = (id_direccion) => {
    const direccion = direcciones.find((e) => e.id_direccion === id_direccion);
    if (!direccion) {
      console.error(
        `No se encontró ninguna direccion con id_ueb: ${id_direccion}`
      );
      return;
    }
    return direccion;
  };
  const areaPorId = (id_area) => {
    const area = areas.find((e) => e.id_area === id_area);
    return area;
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
  const nombreDireccion = (id_direccion) => {
    const direccion = direcciones.find((e) => e.id_direccion === id_direccion);
    const name = direccion
      ? direccion.nombre_direccion
      : "no se encontro el nombre";
    return name;
  };
  const nombreArea = (id_area) => {
    const area = areas.find((e) => e.id_area === id_area);
    const name = area ? area.nombre_area : "no se encontro el nombre";
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
  const [structureFilter, setStructureFilter] = useState([]);
  const [areaFilter, setAreaFilter] = useState([]);

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

  const optionAreas =
    areas &&
    areas
      .filter((item) =>
        structureFilter && structureFilter.value
          ? item.id_direccion === structureFilter.value
          : true
      )
      .map((item) => ({
        value: item.id_area,
        label: item.nombre_area,
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
  const handleAreaFilterChange = (data) => {
    data ? setAreaFilter(data) : setAreaFilter([]);
  };
  const limpiarFiltrados = () => {
    setNameFilter("");
    setEmpresaFilter([]);
    setUebFilter([]);
    setStructureFilter([]);
    setAreaFilter([]);
  };
  const filteredData = trabajadores.filter(
    (item) =>
      item.nombre_trabajador.toLowerCase().includes(nameFilter.toLowerCase()) &&
      (empresaFilter.length === 0 ||
        uebPorId(direccionPorId(areaPorId(item.id_area).id_direccion).id_ueb)
          .id_empresa === empresaFilter.value) &&
      (uebFilter.length === 0 ||
        direccionPorId(areaPorId(item.id_area).id_direccion).id_ueb ===
          uebFilter.value) &&
      (structureFilter.length === 0 ||
        areaPorId(item.id_area).id_direccion === structureFilter.value) &&
      (areaFilter.length === 0 || item.id_area === areaFilter.value)
  );
  const [error, setError] = useState(null);
  const [cargandoTrabaajdor, setCargandoTrabajador] = useState(false);

  //para el formulario
  const [dialogOpen, setDialogOpen] = useState(false);
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
                    setDialogOpen(true);
                  }}
                >
                  Cargar Trabajadores
                </Button>
                <div className={styles.filtrosEstructuraContentInt}>
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

                  <Select
                    styles={customStyles}
                    className={styles.selectGestionesGantt}
                    defaultValue={areaFilter}
                    onChange={(areaFilter) => {
                      handleAreaFilterChange(areaFilter);
                    }}
                    options={optionAreas}
                    placeholder="Área"
                    isClearable
                  />
                </div>
                <FormDialog
                  open={dialogOpen}
                  onClose={() => {
                    setDialogOpen(false);
                  }}
                  FormComponent={TrabajadorCargarDatosForm}
                  setTrabajadores={setTrabajadores}
                  trabajadores={trabajadores}
                  onSave={() => {
                    setDialogOpen(false);
                  }}
                  onCancel={() => {
                    setDialogOpen(false);
                  }}
                  empresas={empresas}
                  uebs={uebs}
                  direcciones={direcciones}
                  areas={areas}
                  uebPorId={uebPorId}
                  direccionPorId={direccionPorId}
                  areaPorId={areaPorId}
                  nombreEmpresa={nombreEmpresa}
                  nombreUeb={nombreUeb}
                  nombreDireccion={nombreDireccion}
                  nombreArea={nombreArea}
                  setOpenDialogError={setOpenDialogError}
                ></FormDialog>
               
              </div>
              <>
                {trabajadores.length === 0 && (
                  <div className={styles.divIconH2}>
                    <h5> No hay trabajadores</h5>{" "}
                  </div>
                )}
                {trabajadores.length === 0 || (
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell className={styles.spacing}>
                          Empresa
                        </TableCell>
                        <TableCell className={styles.spacing}>Ueb</TableCell>
                        <TableCell className={styles.spacing}>
                          Dirección
                        </TableCell>
                        <TableCell className={styles.spacing}>Área</TableCell>
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
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {filteredData
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((trabajador) => (
                          <TableRow
                            key={trabajador.id_trabajador}
                            className={styles.trStyle}
                          >
                            <TableCell className={styles.tdStyle}>
                              {nombreEmpresa(
                                uebPorId(
                                  direccionPorId(
                                    areaPorId(trabajador.id_area).id_direccion
                                  ).id_ueb
                                ).id_empresa
                              )}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              {nombreUeb(
                                direccionPorId(
                                  areaPorId(trabajador.id_area).id_direccion
                                ).id_ueb
                              )}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              {nombreDireccion(
                                areaPorId(trabajador.id_area).id_direccion
                              )}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              {nombreArea(trabajador.id_area)}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              {trabajador.nombre_trabajador}
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
                <Dialog open={openDialogError} onClose={handleCloseDialogError}>
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

export default TrabajadorCargarDatosTable;
