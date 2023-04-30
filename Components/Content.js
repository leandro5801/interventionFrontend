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
import Settings from "./GanttChart/Settings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col } from "react-grid-system";
import { Card, Button } from "react-bootstrap";

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
  classifications,
  consultores,
  dialogRecomendationOpen,
  setDialogRecomendationOpen
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

  const [tableRData, setTableRData] = useState(null);

  //Para que se muestren las recomendaciones solo cuando se ha seleccionado la opcion
 
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
    //  const intervenciones = interventions.filter((i)=> i === updatedRow.id)
    setInterventions((prevData) =>
      prevData.map((item) => (item.id === updatedRow.id ? updatedRow : item))
    );
  };

  return (
    <div className={styles.contenetcontainer}>
      {/* Diagrama de Gantt  */}
      <div className={styles.contentwrapper}>
        <GanttChart
          interventions={filteredTasks}
          setInterventions={setInterventions}
          selectedUeb={selectedUeb}
          selectedStructure={selectedStructure}
          selectedArea={selectedArea}
          selectedIntervention={selectedIntervention}
          setSelectedIntervention={setSelectedIntervention}
          recomendations={recomendations}
          setRecomendations={setRecomendations}
          setTableRData={setTableRData}
        />
      </div>
      {/* Datos de una intervencion */}

      {selectedIntervention && (
        <>
          {/* Datos de la intervencion seleccionada */}
          <div className={styles.contentwrapper}>
            <div className={styles.divTable}>
              <div className={styles.divIconH2}>
                <h2>Intervención</h2>
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={() => setIsIEditing(true)}
                  className={styles.faIcon}
                />
              </div>

              <Container key={selectedIntervention.id}>
                <Card style={{ width: "60rem" }}>
                  <Card.Body>
                    <Card.Title>
                      Intervención: {selectedIntervention.name}
                    </Card.Title>
                    <Card.Text>
                      Descripción: {selectedIntervention.description}
                    </Card.Text>
                    <Card.Text>
                      Proceso: {selectedIntervention.process}
                    </Card.Text>
                    <Card.Text>UEB: {selectedIntervention.ueb}</Card.Text>
                    <Card.Text>
                      Despartamento/Direción: {selectedIntervention.structure}
                    </Card.Text>
                    <Card.Text>Área: {selectedIntervention.area}</Card.Text>
                    <Card.Text>
                      Consultor: {selectedIntervention.consultor}
                    </Card.Text>
                    <Card.Text>
                      Trabajador: {selectedIntervention.worker}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Container>

              {/* <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.spacing}>Intervención</th>
                    <th className={styles.spacing}>Descripción</th>
                    <th className={styles.spacing}>Proceso</th>
                    <th className={styles.spacing}>UEB</th>
                    <th className={styles.spacing}>Departamento/Direción</th>
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
                      <FontAwesomeIcon
                        icon={faEdit}
                        onClick={() => setIsIEditing(true)}
                        className={styles.faIcon}
                      />
                    </td>
                  </tr>
                </tbody>
              </table> */}

              <Dialog open={isIEditing} onClose={handleCancelI}>
                <IntervrntionForm
                  setInterventions={interventionUpdate}
                  intervention={selectedIntervention}
                  onSave={handleSaveI}
                  onCancel={handleCancelI}
                  consultores={consultores}
                />
              </Dialog>
            </div>
          </div>
          {/* Datos de Recomendaciones */}

          <div className={styles.contentwrapper}>
            <div className={styles.divTable}>
              <RecomendationTable
                tableRData={tableRData}
                setTableRData={setTableRData}
                recomendations={recomendations}
                setRecomendations={setRecomendations}
                selectedIntervention={selectedIntervention}
                classifications={classifications}
                consultores={consultores}
                dialogRecomendationOpen={dialogRecomendationOpen}
                setDialogRecomendationOpen={setDialogRecomendationOpen}
              />
            </div>
          </div>
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
