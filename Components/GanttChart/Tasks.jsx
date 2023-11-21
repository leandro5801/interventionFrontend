import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/Home.module.css";

//sms de confirmacion
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

export default function Tasks({
  interventions,
  setInterventions,
  selectedUeb,
  selectedStructure,
  selectedArea,
  selectedConsultor,
  selectedProcess,
  selectedIntervention,
  setSelectedIntervention,
  recomendations,
  setRecomendations,
  setTableRData,
  setOpenDialog,
}) {
  const inputRef = useRef([]);
  const indexRef = useRef(null);

  // sms de confirmacion
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");

  function openConfirmation(data) {
    // event.preventDefault();
    setOpen(true);
    setData(data);
  }

  // // Eliminar tarea
  // function handleDelete(e) {
  //   const idNum = parseInt(e.target.getAttribute("data-task-id"));
  //   const newTasks = interventions.filter((task) => task.id !== idNum);
  //   const newRecomendations = recomendations.filter(
  //     (recomendation) => recomendation.idIntervention !== idNum
  //   );
  //   setRecomendations(newRecomendations);

  //   // update state (if data on backend - make API request to update data)
  //   setInterventions(newTasks);
  //   setOpen(false);
  // }
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (inputRef.current.length && indexRef.current >= 0) {
      inputRef?.current[indexRef.current]?.focus();
    }
  });
  // para el filtrado
  // let filteredTasks = [];

  // if (interventions) {
  //   filteredTasks = interventions.filter(
  //     (task) =>
  //       (!selectedUeb || task.ueb === selectedUeb) &&
  //       (!selectedStructure || task.structure === selectedStructure) &&
  //       (!selectedArea || task.area === selectedArea) &&
  //       (!selectedConsultor || task.consultor === selectedConsultor) &&
  //       (!selectedProcess || task.process === selectedProcess)
  //   );
  // }

  // Para cuando presiono sobre un intput
  const handleClick = (e) => {
    const taskId = parseInt(e.target.getAttribute("data-task-id"));
    const task = interventions.find((t) => t.id_intervencion === taskId); //cambiar interventions por filteredTasks
    setSelectedIntervention(task);
    setTableRData(
      recomendations.filter(
        (recomendation) =>
          recomendation.id_intervencion === task.id_intervencion
      )
    );
    // setRecomendations;

    setOpenDialog(true);
  };

  return (
    <div
      className={styles.ganttGridContainerTasks}
      id="gantt-grid-container__tasks"
    >
      <div className={styles.ganttTaskRow}></div>
      <div className={styles.ganttTaskRow}></div>
      <div className={styles.ganttTaskRow}></div>

      {/* Creación de filas de tareas */}
      {interventions &&
        interventions.map((tsk, i) => (
          <div
            key={`${i}-${tsk?.id_intervencion}-${tsk.nombre_intervencion}`}
            className={styles.ganttTaskRow}
          >
            <input
              readOnly
              className={styles.inputTask}
              data-task-id={tsk?.id_intervencion}
              value={tsk?.nombre_intervencion}
              // onChange={(e) => onChange(e, i)}
              onClick={handleClick}
              // ref={(el) => (inputRef.current[i] = el)}
            />
          </div>
        ))}
    </div>
  );
}
