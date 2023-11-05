import styles from "../../styles/Home.module.css";
import { useState } from "react";
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

function DireccionTable({direcciones,setDirecciones, empresas,uebs}) {
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
  const [uebFilter, setUebFilter] = useState([]);

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
  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleEmpresaFilterChange = (data) => {
    data ? setEmpresaFilter(data) : setEmpresaFilter([]);
  };
  const handleUebFilterChange = (data) => {
    data ? setUebFilter(data) : setUebFilter([]);
  };

  const filteredData = direcciones.filter(
    (item) =>
      item.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      (empresaFilter.length === 0 ||
        item.empresa === empresaFilter.label ) 
        &&
      (uebFilter.length === 0 || item.ueb === uebFilter.label)
  );


  // sms de confirmacion
  const [data, setData] = useState("");

  function openConfirmation(data) {
    // event.preventDefault();
    setOpen(true);
    setData(data);
  }

  function handleDelete(idNum) {
    const newDireccion = direcciones.filter((direccion) => direccion.id !== idNum);
    setDirecciones(newDireccion);
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

  const direccionUpdate = (updatedRow) => {
    // Crea una copia de los datos de la tabla
    const updatedDireccionData = [...direcciones];

    // Actualiza los datos de la fila que se está editando
    updatedDireccionData[editIIdx] = updatedRow;

    // Actualiza el estado de los datos en la tabla
    setDirecciones(updatedDireccionData);
  };
  return (
    <>
      <div className={styles.divTableInter}>
        {direcciones.length === 0 && (
          <div className={styles.divIconH2}>
            <h2> No hay Intervenciones</h2>{" "}
          </div>
        )}
        {direcciones.length === 0 || (
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
              FormComponent={DireccionForm}
              setDirecciones={setDirecciones}
                direcciones={uebs}
                onSave={() => {
                  setDialogOpen(false);
                }}
                onCancel={() => {
                  setDialogOpen(false);
                }}
               empresas={empresas}
               uebs={uebs}
            
            >
             
            </FormDialog>
                {/* SELECCIONAR PROYECTO ETC */}
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
                    <TableCell className={styles.spacing}></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((direccion) => (
                      <TableRow key={direccion.id} className={styles.trStyle}>
                        
                        <TableCell className={styles.tdStyle}>
                          {direccion.empresa}
                        </TableCell>
                        <TableCell className={styles.tdStyle}>
                          {direccion.ueb}
                        </TableCell>
                        <TableCell className={styles.tdStyle}>
                          {direccion.name}
                        </TableCell>
                        <td className={styles.tdStyle}>
                          <FontAwesomeIcon
                            icon={faEdit}
                            onClick={() =>
                              setEditIIdx(
                                filteredData.findIndex((item) => item.id === direccion?.id)
                              )
                            }
                            className={styles.faIcon}
                          />
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() => openConfirmation(direccion?.id)}
                            data-task-id={direccion?.id}
                            className={styles.faIcon}
                          />
                          <Dialog
                            open={open}
                            onClose={handleClose}
                            BackdropProps={{ invisible: true }}
                          >
                            <DialogTitle>Confirmar Eliminación</DialogTitle>
                            <DialogContent>
                              <p>¿Está seguro de eliminar esta dirección?</p>
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
            className={styles.dialogContent}
            open={editIIdx !== -1}
            onClose={handleCancelI}
            FormComponent={DireccionForm}
            setDirecciones={direccionUpdate}
            direccion={direcciones[editIIdx]}
            onSave={handleSaveI}
            onCancel={handleCancelI}
            empresas={empresas}
            uebs={uebs}
          >
             </FormDialog>
            </TableContainer>
          </div>
        )}
      </div>
    </>
  );
}

export default DireccionTable;
