import styles from "../../styles/Home.module.css";
import { useState, useEffect } from "react";

import Settings from "../GanttChart/Settings";
import Dialog from "../Forms/Dialog";
import RecomendationForm from "../Forms/RecomendationForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faPlus,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function RecomendationTable({
  tableRData,
  setTableRData,
  recomendations,
  setRecomendations,
  selectedIntervention,
  classifications,
  consultores,
  dialogRecomendationOpen,
  setDialogRecomendationOpen,
}) {
  //Para abrir formulario de crear recomendacion
  function toggleFormulario() {
    setDialogRecomendationOpen(!dialogRecomendationOpen);
  }
  // Para editar una recomendacion desde la tabla

  const [editRIdx, setEditRIdx] = useState(-1);

  const handleSaveR = () => {
    setEditRIdx(-1);
  };

  const handleCancelR = () => {
    setEditRIdx(-1);
  };

  const recomendationUpdate = (updatedRow) => {
    // Crea una copia de los datos de la tabla
    const updatedTableRData = [...tableRData];

    // Actualiza los datos de la fila que se está editando
    updatedTableRData[editRIdx] = updatedRow;

    // Actualiza el estado de los datos en la tabla
    setTableRData(updatedTableRData);
  };

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

  function handleDelete(idNum) {
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
      {tableRData.length === 0 && (
        <div className={styles.divIconH2}>
          <h2> No hay Recomendaciones</h2>{" "}
          <FontAwesomeIcon
            icon={faPlus}
            onClick={toggleFormulario}
            className={styles.faIcon}
          />
          <Dialog open={dialogRecomendationOpen} onClose={toggleFormulario}>
            <RecomendationForm
              
              setTableRData={setTableRData}
              onCancel={() => {
                setDialogRecomendationOpen(false);
              }}
              onSave={() => {
                setDialogRecomendationOpen(false);
              }}
              selectedIntervention={selectedIntervention}
              setRecomendations={setRecomendations}
              classifications={classifications}
              consultores={consultores}
            />
          </Dialog>
        </div>
      )}
      {tableRData.length === 0 || (
        <div className={styles.divIconH2}>
          <h2>Recomendaciones</h2>
          <FontAwesomeIcon
            icon={faFilter}
            onClick={toggleFilters}
            className={styles.faIcon}
          />
          <FontAwesomeIcon
            icon={faPlus}
            onClick={toggleFormulario}
            className={styles.faIcon}
          />
          <Dialog open={dialogRecomendationOpen} onClose={toggleFormulario}>
            <RecomendationForm
              recomendations={recomendations}
              setTableRData={setTableRData}
              onCancel={() => {
                setDialogRecomendationOpen(false);
              }}
              onSave={() => {
                setDialogRecomendationOpen(false);
              }}
              selectedIntervention={selectedIntervention}
              setRecomendations={setRecomendations}
              classifications={classifications}
              consultores={consultores}
            />
          </Dialog>
        </div>
      )}
      {showFilters && (
        <>
          <select
            className={styles.select}
            onChange={(e) => setConsultorFilterValue(e.target.value)}
            value={consultorFilterValue || ""}
          >
            <option value="" hidden>
              Selecciona un consultor
            </option>
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
            <option value="" hidden>
              Selecciona la classificación
            </option>
            {uniqueClassification.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </>
      )}
      <>
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
                  <td className={styles.tdStyle}>{recomendation.consultor}</td>
                  <td className={styles.tdStyle}>
                    {recomendation.classification}
                  </td>
                  <td className={styles.tdStyle}>{recomendation.follow}</td>
                  <td className={styles.tdStyle}>
                    <FontAwesomeIcon
                      icon={faEdit}
                      onClick={() =>
                        setEditRIdx(
                          filteredData.findIndex(
                            (item) => item.id === recomendation?.id
                          )
                        )
                      }
                      className={styles.faIcon}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => handleDelete(recomendation?.id)}
                      data-task-id={recomendation?.id}
                      className={styles.faIcon}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Para editar  */}
        <Dialog open={editRIdx !== -1} onClose={handleCancelR}>
          <RecomendationForm
            setTableRData={recomendationUpdate}
            recomendation={tableRData[editRIdx]}
            onSave={handleSaveR}
            onCancel={handleCancelR}
            selectedIntervention={selectedIntervention}
            classifications={classifications}
            consultores={consultores}
          />
        </Dialog>
      </>
    </>
  );
}
export default RecomendationTable;
