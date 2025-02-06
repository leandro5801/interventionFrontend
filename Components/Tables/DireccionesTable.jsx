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
import useDireccion from "./hooks/useDireccionesTable";

function DireccionTable({
  direcciones,
  setDirecciones,
  empresas,
  uebs,
  cargando,
  areas,
}) {
  const {
    open,
    dialogOpen,
    showFilters,
    page,
    data,
    rowsPerPage,
    nameFilter,
    empresaFilter,
    uebFilter,
    openDialogAdvertencia,
    error,
    editIIdx,
    setOpenDialogAdvertencia,
    setDialogOpen,
    setEditIIdx,
    handleClose,
    toggleFilters,
    handleChangePage,
    handleChangeRowsPerPage,
    handleNameFilterChange,
    handleEmpresaFilterChange,
    handleUebFilterChange,
    limpiarFiltrados,
    openConfirmation,
    handleDelete,
    handleCloseDialogAdvertencia,
    nombreEmpresa,
    nombreUeb,
    vinculado,
    optionEmpresas,
    uebPorId,
    optionUebs,
    paginatedData,
    filteredData,
    handleCloseForm,
    handleCloseI,
  } = useDireccion({ direcciones, setDirecciones, empresas, uebs, areas });

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

                <FormDialog
                  open={dialogOpen}
                  onClose={handleCloseForm}
                  onCancel={handleCloseForm}
                  onSave={handleCloseForm}
                  uebPorId={uebPorId}
                  FormComponent={DireccionForm}
                  {...{ setDirecciones, direcciones, empresas, uebs }}
                />

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

              {direcciones.length === 0 ? (
                <div className={styles.divIconH2}>
                  <h5>No hay direcciones</h5>
                </div>
              ) : (
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell className={styles.spacing}>
                        Empresa
                        {showFilters && (
                          <Select
                            styles={customStyles}
                            value={empresaFilter}
                            onChange={handleEmpresaFilterChange}
                            options={optionEmpresas}
                            isClearable
                          />
                        )}
                      </TableCell>
                      <TableCell className={styles.spacing}>
                        Ueb
                        {showFilters && (
                          <Select
                            styles={customStyles}
                            value={uebFilter}
                            onChange={handleUebFilterChange}
                            options={optionUebs}
                            isClearable
                          />
                        )}
                      </TableCell>
                      <TableCell className={styles.spacing}>
                        Dirección
                        {showFilters && (
                          <input
                            className={styles.inputFilter}
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
                    {paginatedData.map((direccion) => (
                      <TableRow
                        key={direccion.id_direccion}
                        className={styles.trStyle}
                      >
                        <TableCell className={styles.tdStyle}>
                          {nombreEmpresa(
                            uebs.find((u) => u.id_ueb === direccion.id_ueb)
                              ?.id_empresa
                          )}
                        </TableCell>
                        <TableCell className={styles.tdStyle}>
                          {nombreUeb(direccion.id_ueb)}
                        </TableCell>
                        <TableCell className={styles.tdStyle}>
                          {direccion.nombre_direccion}
                        </TableCell>
                        <TableCell className={styles.tdStyleIcon}>
                          <FontAwesomeIcon
                            icon={faEdit}
                            className={styles.faIcon}
                            onClick={() =>
                              setEditIIdx(
                                filteredData.findIndex(
                                  (d) =>
                                    d.id_direccion === direccion.id_direccion
                                )
                              )
                            }
                          />
                          <FontAwesomeIcon
                            icon={faTrash}
                            className={styles.faIcon}
                            onClick={() =>
                              vinculado(direccion.id_direccion)
                                ? setOpenDialogAdvertencia(true)
                                : openConfirmation(direccion.id_direccion)
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>

                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        count={filteredData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[5, 10, 25]}
                        labelRowsPerPage="Filas por página:"
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              )}

              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirmar Eliminación</DialogTitle>
                <DialogContent>
                  <p>¿Está seguro de eliminar esta dirección?</p>
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
                  No se puede eliminar una dirección vinculada a un área
                  <Button onClick={handleCloseDialogAdvertencia}>
                    Aceptar
                  </Button>
                </Alert>
              </Dialog>

              <FormDialog
                open={editIIdx !== -1}
                onClose={handleCloseI}
                FormComponent={DireccionForm}
                setDirecciones={setDirecciones}
                direcciones={direcciones}
                direccion={direcciones[editIIdx]}
                onSave={handleCloseI}
                onCancel={handleCloseI}
                empresas={empresas}
                uebPorId={uebPorId}
                uebs={uebs}
                nombreEmpresa={nombreEmpresa}
                nombreUeb={nombreUeb}
              ></FormDialog>
            </TableContainer>
          </div>
        </div>
      </>
    );
  }
}

export default DireccionTable;
