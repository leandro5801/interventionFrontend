import React from "react";
import { useState } from "react";

import styles from "../../styles/Home.module.css";
import ContainerLayout from "../../Components/Container";
import GanttChart from "../../Components/GanttChart/GanttChart";

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

  return (
    <ContainerLayout>
      <div className={styles.title}>
        <h3>Diagrama de Gantt</h3>

        <GanttChart
          selectedIntervention={selectedIntervention}
          setSelectedIntervention={setSelectedIntervention}
          interventions={interventions}
          setInterventions={setInterventions}
          setOpen={setOpen}
        />

        {/* datos de una intervencion seleccionada */}

        <Dialog open={open} onClose={() => {
                setOpen(false);
              }}>
          <Burbuja
          intervention={selectedIntervention}
          />
        </Dialog>
      
      </div>
    </ContainerLayout>
  );
}
