import styles from "../../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";
import Select from "react-select";
import { customStyles } from "../../styles/SelectFilterStyles";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import Settings from "../GanttChart/Settings";
import DialogForm from "../Forms/Dialog";
import FormDialog from "../Forms/FormDialog";
import RecomendationEditForm from "../Forms/RecomendationEditForm";
import CreateRecomendationForm from "../Forms/RecomendationCreateForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faPlus,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import FilterListOffOutlinedIcon from "@mui/icons-material/FilterListOffOutlined";

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
import { useRecomendationTable } from "./hooks/useRecomendationTable";

function RecomendationTable({
  filtredRecomendations,
  recomendations,
  setRecomendations,
  interventions,
  projects,
  consultores,
  consultor,
  clasificaciones,
  cargando,
}) {
  const {
    classificationFilter,
    consultorFilter,
    descriptionFilter,
    fechaFilter,
    followFilter,
    interventionFilter,
    nameFilter,
    projectFilter,
    recomendationUpdate,
    dialogCreRecOpen,
    setDialogRecOpen,
    page,
    handleFechaFilterChange,
    rowsPerPage,
    showFilters,
    filterOptions,
    filteredData,
    editRIdx,
    open,
    intervencionPorId,
    data,
    error,
    handleChangePage,
    handleChangeRowsPerPage,
    toggleFilters,
    limpiarFiltrados,
    setEditRIdx,
    setProjectFilter,
    setInterventionFilter,
    setConsultorFilter,
    setClassificationFilter,
    setNameFilter,
    setDescriptionFilter,
    setFechaFilter,
    setFollowFilter,
    handleDelete,
    openConfirmation,
    handleCancelR,
    handleSaveR,
    handleClose,
    nombreProyecto,
    nombreIntervencion,
    nombreConsultor,
    nombreClasificacion,
    isFollow,
  } = useRecomendationTable({
    filtredRecomendations,
    recomendations,
    setRecomendations,
    interventions,
    projects,
    consultores,
    clasificaciones,
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
        <>
          <div className={styles.divIconH2}></div>
          <TableContainer component={Paper} className={styles.table}>
            <div className={styles.btnNuevoContent}>
              <Button
                className={styles.btn}
                onClick={() => {
                  setDialogRecOpen(true);
                }}
              >
                Nuevo +
              </Button>
              <div className={styles.filtrosEstructuraContentInt}>
                {" "}
                <Select
                  styles={customStyles}
                  className={styles.selectGestionesGantt}
                  defaultValue={projectFilter}
                  onChange={setProjectFilter}
                  options={filterOptions.projects}
                  placeholder="Proyecto"
                  isClearable
                />
                <Select
                  styles={customStyles}
                  className={styles.selectGestionesGantt}
                  defaultValue={interventionFilter}
                  onChange={setInterventionFilter}
                  options={filterOptions.interventions}
                  placeholder="Intervención"
                  isClearable
                />
              </div>
              <div className={styles.filtrosEstructuraContentInt}>
                {showFilters && (
                  <Select
                    styles={customStyles}
                    className={styles.selectGestionesGantt}
                    defaultValue={consultorFilter}
                    onChange={setConsultorFilter}
                    options={filterOptions.consultores}
                    placeholder="Consultor"
                    isClearable
                  />
                )}
                {showFilters && (
                  <Select
                    styles={customStyles}
                    className={styles.selectGestionesGantt}
                    defaultValue={classificationFilter}
                    onChange={setClassificationFilter}
                    options={filterOptions.clasificaciones}
                    placeholder="Tipo"
                    isClearable
                  />
                )}
              </div>
              <div className={styles.filtrosEstructuraContentInt}>
                {showFilters && (
                  <input
                    className={styles.inputFilter}
                    type="date"
                    value={fechaFilter}
                    onChange={handleFechaFilterChange}
                    placeholder="Filtrar por fecha"
                  />
                )}
              </div>
              <FormDialog
                open={dialogCreRecOpen}
                onClose={() => {
                  setDialogRecOpen(false);
                }}
                FormComponent={CreateRecomendationForm}
                recomendations={recomendations}
                filtredRecomendations={filtredRecomendations}
                classifications={clasificaciones}
                setTableRData={setRecomendations}
                setRecomendations={setRecomendations}
                consultores={consultores}
                consultor={consultor}
                interventions={interventions}
                onSave={() => {
                  setDialogRecOpen(false);
                }}
                onCancel={() => {
                  setDialogRecOpen(false);
                }}
                nombreConsultor={nombreConsultor}
                nombreClasificacion={nombreClasificacion}
                isFollow={isFollow}
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
            <>
              {filtredRecomendations.length === 0 && (
                <div className={styles.divIconH2}>
                  <h5> No hay Recomendaciones</h5>{" "}
                </div>
              )}
              {filtredRecomendations.length === 0 || (
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell className={styles.letraEnNegrita}>
                        Proyecto
                      </TableCell>
                      <TableCell className={styles.letraEnNegrita}>
                        Intervención
                      </TableCell>
                      <TableCell className={styles.letraEnNegrita}>
                        Recomendación
                      </TableCell>
                      <TableCell className={styles.letraEnNegrita}>
                        Descripción
                      </TableCell>
                      <TableCell className={styles.letraEnNegrita}>
                        Consultor
                      </TableCell>
                      <TableCell className={styles.letraEnNegrita}>
                        Fecha
                      </TableCell>
                      <TableCell className={styles.letraEnNegrita}>
                        Tipo
                      </TableCell>
                      <TableCell className={styles.letraEnNegrita}>
                        Seguida
                      </TableCell>
                      <TableCell className={styles.letraEnNegrita}></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((recomendation) => (
                        <TableRow key={recomendation.id_recomendacion}>
                          <TableCell>
                            {nombreProyecto(
                              intervencionPorId(recomendation.id_intervencion)
                                .id_proyecto
                            )}
                          </TableCell>
                          <TableCell>
                            {nombreIntervencion(recomendation.id_intervencion)}
                          </TableCell>
                          <TableCell>
                            {recomendation.nombre_recomendacion}
                          </TableCell>
                          <TableCell>
                            {recomendation.descripcion_recomendacion}
                          </TableCell>
                          <TableCell>
                            {nombreConsultor(recomendation.id_consultor)}
                          </TableCell>
                          <TableCell>
                            {recomendation.fecha_recomendacion}
                          </TableCell>
                          <TableCell>
                            {nombreClasificacion(
                              recomendation.id_clasificacion
                            )}
                          </TableCell>
                          <TableCell>
                            {isFollow(recomendation.seguimiento)}
                          </TableCell>
                          <TableCell className={styles.tdStyleIcon}>
                            <FontAwesomeIcon
                              icon={faEdit}
                              onClick={() =>
                                setEditRIdx(
                                  filtredRecomendations.findIndex(
                                    (item) =>
                                      item.id_recomendacion ===
                                      recomendation?.id_recomendacion
                                  )
                                )
                              }
                              className={styles.faIcon}
                            />
                            <FontAwesomeIcon
                              icon={faTrash}
                              onClick={() =>
                                openConfirmation(
                                  recomendation?.id_recomendacion
                                )
                              }
                              data-task-id={recomendation?.id_recomendacion}
                              className={styles.faIcon}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      className="my-custom-dialog"
                    >
                      <DialogTitle>Confirmar Eliminación</DialogTitle>
                      <DialogContent>
                        <p>¿Está seguro de eliminar esta recomendación?</p>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => handleDelete(data)}>
                          Aceptar
                        </Button>
                        <Button onClick={handleClose}>Cancelar</Button>
                      </DialogActions>
                    </Dialog>
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
            </>
          </TableContainer>
          {/* Para editar  */}
          <FormDialog
            open={editRIdx !== -1}
            onClose={handleCancelR}
            FormComponent={RecomendationEditForm}
            setRecomendations={setRecomendations}
            recomendations={recomendations}
            filtredRecomendations={filtredRecomendations}
            recomendation={filtredRecomendations[editRIdx]}
            onSave={handleSaveR}
            onCancel={handleCancelR}
            consultores={consultores}
            consultor={consultor}
            classifications={clasificaciones}
            nombreConsultor={nombreConsultor}
            nombreClasificacion={nombreClasificacion}
            isFollow={isFollow}
          ></FormDialog>
        </>
      </>
    );
  }
}
export default RecomendationTable;
