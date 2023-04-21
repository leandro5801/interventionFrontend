import React from "react";
import styles from "../styles/Home.module.css";
import GanttChart from "../Components/GanttChart/GanttChart";

import { useState, useEffect } from "react";
import { useMemo } from "react";
import InterventionTable from "./Tables/InterventionTable";
import RecomendationTable from "./Tables/RecomendationTable";
import IntervrntionForm from "./Forms/IntervrntionForm";
import Dialog from "./Forms/Dialog";
import RecomendationForm from "./Forms/RecomendationForm";

function Content({
  selectedUeb,
  selectedStructure,
  selectedArea,
  interventionTableVisible,
  setInterventionTableVisible,
  interventions,
  setInterventions,
  recomendations,
  setRecomendations,
}) {
  // para el filtrado
  let filteredTasks = [];

  if (interventions) {
    filteredTasks = interventions.filter(
      (task) =>
        (!selectedUeb || task.ueb === selectedUeb) &&
        (!selectedStructure || task.structure === selectedStructure) &&
        (!selectedArea || task.area === selectedArea)
    );
  }
  const [selectedIntervention, setSelectedIntervention] = useState(null);

  const filteredRecomendation = useMemo(() => {
    if (recomendations && selectedIntervention) {
      return recomendations.filter(
        (recomendation) =>
          recomendation.idIntervention === selectedIntervention.id
      );
    }
    return [];
  }, [recomendations, selectedIntervention]);

  //Para que se muestren las recomendaciones solo cuando se ha seleccionado la opcion
  const [recomendationTableVisible, setRecomendationTableVisible] =
    useState(false);
  function mostrar() {
    setRecomendationTableVisible(!recomendationTableVisible);
  }

  // Para editar una intervencion desde la tabla
  const [isIEditing, setIsIEditing] = useState(false);

  const handleSaveI = (newData) => {
    setIsIEditing(false);
  };
  const handleCancelI = () => {
    setIsIEditing(false);
  };

  const interventionUpdate = (updatedRow) => {
    // Actualiza el estado de los datos en la tabla
    setSelectedIntervention(updatedRow);
  };

  // Para editar una recomendacion desde la tabla
  const [tableRData, setTableRData] = useState();

  useEffect(() => {
    setTableRData(filteredRecomendation);
  }, [filteredRecomendation]);

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

  return (
    <div className={styles.contenetcontainer}>
      {/* Diagrama de Gantt  */}
      <div className={styles.contentwrapper}>
        <GanttChart
          interventions={interventions}
          setInterventions={setInterventions}
          selectedUeb={selectedUeb}
          selectedStructure={selectedStructure}
          selectedArea={selectedArea}
          selectedIntervention={selectedIntervention}
          setSelectedIntervention={setSelectedIntervention}
        />
      </div>
      {/* Datos de una intervencion */}

      {selectedIntervention && (
        <>
          {/* Datos de la intervencion seleccionada */}
          <div className={styles.contentwrapper}>
            <div className={styles.divTable}>
              <h2>Intervención</h2>
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
                  <tr key={selectedIntervention.id} className={styles.trStyle}>
                    <td className={styles.tdStyle}>
                      {selectedIntervention.name}
                    </td>
                    <td className={styles.tdStyle}>
                      {selectedIntervention.description}
                    </td>
                    <td className={styles.tdStyle}>
                      {selectedIntervention.process}
                    </td>
                    <td className={styles.tdStyle}>
                      {selectedIntervention.ueb}
                    </td>
                    <td className={styles.tdStyle}>
                      {selectedIntervention.structure}
                    </td>
                    <td className={styles.tdStyle}>
                      {selectedIntervention.area}
                    </td>
                    <td className={styles.tdStyle}>
                      {selectedIntervention.consultor}
                    </td>
                    <td className={styles.tdStyle}>
                      {selectedIntervention.worker}
                    </td>
                    <td>
                      <button onClick={() => setIsIEditing(true)}>Edit</button>
                    </td>
                  </tr>
                </tbody>
              </table>

              <Dialog open={isIEditing} onClose={handleCancelI}>
                <IntervrntionForm
                  interventionUpdate={interventionUpdate}
                  intervention={selectedIntervention}
                  onSave={handleSaveI}
                  onCancel={handleCancelI}
                />
              </Dialog>

              <button className={styles.btn} onClick={mostrar}>
                Mostrar Recomendaciones
              </button>
            </div>
          </div>
          {/* Datos de Recomendaciones */}
          {recomendationTableVisible && (
            <div className={styles.contentwrapper}>
              <div className={styles.divTable}>
                {tableRData.length === 0 && <h2> No hay </h2>}
                <RecomendationTable
                  tableRData={tableRData}
                  setTableRData={setTableRData}
                  setEditRIdx={setEditRIdx}
                  tableVisible={recomendationTableVisible}
                  recomendations={recomendations}
                  setRecomendations={setRecomendations}
                />

                <Dialog open={editRIdx !== -1} onClose={handleCancelR}>
                  <RecomendationForm
                    recomendationUpdate={recomendationUpdate}
                    editRIdx={editRIdx}
                    recomendation={filteredRecomendation[editRIdx]}
                    onCancel={handleCancelR}
                    onSave={handleSaveR}
                  />
                </Dialog>
              </div>
            </div>
          )}
        </>
      )}

      {/* Fin del mostrado de Datos de una intervencion */}

      {/* Tabla de intervenciones */}
      {interventionTableVisible && (
        <div className={styles.contentwrapper}>
          <InterventionTable
            tableVisible={interventionTableVisible}
            setTableVisible={setInterventionTableVisible}
            filteredTasks={filteredTasks}
          />
        </div>
      )}
      {/* Fin de la tabla  */}
    </div>
  );
}

export default Content;
