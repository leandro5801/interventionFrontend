import styles from "../../styles/Home.module.css";
import { useState, useEffect } from "react";
import Select from "react-select";
import { customStyles } from "../../styles/SelectFilterStyles";

import FormDialog from "../Forms/FormDialog";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faPlus,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import FilterListOffOutlinedIcon from "@mui/icons-material/FilterListOffOutlined";

//sms de confirmacion
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
import { useReportTable } from "./hooks/useReportTable";

function ReportTable({
  recomendations,
  setRecomendations,
  interventions,
  projects,
  setSelectedIntervention,
}) {
  const {
    page,
    rowsPerPage,
    showFilters,
    projectFilter,
    interventionFilter,
    fechaFilter,
    nameFilter,
    descriptionFilter,
    followFilter,
    nombreProyecto,
    nombreIntervencion,
    intervencionPorId,
    isFollow,
    optionProjects,
    optioninterventions,
    handleChangePage,
    handleChangeRowsPerPage,
    toggleFilters,
    handleProjectFilterChange,
    handleInterventionFilterChange,
    limpiarFiltrados,
    handleClick,
    setFechaFilter,
    setNameFilter,
    setDescriptionFilter,
    setFollowFilter,
    filteredData,
  } = useReportTable({
    recomendations,
    interventions,
    projects,
    setSelectedIntervention,
  });
  return (
    <>
      <>
        <div className={styles.divIconH2}></div>
        <TableContainer component={Paper} className={styles.tableReport}>
          <>
            <div className={styles.btnNuevoContent}>
              <div className={styles.filtrosEstructuraContentInt}>
                <Select
                  styles={customStyles}
                  className={styles.selectGestionesGantt}
                  defaultValue={projectFilter}
                  onChange={(projectFilter) => {
                    handleProjectFilterChange(projectFilter);
                    setSelectedIntervention(null);
                  }}
                  options={optionProjects}
                  placeholder="Proyecto"
                  isClearable
                />

                <Select
                  styles={customStyles}
                  className={styles.selectGestionesGantt}
                  defaultValue={interventionFilter}
                  onChange={(interventionFilter) => {
                    handleInterventionFilterChange(interventionFilter);
                    setSelectedIntervention(null);
                  }}
                  options={optioninterventions}
                  placeholder="Intervenci..."
                  isClearable
                />
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
            {recomendations.length === 0 && (
              <div className={styles.divIconH2}>
                <h5> No hay Reportes</h5>{" "}
              </div>
            )}
            {recomendations.length === 0 || (
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
                      Fecha
                    </TableCell>
                    <TableCell className={styles.letraEnNegrita}>
                      Seguida
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((recomendation) => (
                      <TableRow
                        key={recomendation.id_recomendacion}
                        data-int-id={recomendation.id_intervencion}
                        onClick={handleClick}
                        style={{ cursor: "pointer" }}
                      >
                        {/* {console.log(recomendation)}
                        {console.log(
                          intervencionPorId(recomendation.id_intervencion)
                        )} */}
                        <TableCell>
                          {nombreProyecto(
                            intervencionPorId(recomendation.id_intervencion)
                              .id_proyecto
                          )}
                        </TableCell>
                        <TableCell
                          // data-int-id={recomendation.id_intervencion}
                          value={recomendation.id_intervencion}
                          //  onClick={handleClick}
                        >
                          {nombreIntervencion(recomendation.id_intervencion)}
                        </TableCell>
                        <TableCell>
                          {recomendation.nombre_recomendacion}
                        </TableCell>
                        <TableCell>
                          {recomendation.descripcion_recomendacion}
                        </TableCell>
                        <TableCell>
                          {recomendation.fecha_recomendacion}
                        </TableCell>
                        <TableCell>
                          {isFollow(recomendation.seguimiento)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      className={styles.tablePagination}
                      rowsPerPageOptions={[4, 5, 10]}
                      count={recomendations.length}
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
      </>
    </>
  );
}
export default ReportTable;
