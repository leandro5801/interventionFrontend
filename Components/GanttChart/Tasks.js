import { useEffect, useRef } from "react";

import styles from '../../styles/Home.module.css'

export default function Tasks({ tasks, setTasks, setTaskDurations }) {
  const inputRef = useRef([]);
  const indexRef = useRef(null);

  // Eliminar tarea
  function handleDelete(e) {
    const idNum = parseInt(e.target.getAttribute("data-task-id"));
    const newTasks = tasks.filter((task) => task.id !== idNum);
    // update state (if data on backend - make API request to update data)
    setTasks(newTasks);

    setTaskDurations((prevState) => {
      // delete any taskDurations associated with the task
      const newTaskDurations = prevState.filter(
        (taskDuration) => taskDuration.task !== idNum
      );
      return newTaskDurations;
    });
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

  return (
    <div className={styles.ganttGridContainerTasks} id="gantt-grid-container__tasks">
      <div className={styles.ganttTaskRow}></div>
      <div className={styles.ganttTaskRow}></div>
      <div className={styles.ganttTaskRow}></div>

      {/* Creación de filas de tareas */}
      {tasks &&
        tasks.map((tsk, i) => (
          <div key={`${i}-${tsk?.id}-${tsk.name}`} className={styles.ganttTaskRow}>
            <input className={styles.inputTask}
              data-task-id={tsk?.id}
              value={tsk?.name}
              onChange={(e) => onChange(e, i)}
              ref={(el) => (inputRef.current[i] = el)}
            />
            <button className={styles.btnTask} type="button" data-task-id={tsk?.id} onClick={handleDelete}>
              x
            </button>
          </div>
        ))}
    </div>
  );
}
