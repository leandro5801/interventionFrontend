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
} from "@mui/material";

import Select from "react-select";


function UebTable({ uebs, setUebs, empresas, cargando }) {

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
      value: item.idEmpresa,
      label: item.nombreEmpresa,
    }));
  const filteredData = uebs.filter(
    (item) =>
      (empresaFilter.length === 0 ||
        item.idEmpresa === empresaFilter.value ||
        !item.idEmpresa) &&
      item.nombreUeb.toLowerCase().includes(nameFilter.toLowerCase())
  );
  // sms de confirmacion
  const [data, setData] = useState("");

  function openConfirmation(data) {
    // event.preventDefault();
    setOpen(true);
    setData(data);
  }

  // function handleDelete(idNum) {
  //   const newUeb = uebs.filter((ueb) => ueb.id !== idNum);
  //   setUebs(newUeb);
  //   setOpen(false);
  // }
  const [error, setError] = useState(null);
  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/ueb/${id}`
      );
      if (response.status === 200) {
        setUebs(uebs.filter((ueb) => ueb.idUeb !== id));
        setOpen(false);
      } else {
        throw new Error("Error al eliminar la ueb");
      }
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un problema al eliminar la empresa. Por favor, inténtalo de nuevo."
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

  const UebUpdate = (updatedRow) => {
    // Crea una copia de los datos de la tabla
    const updatedUebsData = [...uebs];

    // Actualiza los datos de la fila que se está editando
    updatedUebsData[editIIdx] = updatedRow;

    // Actualiza el estado de los datos en la tabla
    setUebs(updatedUebsData);
  };

  //para retornar el nombre de la empresa y no el id
  const nombreEmpresa = (idEmpresa) => {
    const empresa = empresas.find((e) => e.idEmpresa === idEmpresa);
    const name = empresa ? empresa.nombreEmpresa : "no se encontro el nombre";
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
                  Nuevo +
                </Button>
                <FormDialog
                  open={dialogOpen}
                  onClose={() => {
                    setDialogOpen(false);
                  }}
                  FormComponent={UebForm}
                  setUebs={setUebs}
                  uebs={uebs}
                  onSave={() => {
                    setDialogOpen(false);
                  }}
                  onCancel={() => {
                    setDialogOpen(false);
                  }}
                  empresas={empresas}
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
              {uebs.length === 0 && (
                <div className={styles.divIconH2}>
                  <h5> No hay UEB</h5>{" "}
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
                      <TableCell className={styles.spacing}></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filteredData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((ueb) => (
                        <TableRow key={ueb.idUeb} className={styles.trStyle}>
                          <TableCell className={styles.tdStyle}>
                            {nombreEmpresa(ueb.idEmpresa)}
                          </TableCell>
                          <TableCell className={styles.tdStyle}>
                            {ueb.nombreUeb}
                          </TableCell>

                          <TableCell className={styles.tdStyle}>
                            <FontAwesomeIcon
                              icon={faEdit}
                              onClick={() =>
                                setEditIIdx(
                                  filteredData.findIndex(
                                    (item) => item.idUeb === ueb?.idUeb
                                  )
                                )
                              }
                              className={styles.faIcon}
                            />
                            <FontAwesomeIcon
                              icon={faTrash}
                              onClick={() => openConfirmation(ueb?.idUeb)}
                              data-task-id={ueb?.idUeb}
                              className={styles.faIcon}
                            />
                            <Dialog
                              open={open}
                              onClose={handleClose}
                              BackdropProps={{ invisible: true }}
                            >
                              <DialogTitle>Confirmar Eliminación</DialogTitle>
                              <DialogContent>
                                <p>¿Está seguro de eliminar esta ueb?</p>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={() => handleDelete(data)}>
                                  Aceptar
                                </Button>
                                <Button onClick={handleClose}>Cancelar</Button>
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
              <FormDialog
                open={editIIdx !== -1}
                onClose={handleCancelI}
                FormComponent={UebForm}
                setUebs={setUebs}
                uebs={uebs}
                ueb={uebs[editIIdx]}
                onSave={handleSaveI}
                onCancel={handleCancelI}
                empresas={empresas}
              ></FormDialog>
            </TableContainer>
          </div>
        </div>
      </>
    );
  }
}

export default UebTable;
