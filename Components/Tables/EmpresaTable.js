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

function EmpresaTable({ empresas, setEmpresas}) {
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
  const [userNameFilter, setUserNameFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleUserNameFilterChange = (event) => {
    setUserNameFilter(event.target.value);
  };
  const handleRoleFilterChange = (event) => {
    setRoleFilter(event.target.value);
  };

//   const filteredData = empresas.filter(
//     (item) =>
//       item.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
//       item.user_name.toLowerCase().includes(userNameFilter.toLowerCase()) &&
//       item.idRole.toLowerCase().includes(roleFilter.toLowerCase())
//   );
  // sms de confirmacion
  const [data, setData] = useState("");

  function openConfirmation(data) {
    // event.preventDefault();
    setOpen(true);
    setData(data);
  }

  function handleDelete(idNum) {
    const newEmpresa = empresas.filter(
      (empresa) => empresa.id !== idNum
    );
    setEmpresas(newEmpresa);
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
    const updatedInterventonsData = [...empresas];

    // Actualiza los datos de la fila que se está editando
    updatedInterventonsData[editIIdx] = updatedRow;

    // Actualiza el estado de los datos en la tabla
    setInterventions(updatedInterventonsData);
  };
  return (
    <>
      <div className={styles.divTableInter}>
        {empresas.length === 0 && (
          <div className={styles.divIconH2}>
            <h2> No hay Intervenciones</h2>{" "}
          </div>
        )}
        {empresas.length === 0 || (
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
                  setInterventions={setInterventions}
                  interventions={empresas}
                  onSave={() => {
                    setDialogCreInteOpen(false);
                  }}
                  onCancel={() => {
                    setDialogCreInteOpen(false);
                  }}
                  consultores={consultores}
                  trabDirProdCit={trabDirProdCit}
                ></FormDialog> */}
                {/* SELECCIONAR PROYECTO ETC */}

              </div>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell className={styles.spacing}>
                      Nombre
                      {showFilters && (
                        <input
                          className={styles.inputFilter}
                          type="text"
                          value={nameFilter}
                          onChange={handleNameFilterChange}
                          placeholder="Filtrar por nombre"
                        />
                      )}
                    </TableCell>
                    <TableCell className={styles.spacing}></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {empresas
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((empresa) => (
                      <TableRow key={empresa.id} className={styles.trStyle}>
                        <TableCell className={styles.tdStyle}>
                          {empresa.name}
                        </TableCell>
                       
                        <td className={styles.tdStyle}>
                          <FontAwesomeIcon
                            icon={faEdit}
                            onClick={() =>
                              setEditIIdx(
                                empresas.findIndex((item) => item.id === empresa?.id)
                              )
                            }
                            className={styles.faIcon}
                          />
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() => openConfirmation(empresa?.id)}
                            data-task-id={empresa?.id}
                            className={styles.faIcon}
                          />
                          <Dialog
                            open={open}
                            onClose={handleClose}
                            BackdropProps={{ invisible: true }}
                          >
                            <DialogTitle>Confirmar Eliminación</DialogTitle>
                            <DialogContent>
                              <p>¿Está seguro de eliminar esta empresa?</p>
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
                      count={empresas.length}
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
                intervention={empresas[editIIdx]}
                onSave={handleSaveI}
                onCancel={handleCancelI}
                consultores={consultores}
                trabDirProdCit={trabDirProdCit}
              ></FormDialog> */}
            </TableContainer>
          </div>
        )}
      </div>
    </>
  );
}

export default EmpresaTable;
