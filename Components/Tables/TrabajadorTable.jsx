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
import TrabajadorForm from "../Forms/TrabajadorForm";

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
import useTrabajador from "./hooks/useTrabajadorTable";

function TrabajadorTable({
  trabajadores,
  setTrabajadores,
  empresas,
  uebs,
  direcciones,
  areas,
  cargando,
}) {
  const {
    open,
    dialogOpen,
    showFilters,
    page,
    rowsPerPage,
    nameFilter,
    empresaFilter,
    uebFilter,
    structureFilter,
    areaFilter,
    error,
    editIIdx,
    data,
    setDialogOpen,
    setEditIIdx,
    handleClose,
    toggleFilters,
    handleChangePage,
    handleChangeRowsPerPage,
    handleNameFilterChange,
    handleEmpresaFilterChange,
    handleUebFilterChange,
    handleStructureFilterChange,
    handleAreaFilterChange,
    limpiarFiltrados,
    openConfirmation,
    handleDelete,
    handleSaveI,
    handleCancelI,
    trabajadorUpdate,
    nombreEmpresa,
    nombreUeb,
    nombreDireccion,
    nombreArea,
    optionEmpresas,
    optionUebs,
    optionDirecciones,
    areaPorId,
    direccionPorId,
    uebPorId,
    optionAreas,
    paginatedData,
    filteredData,
  } = useTrabajador({
    trabajadores,
    setTrabajadores,
    empresas,
    uebs,
    direcciones,
    areas,
    cargando,
  });
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
                    className={styles.selectGestionesGantt}
                    value={empresaFilter}
                    onChange={handleEmpresaFilterChange}
                    options={optionEmpresas}
                    placeholder="Empresa"
                    isClearable
                  />
                  <Select
                    styles={customStyles}
                    className={styles.selectGestionesGantt}
                    value={uebFilter}
                    onChange={handleUebFilterChange}
                    options={optionUebs}
                    placeholder="Ueb"
                    isClearable
                  />
                  <Select
                    styles={customStyles}
                    className={styles.selectGestionesGantt}
                    value={structureFilter}
                    onChange={handleStructureFilterChange}
                    options={optionDirecciones}
                    placeholder="Dirección"
                    isClearable
                  />
                  <Select
                    styles={customStyles}
                    className={styles.selectGestionesGantt}
                    value={areaFilter}
                    onChange={handleAreaFilterChange}
                    options={optionAreas}
                    placeholder="Área"
                    isClearable
                  />
                </div>

                <FormDialog
                  open={dialogOpen}
                  onClose={() => setDialogOpen(false)}
                  onSave={() => setDialogOpen(false)}
                  onCancel={() => setDialogOpen(false)}
                  FormComponent={TrabajadorForm}
                  {...{
                    setTrabajadores,
                    trabajadores,
                    empresas,
                    uebs,
                    direcciones,
                    areas,
                    nombreEmpresa,
                    nombreUeb,
                    nombreDireccion,
                    nombreArea,
                  }}
                />
              </div>

              {trabajadores.length === 0 ? (
                <div className={styles.divIconH2}>
                  <h5>No hay trabajadores</h5>
                </div>
              ) : (
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell className={styles.spacing}>Empresa</TableCell>
                      <TableCell className={styles.spacing}>Ueb</TableCell>
                      <TableCell className={styles.spacing}>
                        Dirección
                      </TableCell>
                      <TableCell className={styles.spacing}>Área</TableCell>
                      <TableCell className={styles.spacing}>
                        Trabajador
                      </TableCell>
                      <TableCell className={styles.spacing}></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {paginatedData.map((trabajador) => (
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
                        <TableCell className={styles.tdStyleIcon}>
                          <FontAwesomeIcon
                            icon={faEdit}
                            onClick={() =>
                              setEditIIdx(
                                trabajadores.findIndex(
                                  (t) =>
                                    t.id_trabajador === trabajador.id_trabajador
                                )
                              )
                            }
                            className={styles.faIcon}
                          />
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() =>
                              openConfirmation(trabajador.id_trabajador)
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
                  <p>¿Está seguro de eliminar este trabajador?</p>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => handleDelete(data)}>Aceptar</Button>
                  <Button onClick={handleClose}>Cancelar</Button>
                </DialogActions>
              </Dialog>

              <FormDialog
                open={editIIdx !== -1}
                onClose={handleCancelI}
                uebPorId={uebPorId}
                direccionPorId={direccionPorId}
                areaPorId={areaPorId}
                FormComponent={TrabajadorForm}
                {...{
                  trabajador: trabajadores[editIIdx],
                  setTrabajadores,
                  trabajadores,
                  empresas,
                  uebs,
                  direcciones,
                  areas,
                  nombreEmpresa,
                  nombreUeb,
                  nombreDireccion,
                  nombreArea,
                  onSave: handleSaveI,
                  onCancel: handleCancelI,
                }}
              />
            </TableContainer>
          </div>
        </div>
      </>
    );
  }
}

export default TrabajadorTable;
