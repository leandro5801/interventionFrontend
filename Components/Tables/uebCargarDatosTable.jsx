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
import { customStyles } from "../../styles/SelectFilterStyles";
import UebCargarDatosForm from "../Forms/UebCargarDatosForm";

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
    empresas.map((item) => ({
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
                    setDialogOpen(true);
                  }}
                >
                  Cargar UEB
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
                </div>
                <FormDialog
                  open={dialogOpen}
                  onClose={() => {
                    setDialogOpen(false);
                  }}
                  FormComponent={UebCargarDatosForm}
                  setUebs={setUebs}
                  onSave={() => {
                    setDialogOpen(false);
                  }}
                  onCancel={() => {
                    setDialogOpen(false);
                  }}
                  empresas={empresas}
                  setOpenDialogError={setOpenDialogError}
                ></FormDialog>

                {/* SELECCIONAR PROYECTO ETC */}
                
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
                        </TableCell>
                        <TableCell className={styles.spacing}>Ueb</TableCell>
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

export default UebCargarDatosTable;
