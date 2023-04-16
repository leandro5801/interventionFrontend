import { useState } from 'react';
import {
  monthDiff,
  getDaysInMonth,
  getDayOfWeek,
  createFormattedDateFromStr,
  createFormattedDateFromDate,
  dayDiff,
} from '../../helpers/dateFunctions';
import { months } from '../../constants';

import styles from '../../styles/Home.module.css'



export default function TimeTable({
  timeRange,
  tasks,
  taskDurations,
  setTaskDurations,
}) {
  
  const [taskDurationElDraggedId, setTaskDurationElDraggedId] = useState(null);

  // for dynamic css styling
  const ganttTimePeriod = {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'minmax(30px, 1fr)',
    outline: '0.5px solid var(--color-outline)',
    textAlign: 'center',
    height: 'var(--cell-height)',
  };

  const ganttTimePeriodSpan = {
    margin: 'auto',
  };

  const ganttTimePeriodCell = {
    position: 'relative',
    outline: '0.5px solid var(--color-outline)',
    marginTop: '0.5px',
  };

  const taskDuration = {
    position: 'absolute',
    height: 'calc(var(--cell-height) - 1px)',
    zIndex: '1',
    background:
      'linear-gradient(90deg, var(--color-primary-light) 0%, var(--color-primary-dark) 100%)',
    borderRadius: 'var(--border-radius)',
    boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.05)',
    cursor: 'move',
  };


  // creating rows
  const startMonth = new Date(
    parseInt(timeRange.fromSelectYear),
    timeRange.fromSelectMonth
  );
  const endMonth = new Date(
    parseInt(timeRange.toSelectYear),
    timeRange.toSelectMonth
  );
  const numMonths = monthDiff(startMonth, endMonth) + 1;
  let month = new Date(startMonth);

  let monthRows = [];
  let dayRows = [];
  let dayRow = [];
  let weekRows = [];
  let weekRow = [];
  let taskRows = [];
  let taskRow = [];

  for (let i = 0; i < numMonths; i++) {
    // create month rows
    monthRows.push(
      <div key={i} style={{ ...ganttTimePeriod, outline: 'none' }}>
        <span style={ganttTimePeriodSpan}>
          {months[month.getMonth()] + ' ' + month.getFullYear()}
        </span>
      </div>
    );
    // create day and week rows
    const numDays = getDaysInMonth(month.getFullYear(), month.getMonth() + 1);
    const currYear = month.getFullYear();
    const currMonth = month.getMonth() + 1;
    for (let j = 1; j <= numDays; j++) {
      dayRow.push(
        <div key={j} style={{ ...ganttTimePeriod, outline: 'none' }}>
          <span style={ganttTimePeriodSpan}>{j}</span>
        </div>
      );
      weekRow.push(
        <div key={j} style={{ ...ganttTimePeriod, outline: 'none' }}>
          <span style={{ ...ganttTimePeriodSpan, color: '#3E455B' }}>
            {getDayOfWeek(currYear, currMonth - 1, j - 1)}
          </span>
        </div>
      );
    }
    dayRows.push(
      <div key={i} style={{ ...ganttTimePeriod, outline: 'none' }}>
        {dayRow}
      </div>
    );
    weekRows.push(
      <div key={i} style={{ ...ganttTimePeriod, outline: 'none' }}>
        {weekRow}
      </div>
    );
    dayRow = [];
    weekRow = [];
    month.setMonth(month.getMonth() + 1);
  }
  // create task rows
  if (tasks) {
    tasks.forEach((task) => {
      let mnth = new Date(startMonth);
      for (let i = 0; i < numMonths; i++) {
        const curYear = mnth.getFullYear();
        const curMonth = mnth.getMonth() + 1;

        const numDays = getDaysInMonth(curYear, curMonth);

        for (let j = 1; j <= numDays; j++) {
          // color weekend cells differently
          const dayOfTheWeek = getDayOfWeek(curYear, curMonth - 1, j - 1);
          // add task and date data attributes
          const formattedDate = createFormattedDateFromStr(
            curYear,
            curMonth,
            j
          );

          taskRow.push(
            <div
              key={`${task.id}-${j}`}
              style={{
                ...ganttTimePeriodCell,
                backgroundColor:
                  dayOfTheWeek === 'S' ? 'var(--color-tertiary)' : '#fff',
              }}
              data-task={task?.id}
              onDrop={onTaskDurationDrop}
              data-date={formattedDate}
            >
              {tasks.map((el, i) => {
                if (el?.id === task?.id && el?.start === formattedDate) {
                  return (
                    <div
                      key={`${i}-${el?.id}`}
                      draggable="true"
                      tabIndex="0"
                      onDragStart={() => handleDragStart(el?.id)}
                      style={{
                        ...taskDuration,
                        width: `calc(${dayDiff(
                          el?.start,
                          el?.end
                        )} * 100% - 1px)`,
                        opacity:
                          taskDurationElDraggedId === el?.id ? '0.5' : '1',
                      }}
                      onKeyDown={(e) => deleteTaskDuration(e, el?.id)}
                    ></div>
                  );
                }
              })}
            </div>
          );
        }

        taskRows.push(
          <div key={`${i}-${task?.id}`} style={ganttTimePeriod}>
            {taskRow}
          </div>
        );

        taskRow = [];
        mnth.setMonth(mnth.getMonth() + 1);
      }
    });
  }

  // Eliminar la duración de las tareas
  function deleteTaskDuration(e, id) {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      // update taskDurations
      const newTaskDurations = taskDurations.filter(
        (taskDuration) => taskDuration.id !== id
      );
      // update state (if data on backend - make API request to update data)
      setTaskDurations(newTaskDurations);
    }
  }

   // Agregar funcionalidad de arrastrar y colocar a las duraciones de las tareas
   function handleDragStart(taskDurationId) {
     console.log(taskDurationId);
     setTaskDurationElDraggedId(taskDurationId);
   }

    function onTaskDurationDrop(e) {
      const targetCell = e.target;
      // prevent adding on another taskDuration
      if (!targetCell.hasAttribute('draggable')) {
        // find task
        const taskDuration = tasks.filter(
          (taskDuration) => taskDuration.id === taskDurationElDraggedId
        )[0];

        const dataTask = targetCell.getAttribute('data-task');
        const dataDate = targetCell.getAttribute('data-date');

        const daysDuration = dayDiff(taskDuration.start, taskDuration.end);

        // get new task values
        // get start, calc end using daysDuration - make Date objects - change taskDurations
        const newTask = parseInt(dataTask);
        const newStartDate = new Date(dataDate);
        let newEndDate = new Date(dataDate);
        newEndDate.setDate(newEndDate.getDate() + daysDuration - 1);

        // update taskDurations
        taskDuration.task = newTask;
        taskDuration.start = createFormattedDateFromDate(newStartDate);
        taskDuration.end = createFormattedDateFromDate(newEndDate);

        const newTaskDurations = tasks.filter(
          (taskDuration) => taskDuration.id !== taskDurationElDraggedId
        );
        newTaskDurations.push(taskDuration);

        // update state (if data on backend - make API request to update data)
        setTaskDurations(newTaskDurations);
      }
      setTaskDurationElDraggedId(null);
    }


  return (
    <div
    className={styles.ganttGridContainerTime}
      id="gantt-grid-container__time"
      style={{ gridTemplateColumns: `repeat(${numMonths}, 1fr)` }}
    >
      {monthRows}
      {dayRows}
      {weekRows}
      <div
        id="gantt-time-period-cell-container"
        style={{
          gridColumn: '1/-1',
          display: 'grid',
          gridTemplateColumns: `repeat(${numMonths}, 1fr)`,
          paddingLeft: '0.5px',
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        {taskRows}
      </div>
      {/* <style jsx>{`
        

        .taskDuration {
          position: absolute;
          height: calc(var(--cell-height) / 3);
          top: calc(var(--cell-height) / 3);
          z-index: 1;
          background: linear-gradient(
            90deg,
            var(--color-primary-light) 0%,
            var(--color-primary-dark) 100%
          );
          border-radius: 2px;
          box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.05);
          cursor: move;
        }

        .taskDuration:focus {
          outline: 1px solid black;
        }

        .dragging {
          opacity: 0.5;
        }
      `}</style> */}
    </div>
  );
}
