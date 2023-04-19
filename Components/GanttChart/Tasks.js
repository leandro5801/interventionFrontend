import React, { useEffect, useRef, useState} from "react";
import styles from "../../styles/Home.module.css";


export default function Tasks({
  tasks,
  setTasks,
  selectedUeb,
  selectedStructure,
  selectedArea,
  setSelectedIntervention,
}) {
  const inputRef = useRef([]);
  const indexRef = useRef(null);

  // Eliminar tarea
  function handleDelete(e) {
    const idNum = parseInt(e.target.getAttribute("data-task-id"));
    const newTasks = tasks.filter((task) => task.id !== idNum);
    // update state (if data on backend - make API request to update data)
    setTasks(newTasks);
  }

  //  Editar tarea
  function onChange(e, i) {
    const { value } = e.target;
    const idNum = parseInt(e.target.getAttribute("data-task-id"));

    let newTasks = tasks.filter((task) => task.id !== idNum);
    newTasks.push({ id: idNum, name: value });
    newTasks = newTasks.sort((a, b) => a.id - b.id);
    // update state (if data on backend - make API request to update data)
    setTasks(newTasks);
    indexRef.current = i;
  }

  useEffect(() => {
    if (inputRef.current.length && indexRef.current >= 0) {
      inputRef?.current[indexRef.current]?.focus();
    }
  });
  // para el filtrado
  let filteredTasks = [];

  if (tasks) {
    filteredTasks = tasks.filter(
      (task) =>
        (!selectedUeb || task.ueb === selectedUeb) &&
        (!selectedStructure || task.structure === selectedStructure) &&
        (!selectedArea || task.area === selectedArea)
    );
  }

  // Para cuando presiono sobre un intput
  const handleClick = (e) => {
    const taskId = parseInt(e.target.getAttribute("data-task-id"));
    const task = filteredTasks.find((t) => t.id === taskId);
    setSelectedIntervention(task);
  };

  return (
    <div>
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
              <input readOnly
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

      <div></div>
    </div>
  );
}
