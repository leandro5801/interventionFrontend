import styles from "../../styles/Home.module.css";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

function RecomendationTable({
  tableRData,
  setTableRData,
  setEditRIdx,
  tableVisible,
  setTableVisible,
  recomendations,
  setRecomendations,
}) {
  //  Para el filtrado por criterios (consultor y tipo)
  const [showFilters, setShowFilters] = useState(false);
  const [consultorFilterValue, setConsultorFilterValue] = useState(null);
  const [classificationFilterValue, setClassificationFilterValue] =
    useState(null);

  //  Filtrar los datos de la tabla
  const filteredData = tableRData.filter((row) => {
    let consultorMatch = true;
    let classificationMatch = true;

    if (consultorFilterValue) {
      consultorMatch = row.consultor === consultorFilterValue;
    }
    if (classificationFilterValue) {
      classificationMatch = row.classification === classificationFilterValue;
    }

    return consultorMatch && classificationMatch;
  });

  // Obtener los valores únicos para cada columna después de aplicar cada filtro individualmente
  const uniqueConsultors = [
    ...new Set(
      tableRData
        .filter(
          (row) =>
            !classificationFilterValue ||
            row.classification === classificationFilterValue
        )
        .map((row) => row.consultor)
    ),
  ];
  const uniqueClassification = [
    ...new Set(
      tableRData
        .filter(
          (row) =>
            !consultorFilterValue || row.consultor === consultorFilterValue
        )
        .map((row) => row.classification)
    ),
  ];

  // Alternar la visibilidad de las opciones de filtrado y restablecer los valores de filtrado
  const toggleFilters = () => {
    setShowFilters(!showFilters);
    setConsultorFilterValue(null);
    setClassificationFilterValue(null);
  };

  function handleDelete(e) {
    const idNum = parseInt(e.target.getAttribute("data-task-id"));
    const newRecomendation = tableRData.filter(
      (recomendacion) => recomendacion.id !== idNum
    );

    setTableRData(newRecomendation);
    const newRecomendations = recomendations.filter(
      (recomendacion) => recomendacion.id !== idNum
    );
    setRecomendations(newRecomendations);
    // update state (if data on backend - make API request to update data)
  }
  return (
    <>
      <div className={styles.divIconH2}>
      <h2>Recomendaciones</h2>
        <FontAwesomeIcon
          icon={faFilter}
          onClick={toggleFilters}
          className={styles.faFilterIcon}
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
          onChange={(e) => setClassificationFilterValue(e.target.value)}
          value={classificationFilterValue || ""}
        >
          <option value="" hidden>Selecciona la classificación</option>
          {uniqueClassification.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </>
        )}
        <>
          {tableVisible && <h2>Recomendaciones</h2> && (
            <table className={styles.table}>
              <thead>
                {filteredData.length === 0 || (
                  <tr>
                    <th className={styles.spacing}>Recomendación</th>
                    <th className={styles.spacing}>Descripción</th>
                    <th className={styles.spacing}>Consultor</th>
                    <th className={styles.spacing}>Tipo</th>
                    <th className={styles.spacing}>Seguimiento</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {filteredData &&
                  filteredData.map((recomendation, i) => (
                    <tr key={recomendation.id} className={styles.trStyle}>
                      <td className={styles.tdStyle}>{recomendation.name}</td>
                      <td className={styles.tdStyle}>
                        {recomendation.description}
                      </td>
                      <td className={styles.tdStyle}>
                        {recomendation.consultor}
                      </td>
                      <td className={styles.tdStyle}>
                        {recomendation.classification}
                      </td>
                      <td className={styles.tdStyle}>{recomendation.follow}</td>
                      <td className={styles.tdStyle}>
                        <>
                          <button onClick={() => setEditRIdx(i)}>Edit</button>
                        </>
                      </td>
                      <td className={styles.tdStyle}>
                        <button
                          className={styles.btnTask}
                          type="button"
                          data-task-id={recomendation?.id}
                          onClick={handleDelete}
                        >
                          x
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </>
      
    </>
  );
}
export default RecomendationTable;
