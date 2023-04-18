import { useEffect, useRef } from "react";

import { client } from "../../utils/fetchWrapper";
import React, { useState } from "react";

import styles from "../../styles/Home.module.css";
import InterventionTable from "../InterventionTable";

export default function Tasks({ tasks, setTasks}) {
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

  // Para cuando presiono sobre un intput
  const handleClick = () => {
    console.log("Se ha presionado el botón");
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
        {tasks &&
          tasks.map((tsk, i) => (
            <div
              key={`${i}-${tsk?.id}-${tsk.name}`}
              className={styles.ganttTaskRow}
            >
              <input
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
