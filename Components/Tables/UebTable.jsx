import styles from "../../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";
import { customStyles } from "../../styles/SelectFilterStyles";
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
import { useUebTable } from "./hooks/useUebTable";

function UebTable({ uebs, setUebs, empresas, cargando, direcciones }) {
  const {
    page,
    rowsPerPage,
    open,
    data,
    dialogOpen,
    showFilters,
    nameFilter,
    empresaFilter,
    editIIdx,
    openDialogAdvertencia,
    error,
    handleCloseForm,
    handleCloseI,
    filteredData,
    paginatedData,
    optionEmpresas,
    setDialogOpen,
    setEditIIdx,
    setOpenDialogAdvertencia,
    handleChangePage,
    handleChangeRowsPerPage,
    setNameFilter,
    setEmpresaFilter,
    handleDelete,
    openConfirmation,
    UebUpdate,
    vinculado,
    handleClose,
    handleCloseDialogAdvertencia,
    nombreEmpresa,
  } = useUebTable({ uebs, setUebs, empresas, direcciones });
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
                  onClick={() => setDialogOpen(true)}
                >
                  Nuevo +
                </Button>

                <div className={styles.filtrosEstructuraContentInt}>
                  <Select
                    styles={customStyles}
                    value={empresaFilter}
                    onChange={setEmpresaFilter}
                    options={optionEmpresas}
                    placeholder="Empresa"
                    isClearable
                    className={styles.selectGestionesGantt}
                  />
                </div>

                <FormDialog
                  open={dialogOpen}
                  onClose={handleCloseForm}
                  onSave={handleCloseForm}
                  onCancel={handleCloseForm}
                  FormComponent={UebForm}
                  setUebs={setUebs}
                  uebs={uebs}
                  empresas={empresas}
                />
              </div>

              {uebs.length === 0 ? (
                <div className={styles.divIconH2}>
                  <h6> No hay UEB</h6>
                </div>
              ) : (
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell className={styles.spacing}>Empresa</TableCell>
                      <TableCell className={styles.spacing}>Ueb</TableCell>
                      <TableCell className={styles.spacing}></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {paginatedData.map((ueb) => (
                      <TableRow key={ueb.id_ueb} className={styles.trStyle}>
                        <TableCell className={styles.tdStyle}>
                          {nombreEmpresa(ueb.id_empresa)}
                        </TableCell>
                        <TableCell className={styles.tdStyle}>
                          {ueb.nombre_ueb}
                        </TableCell>
                        <TableCell className={styles.tdStyleIcon}>
                          <FontAwesomeIcon
                            icon={faEdit}
                            onClick={() =>
                              setEditIIdx(
                                filteredData.findIndex(
                                  (item) => item.id_ueb === ueb.id_ueb
                                )
                              )
                            }
                            className={styles.faIcon}
                          />
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() =>
                              vinculado(ueb.id_ueb)
                                ? setOpenDialogAdvertencia(true)
                                : openConfirmation(ueb.id_ueb)
                            }
                            className={styles.faIcon}
                          />
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
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Confirmar Eliminación</DialogTitle>
              <DialogContent>
                <p>¿Está seguro de eliminar esta UEB?</p>
                {error && <Alert severity="error">{error}</Alert>}
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleDelete(data)}>Aceptar</Button>
                <Button onClick={handleClose}>Cancelar</Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={openDialogAdvertencia}
              onClose={handleCloseDialogAdvertencia}
            >
              <Alert severity="warning">
                <AlertTitle>Advertencia</AlertTitle>
                No se puede eliminar una UEB que ya esté vinculada a una
                dirección
                <div className={styles.botonAlert}>
                  <Button onClick={handleCloseDialogAdvertencia}>
                    Aceptar
                  </Button>
                </div>
              </Alert>
            </Dialog>

            <FormDialog
              open={editIIdx !== -1}
              onClose={handleCloseI}
              onCancel={handleCloseI}
              onSave={handleCloseI}
              FormComponent={UebForm}
              setUebs={setUebs}
              uebs={uebs}
              ueb={uebs[editIIdx]}
              empresas={empresas}
            />
          </div>
        </div>
      </>
    );
  }
}

export default UebTable;
