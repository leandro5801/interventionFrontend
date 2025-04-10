import styles from "../../styles/Home.module.css";
import { useContext, useState } from "react";
import axios from "axios";
import { customStyles } from "../../styles/SelectFilterStyles";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import FilterListOffOutlinedIcon from "@mui/icons-material/FilterListOffOutlined";

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FormDialog from "../Forms/FormDialog";
import IntervrntionForm from "../Forms/IntervrntionForm";
import PublishedWithChangesOutlinedIcon from "@mui/icons-material/PublishedWithChangesOutlined";

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
import { useInterventionTable } from "./hooks/useInterventionTable";
import InterventionCargarDatosForm from "../Forms/IntervencionCargarForm";
import { UserContext } from "../../contexts/user/UserContext";

function InterventionTable({
  filteredInterventions,
  interventions,
  setInterventions,
  projects,
  empresas,
  uebs,
  direcciones,
  areas,
  trabajadores,
  consultores,
  consultor,
  cargando,
  recomendations,
}) {
  const {
    page,
    rowsPerPage,
    dialogCreInteOpen,
    editIIdx,
    open,
    data,
    error,
    openDialogAdvertencia,
    setOpenDialogAdvertencia,
    showFilters,
    projectFilter,
    empresaFilter,
    uebFilter,
    structureFilter,
    areaFilter,
    consultorFilter,
    nameFilter,
    descriptionFilter,
    workerFilter,
    startFilter,
    filteredData,
    nombreEmpresa,
    nombreUeb,
    nombreDireccion,
    nombreArea,
    nombreConsultor,
    nombreTrabajador,
    nombreProyecto,
    vinculado,
    filterOptions,
    handleChangePage,
    handleChangeRowsPerPage,
    handleCancelI,
    handleSaveI,
    toggleFilters,
    limpiarFiltrados,
    setDialogCreInteOpen,
    handleCloseInterventionForm,
    setEditIIdx,
    handleDelete,
    openConfirmation,
    handleClose,
    handleCloseDialogAdvertencia,
    interventionUpdate,
    setNameFilter,
    setDescriptionFilter,
    setWorkerFilter,
    areaPorId,
    direccionPorId,
    uebPorId,
    setStartFilter,
    setProjectFilter,
    setEmpresaFilter,
    setUebFilter,
    setStructureFilter,
    setAreaFilter,
    setConsultorFilter,
    dialogChargeOpen,
    setDialogChargeOpen,
  } = useInterventionTable({
    filteredInterventions,
    interventions,
    setInterventions,
    projects,
    empresas,
    uebs,
    direcciones,
    areas,
    trabajadores,
    consultores,
    recomendations,
  });
  const { user } = useContext(UserContext);

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
                  onClick={() => setDialogCreInteOpen(true)}
                >
                  Nuevo +
                </Button>
                {user.id_rol === 3 && (
                  <Button
                    className={styles.btn}
                    onClick={() => {
                      setDialogChargeOpen(true);
                    }}
                    style={{ margin: 5 }}
                  >
                    Cargar
                    <PublishedWithChangesOutlinedIcon
                      style={{
                        width: "14px",
                        cursor: "pointer",
                        verticalAlign: "middle",
                        marginLeft: 2,
                      }}
                    />
                  </Button>
                )}

                <div className={styles.filtrosEstructuraContentInt}>
                  <Select
                    styles={customStyles}
                    value={projectFilter}
                    onChange={setProjectFilter}
                    options={filterOptions.projects}
                    placeholder="Proyecto"
                    isClearable
                    className={styles.selectGestionesGantt}
                  />
                  <Select
                    styles={customStyles}
                    value={consultorFilter}
                    onChange={setConsultorFilter}
                    options={filterOptions.consultores}
                    placeholder="Consultor"
                    isClearable
                    className={styles.selectGestionesGantt}
                  />
                </div>

                <FormDialog
                  open={dialogCreInteOpen}
                  onClose={handleCloseInterventionForm}
                  onSave={handleCloseInterventionForm}
                  onCancel={handleCloseInterventionForm}
                  areaPorId={areaPorId}
                  uebPorId={uebPorId}
                  direccionPorId={direccionPorId}
                  FormComponent={IntervrntionForm}
                  {...{
                    setInterventions,
                    filteredInterventions,
                    interventions,
                    consultores,
                    trabajadores,
                    empresas,
                    uebs,
                    direcciones,
                    areas,
                    projects,
                    nombreEmpresa,
                    nombreUeb,
                    nombreTrabajador,
                    nombreDireccion,
                    nombreArea,
                    nombreConsultor,
                    nombreProyecto,
                    consultor,
                  }}
                />

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

              <div className={styles.filtrosEstructuraContentInt}>
                {showFilters && (
                  <>
                    <Select
                      styles={customStyles}
                      value={empresaFilter}
                      onChange={setEmpresaFilter}
                      options={filterOptions.empresas}
                      placeholder="Empresa"
                      isClearable
                      className={styles.selectGestiones}
                    />
                    <Select
                      styles={customStyles}
                      value={uebFilter}
                      onChange={setUebFilter}
                      options={filterOptions.uebs}
                      placeholder="Ueb"
                      isClearable
                      className={styles.selectGestiones}
                    />
                    <Select
                      styles={customStyles}
                      value={structureFilter}
                      onChange={setStructureFilter}
                      options={filterOptions.direcciones}
                      placeholder="Dirección"
                      isClearable
                      className={styles.selectGestiones}
                    />
                    <Select
                      styles={customStyles}
                      value={areaFilter}
                      onChange={setAreaFilter}
                      options={filterOptions.areas}
                      placeholder="Área"
                      isClearable
                      className={styles.selectGestiones}
                    />
                    <input
                      className={styles.inputFilter}
                      type="date"
                      value={startFilter}
                      onChange={(e) => setStartFilter(e.target.value)}
                      placeholder="Filtrar por fecha"
                    />
                  </>
                )}
              </div>

              {filteredInterventions.length === 0 ? (
                <div className={styles.divIconH2}>
                  <h5> No hay Intervenciones</h5>
                </div>
              ) : (
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      {[
                        "Proyecto",
                        "Intervención",
                        "Descripción",
                        "Consultor",
                        "Trabajador",
                        "",
                      ].map((header, idx) => (
                        <TableCell key={idx} className={styles.letraEnNegrita}>
                          {header}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filteredData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((tsk) => (
                        <TableRow key={tsk.id_intervencion}>
                          <TableCell>
                            {nombreProyecto(tsk.id_proyecto)}
                          </TableCell>
                          <TableCell>{tsk.nombre_intervencion}</TableCell>
                          <TableCell>
                            {tsk.descripcion
                              ? tsk.descripcion
                              : "No encontrado"}
                          </TableCell>
                          <TableCell>
                            {nombreConsultor(tsk.id_consultor)}
                          </TableCell>
                          <TableCell>
                            {nombreTrabajador(tsk.id_trabajador)}
                          </TableCell>
                          <TableCell className={styles.tdStyleIcon}>
                            <FontAwesomeIcon
                              icon={faEdit}
                              onClick={() =>
                                setEditIIdx(
                                  filteredInterventions.findIndex(
                                    (item) =>
                                      item.id_intervencion ===
                                      tsk.id_intervencion
                                  )
                                )
                              }
                              className={styles.faIcon}
                            />
                            <FontAwesomeIcon
                              icon={faTrash}
                              onClick={() =>
                                vinculado(tsk.id_intervencion)
                                  ? setOpenDialogAdvertencia(true)
                                  : openConfirmation(tsk.id_intervencion)
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

            {/* Diálogos */}
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Confirmar Eliminación</DialogTitle>
              <DialogContent>
                <p>¿Está seguro de eliminar esta Intervención?</p>
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
                No se puede eliminar una intervención que ya esté vinculada a
                una recomendación
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
              areaPorId={areaPorId}
              uebPorId={uebPorId}
              direccionPorId={direccionPorId}
              FormComponent={IntervrntionForm}
              {...{
                interventions,
                setInterventions,
                intervention: filteredInterventions[editIIdx],
                consultores,
                consultor,
                trabajadores,
                empresas,
                uebs,
                direcciones,
                areas,
                projects,
                nombreEmpresa,
                nombreUeb,
                nombreTrabajador,
                nombreDireccion,
                nombreArea,
                nombreConsultor,
                nombreProyecto,
              }}
            />

            <FormDialog
              open={dialogChargeOpen}
              onClose={() => {
                setDialogChargeOpen(false);
              }}
              FormComponent={InterventionCargarDatosForm}
              setInterventions={setInterventions}
              filteredInterventions={filteredInterventions}
              interventions={interventions}
              onSave={() => {
                setDialogChargeOpen(false);
              }}
              onCancel={() => {
                setDialogChargeOpen(false);
              }}
              consultores={consultores}
              trabajadores={trabajadores}
              empresas={empresas}
              uebs={uebs}
              direcciones={direcciones}
              areas={areas}
              projects={projects}
              nombreEmpresa={nombreEmpresa}
              nombreUeb={nombreUeb}
              nombreTrabajador={nombreTrabajador}
              nombreDireccion={nombreDireccion}
              nombreArea={nombreArea}
              nombreConsultor={nombreConsultor}
              nombreProyecto={nombreProyecto}
              areaPorId={areaPorId}
              direccionPorId={direccionPorId}
              uebPorId={uebPorId}
              consultor={consultor}
            ></FormDialog>
          </div>
        </div>
      </>
    );
  }
}

export default InterventionTable;
