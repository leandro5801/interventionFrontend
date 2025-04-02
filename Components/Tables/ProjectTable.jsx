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
import ProyectoForm from "../Forms/ProyectoForm";

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
  Tooltip,
  Fade,
  Zoom,
} from "@mui/material";

import Select from "react-select";
import { useProjectTable } from "./hooks/useProjectTable";

function ProjectTable({
  projects,
  setProjects,
  consultores,
  clientes,
  cargando,
  interventions,
}) {
  const {
    page,
    rowsPerPage,
    dialogOpen,
    editIIdx,
    open,
    data,
    error,
    openDialogAdvertencia,
    setOpenDialogAdvertencia,
    handleTypeProjectFilterChange,
    clienteFilter,
    consultoresFilter,
    filteredData,
    nombreCliente,
    nombreConsultor,
    vinculado,
    filterOptions,
    handleChangePage,
    handleChangeRowsPerPage,
    limpiarFiltrados,
    setDialogOpen,
    setEditIIdx,
    handleDelete,
    openConfirmation,
    handleClose,
    handleCloseDialogAdvertencia,
    proyectoUpdate,
    handleCancelI,
    handleSaveI,
    tipos_proyecto,
    setNameFilter,
    setObjetivoFilter,
    setClienteFilter,
    setConsultoresFilter,
  } = useProjectTable({
    projects,
    setProjects,
    consultores,
    clientes,
    interventions,
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
                    value={clienteFilter}
                    onChange={setClienteFilter}
                    options={filterOptions.clientes}
                    placeholder="Clientes"
                    isClearable
                    className={styles.selectGestionesGantt}
                  />
                  <Select
                    styles={customStyles}
                    value={consultoresFilter}
                    onChange={setConsultoresFilter}
                    options={filterOptions.consultores}
                    placeholder="Consultor"
                    isClearable
                    className={styles.selectGestionesGantt}
                  />
                  {tipos_proyecto?.length > 0 && (
                    <Select
                      styles={customStyles}
                      className={styles.selectGestionesGantt}
                      // defaultValue={typeProjectFilter}
                      onChange={(tipo_proyecto) => {
                        handleTypeProjectFilterChange(tipo_proyecto);
                      }}
                      options={tipos_proyecto}
                      placeholder="Tipo Proyecto"
                      isClearable
                    />
                  )}
                </div>

                <FormDialog
                  open={dialogOpen}
                  onClose={() => setDialogOpen(false)}
                  onSave={() => setDialogOpen(false)}
                  onCancel={() => setDialogOpen(false)}
                  FormComponent={ProyectoForm}
                  {...{
                    setProjects,
                    projects,
                    consultoress: consultores,
                    clientess: clientes,
                    nombreConsultor,
                    nombreCliente,
                  }}
                />
              </div>

              {projects.length === 0 ? (
                <div className={styles.divIconH2}>
                  <h5> No hay proyectos</h5>
                </div>
              ) : (
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      {["Proyecto", "Objetivo", "Cliente", "Consultor", ""].map(
                        (header, idx) => (
                          <TableCell
                            key={idx}
                            className={styles.letraEnNegrita}
                          >
                            {header}
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filteredData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((project, i) => (
                        <Tooltip
                          title={project.tipo_proyecto}
                          followCursor
                          TransitionComponent={Zoom}
                          TransitionProps={{ timeout: 100 }}
                          key={`${project.id_proyecto}-${i}`}
                        >
                          <TableRow
                            key={project.id_proyecto}
                            className={styles.trStyle}
                          >
                            <TableCell className={styles.tdStyle}>
                              {project.nombre_proyecto}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              {project.objetivos
                                ? project.objetivos
                                : "No hay objetivos"}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              {nombreCliente(parseInt(project.id_cliente))}
                            </TableCell>
                            <TableCell className={styles.tdStyle}>
                              {project.consultores_asignados_id
                                ? project.consultores_asignados_id
                                    .map((consultor) =>
                                      nombreConsultor(consultor)
                                    )
                                    .join(", ")
                                : "No hay consultores"}
                            </TableCell>
                            <TableCell className={styles.tdStyleIcon}>
                              <FontAwesomeIcon
                                icon={faEdit}
                                onClick={() =>
                                  setEditIIdx(
                                    filteredData.findIndex(
                                      (item) =>
                                        item.id_proyecto === project.id_proyecto
                                    )
                                  )
                                }
                                className={styles.faIcon}
                              />
                              <FontAwesomeIcon
                                icon={faTrash}
                                onClick={() =>
                                  vinculado(project.id_proyecto)
                                    ? setOpenDialogAdvertencia(true)
                                    : openConfirmation(project.id_proyecto)
                                }
                                className={styles.faIcon}
                              />
                            </TableCell>
                          </TableRow>
                        </Tooltip>
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

            {/* Diálogos */}
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Confirmar Eliminación</DialogTitle>
              <DialogContent>
                <p>¿Está seguro de eliminar este proyecto?</p>
                {error && <p style={{ color: "red" }}>{error}</p>}
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
                No se puede eliminar un proyecto que ya esté vinculado a una
                intervención
                <div className={styles.botonAlert}>
                  <Button onClick={handleCloseDialogAdvertencia}>
                    Aceptar
                  </Button>
                </div>
              </Alert>
            </Dialog>

            <FormDialog
              open={editIIdx !== -1}
              onClose={handleCancelI}
              onSave={handleSaveI}
              onCancel={handleCancelI}
              FormComponent={ProyectoForm}
              {...{
                setProjects,
                projects,
                project: projects[editIIdx],
                consultoress: consultores,
                clientess: clientes,
                nombreConsultor,
                nombreCliente,
              }}
            />
          </div>
        </div>
      </>
    );
  }
}

export default ProjectTable;
