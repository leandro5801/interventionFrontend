import styles from "../../styles/Home.module.css";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

function InterventionTable({ filteredTasks, tableVisible, setTableVisible }) {
  //  Para el filtrado por criterios (consultor, trabajador y proceso)
  const [showFilters, setShowFilters] = useState(false);
  const [consultorFilterValue, setConsultorFilterValue] = useState(null);
  const [trabajadorFilterValue, setTrabajadorFilterValue] = useState(null);
  const [procesoFilterValue, setProcesoFilterValue] = useState(null);

  //  Filtrar los datos de la tabla
  const filteredData = filteredTasks.filter((row) => {
    let consultorMatch = true;
    let trabajadorMatch = true;
    let procesoMatch = true;

    if (consultorFilterValue) {
      consultorMatch = row.consultor === consultorFilterValue;
    }
    if (trabajadorFilterValue) {
      trabajadorMatch = row.worker === trabajadorFilterValue;
    }
    if (procesoFilterValue) {
      procesoMatch = row.process === procesoFilterValue;
    }

    return consultorMatch && trabajadorMatch && procesoMatch;
  });

  // Obtener los valores únicos para cada columna después de aplicar cada filtro individualmente
  const uniqueConsultors = [
    ...new Set(
      filteredTasks
        .filter(
          (row) =>
            !trabajadorFilterValue || row.worker === trabajadorFilterValue
        )
        .filter(
          (row) => !procesoFilterValue || row.process === procesoFilterValue
        )
        .map((row) => row.consultor)
    ),
  ];
  const uniqueTrabajadors = [
    ...new Set(
      filteredTasks
        .filter(
          (row) =>
            !consultorFilterValue || row.consultor === consultorFilterValue
        )
        .filter(
          (row) => !procesoFilterValue || row.process === procesoFilterValue
        )
        .map((row) => row.worker)
    ),
  ];
  const uniqueProcesos = [
    ...new Set(
      filteredTasks
        .filter(
          (row) =>
            !consultorFilterValue || row.consultor === consultorFilterValue
        )
        .filter(
          (row) =>
            !trabajadorFilterValue || row.worker === trabajadorFilterValue
        )
        .map((row) => row.process)
    ),
  ];

  // Alternar la visibilidad de las opciones de filtrado y restablecer los valores de filtrado
  const toggleFilters = () => {
    setShowFilters(!showFilters);
    setConsultorFilterValue(null);
    setTrabajadorFilterValue(null);
    setProcesoFilterValue(null);
  };
  return (
    <>
      <div className={styles.divTableInter}>
        <div className={styles.divIconH2}>
          <h2>Intervenciones</h2>
          <FontAwesomeIcon
            icon={faFilter}
            onClick={toggleFilters}
            className={styles.faIcon}
          />
        </div>
        {showFilters && (
          <>
            <select
              className={styles.select}
              onChange={(e) => setConsultorFilterValue(e.target.value)}
              value={consultorFilterValue || ""}
            >
              <option value="" hidden>Selecciona un consultor</option>
              {uniqueConsultors.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <select
              className={styles.select}
              onChange={(e) => setTrabajadorFilterValue(e.target.value)}
              value={trabajadorFilterValue || ""}
            >
              <option value="" hidden>Selecciona un trabajador</option>
              {uniqueTrabajadors.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>

            <select
              className={styles.select}
              onChange={(e) => setProcesoFilterValue(e.target.value)}
              value={procesoFilterValue || ""}
            >
              <option value="" hidden>Selecciona un proceso</option>
              {uniqueProcesos.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </>
        )}
        {tableVisible && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.spacing}>Intervención</th>
                <th className={styles.spacing}>Descripción</th>
                <th className={styles.spacing}>Proceso</th>
                <th className={styles.spacing}>UEB</th>
                <th className={styles.spacing}>Estructura</th>
                <th className={styles.spacing}>Área</th>
                <th className={styles.spacing}>Consultor</th>
                <th className={styles.spacing}>Trabajador</th>
              </tr>
            </thead>
            <tbody>
              {filteredData &&
                filteredData.map((tsk, i) => (
                  <tr key={tsk.id} className={styles.trStyle}>
                    <td className={styles.tdStyle}>{tsk.name}</td>
                    <td className={styles.tdStyle}>{tsk.description}</td>
                    <td className={styles.tdStyle}>{tsk.process}</td>
                    <td className={styles.tdStyle}>{tsk.ueb}</td>
                    <td className={styles.tdStyle}>{tsk.structure}</td>
                    <td className={styles.tdStyle}>{tsk.area}</td>
                    <td className={styles.tdStyle}>{tsk.consultor}</td>
                    <td className={styles.tdStyle}>{tsk.worker}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default InterventionTable;
