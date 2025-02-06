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
import AreaForm from "../Forms/AreaForm";

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
import useArea from "./hooks/useAreaTable";

function AreaTable({
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
    openDialogAdvertencia,
    error,
    editIIdx,
    data,
    setDialogOpen,
    setEditIIdx,
    setOpenDialogAdvertencia,
    handleClose,
    toggleFilters,
    handleChangePage,
    handleChangeRowsPerPage,
    handleNameFilterChange,
    handleEmpresaFilterChange,
    handleUebFilterChange,
    handleStructureFilterChange,
    limpiarFiltrados,
    openConfirmation,
    handleDelete,
    handleSaveI,
    handleCancelI,
    areaUpdate,
    vinculado,
    optionEmpresas,
    optionUebs,
    optionDirecciones,
    paginatedData,
    filteredData,
  } = useArea({
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

                <FormDialog
                  open={dialogOpen}
                  onClose={() => setDialogOpen(false)}
                  onCancel={() => setDialogOpen(false)}
                  onSave={() => setDialogOpen(false)}
                  FormComponent={AreaForm}
                  {...{
                    setAreas,
                    areas,
                    empresas,
                    uebs,
                    direcciones,
                    uebPorId,
                    direccionPorId,
                    nombreEmpresa,
                    nombreUeb,
                    nombreDireccion,
                  }}
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

              {areas.length === 0 ? (
                <div className={styles.divIconH2}>
                  <h5>No hay áreas</h5>
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
                          <Select
                            styles={customStyles}
                            value={structureFilter}
                            onChange={handleStructureFilterChange}
                            options={optionDirecciones}
                            isClearable
                          />
                        )}
                      </TableCell>
                      <TableCell className={styles.spacing}>
                        Área
                        {showFilters && (
                          <input
                            className={styles.inputFilter}
                            value={nameFilter}
                            onChange={handleNameFilterChange}
                            placeholder="Filtrar por áreas"
                          />
                        )}
                      </TableCell>
                      <TableCell className={styles.spacing}></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {paginatedData.map((area) => (
                      <TableRow key={area.id_area} className={styles.trStyle}>
                        <TableCell className={styles.tdStyle}>
                          {nombreEmpresa(
                            uebPorId(direccionPorId(area.id_direccion).id_ueb)
                              .id_empresa
                          )}
                        </TableCell>
                        <TableCell className={styles.tdStyle}>
                          {nombreUeb(direccionPorId(area.id_direccion).id_ueb)}
                        </TableCell>
                        <TableCell className={styles.tdStyle}>
                          {nombreDireccion(area.id_direccion)}
                        </TableCell>
                        <TableCell className={styles.tdStyle}>
                          {area.nombre_area}
                        </TableCell>
                        <TableCell className={styles.tdStyleIcon}>
                          <FontAwesomeIcon
                            className={styles.faIcon}
                            icon={faEdit}
                            onClick={() =>
                              setEditIIdx(
                                filteredData.findIndex(
                                  (d) => d.id_area === area.id_area
                                )
                              )
                            }
                          />
                          <FontAwesomeIcon
                            className={styles.faIcon}
                            icon={faTrash}
                            onClick={() =>
                              vinculado(area.id_area)
                                ? setOpenDialogAdvertencia(true)
                                : openConfirmation(area.id_area)
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
                  <p>¿Está seguro de eliminar esta área?</p>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => handleDelete(data)}>Aceptar</Button>
                  <Button onClick={handleClose}>Cancelar</Button>
                </DialogActions>
              </Dialog>

              <Dialog
                open={openDialogAdvertencia}
                onClose={() => setOpenDialogAdvertencia(false)}
              >
                <Alert severity="warning">
                  <AlertTitle>Advertencia</AlertTitle>
                  No se puede eliminar un área vinculada a trabajadores
                  <Button onClick={() => setOpenDialogAdvertencia(false)}>
                    Aceptar
                  </Button>
                </Alert>
              </Dialog>

              <FormDialog
                open={editIIdx !== -1}
                onClose={handleCancelI}
                onSave={handleCancelI}
                onCancel={handleCancelI}
                FormComponent={AreaForm}
                setAreas={setAreas}
                area={areas[editIIdx]}
                areas={areas}
                uebPorId={uebPorId}
                direccionPorId={direccionPorId}
                nombreEmpresa={nombreEmpresa}
                nombreUeb={nombreUeb}
                nombreDireccion={nombreDireccion}
                empresas={empresas}
                uebs={uebs}
                direcciones={direcciones}
              ></FormDialog>
            </TableContainer>
          </div>
        </div>
      </>
    );
  }
}

export default AreaTable;
