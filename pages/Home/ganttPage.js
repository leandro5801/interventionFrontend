import React from "react";
import { useState } from "react";

import styles from "../../styles/Home.module.css";
import ContainerLayout from "../../Components/Container";
import GanttChart from "../../Components/GanttChart/GanttChart";
import RecomendationTableGantt from "../../Components/Tables/RecomTableGantt";

import Dialog from "../../Components/Forms/Dialog";
import Burbuja from "../../Components/GanttChart/Burbuja";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-grid-system";
import { Card } from "react-bootstrap";

import datosintervenciones from "../../public/datosintervenciones.json";

export default function GanttPage() {
  // datos de las intervenciones
  const [interventions, setInterventions] = useState(
    datosintervenciones?.tasks
  );
  const [recomendations, setRecomendations] = useState(
    datosintervenciones?.recomendations
  );
  //Para cuando selecciono una intervencion en el gantt se muestren sus datos
  const [selectedIntervention, setSelectedIntervention] = useState(null);
  const [open, setOpen] = useState(false);

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

  //Para que se muestren las recomendaciones de una intervencion seleccionada
  const [tableRData, setTableRData] = useState(null);
  return (
    <ContainerLayout>
      <div className={styles.title}>
        <h3 className={styles.tituloH3}>Diagrama de Gantt</h3>
        <div>
        <GanttChart
          selectedIntervention={selectedIntervention}
          setSelectedIntervention={setSelectedIntervention}
          interventions={interventions}
          setInterventions={setInterventions}
          setOpen={setOpen}
          recomendations={recomendations}
          setTableRData={setTableRData}
        />
        
</div>
        {/* datos de una intervencion seleccionada */}
        {/* Datos de una intervencion */}

        <div>
          {selectedIntervention && (
            <>
              {/* Datos de la intervencion seleccionada */}

            
                <div style={{ padding: '10px' }}>
                  <h4>Datos de la intervencion</h4>
                </div>

                <Container key={selectedIntervention.id}>
                  <Card style={{ width: "50rem" }}>
                    <Card.Body>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <div>
                      <Card.Title>
                        Nombre de la Intervención: {selectedIntervention.name}
                      </Card.Title>
                      <Card.Text>
                        Descripción: {selectedIntervention.description}
                      </Card.Text>
                      </div>
                      <div>
                      <Card.Text>
                        Consultor: {selectedIntervention.consultor}
                      </Card.Text>
                      <Card.Text>
                        Trabajador: {selectedIntervention.worker}
                      </Card.Text>
                      </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Container>
            

              {/* Datos de Recomendaciones */}
              <RecomendationTableGantt
                tableRData={tableRData}
                setTableRData={setTableRData}
                recomendations={recomendations}
                setRecomendations={setRecomendations}
                selectedIntervention={selectedIntervention}
              />

                  {/* <RecomendationTable
                    recomendations={recomendations}
                    setTableRData={setTableRData}
                    tableRData={tableRData}
                    setRecomendations={setRecomendations}
                    selectedIntervention={selectedIntervention}
                  /> */}
              
            </>
          )}

          {/* Fin del mostrado de Datos de una intervencion */}
        </div>

        {/* <Dialog open={open} onClose={() => {
                setOpen(false);
              }}>
          <Burbuja
          intervention={selectedIntervention}
          />
        </Dialog> */}
      </div>
    </ContainerLayout>
  );
}
