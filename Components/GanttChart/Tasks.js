import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/Home.module.css";

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
}) {
  const inputRef = useRef([]);
  const indexRef = useRef(null);

  // Eliminar tarea
  function handleDelete(e) {
    const idNum = parseInt(e.target.getAttribute("data-task-id"));
    const newTasks = interventions.filter((task) => task.id !== idNum);
    const newRecomendations = recomendations.filter(
      (recomendation) => recomendation.idIntervention !== idNum
    );
    setRecomendations(newRecomendations);

    // update state (if data on backend - make API request to update data)
    setInterventions(newTasks);
  }

  useEffect(() => {
    if (inputRef.current.length && indexRef.current >= 0) {
      inputRef?.current[indexRef.current]?.focus();
    }
  });
  // para el filtrado
  let filteredTasks = [];

  if (interventions) {
    filteredTasks = interventions.filter(
      (task) =>
        (!selectedUeb || task.ueb === selectedUeb) &&
        (!selectedStructure || task.structure === selectedStructure) &&
        (!selectedArea || task.area === selectedArea) &&
        (!selectedConsultor || task.consultor === selectedConsultor) &&
        (!selectedProcess || task.process === selectedProcess)
    );
  }

  // Para cuando presiono sobre un intput
  const handleClick = (e) => {
    const taskId = parseInt(e.target.getAttribute("data-task-id"));
    const task = filteredTasks.find((t) => t.id === taskId);
    setSelectedIntervention(task);
    setTableRData(
      recomendations.filter(
        (recomendation) => recomendation.idIntervention === task.id
      )
    );
    setRecomendations;
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
      {filteredTasks &&
        filteredTasks.map((tsk, i) => (
          <div
            key={`${i}-${tsk?.id}-${tsk.name}`}
            className={styles.ganttTaskRow}
          >
            <input
              readOnly
              className={styles.inputTask}
              data-task-id={tsk?.id}
              value={tsk?.name}
              // onChange={(e) => onChange(e, i)}
              onClick={handleClick}
              // ref={(el) => (inputRef.current[i] = el)}
            />
            <button
              className={styles.btnTask}
              type="button"
              data-task-id={tsk?.id}
              onClick={handleDelete}
            >
              x
            </button>
          </div>
        ))}
    </div>
  );
}
