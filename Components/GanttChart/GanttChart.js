import { useState, useEffect } from 'react';
import { client } from '../../utils/fetchWrapper';

import styles from '../../styles/Home.module.css'

import AddTaskDuration from './AddTaskDuration';
import AddTask from './AddTask';
import Grid from './Grid';
import Settings from './Settings';
import Tasks from './Tasks';
import TimeRange from './TimeRange';
import TimeTable from './TimeTable';


export default function GanttChart() {
    const [tasks, setTasks] = useState(null);
    const [taskDurations, setTaskDurations] = useState(null);
    const [timeRange, setTimeRange] = useState({
      fromSelectMonth: 0,
      fromSelectYear: '2022',
      toSelectMonth: 1,
      toSelectYear: '2022',
    });
      useEffect(() => {
        client('datosintervenciones.json').then(
          (datosintervenciones) => {
            setTasks(datosintervenciones?.tasks);
            setTaskDurations(datosintervenciones);
          },
          (error) => {
            console.error('Error: ', error);
          }
        );
      }, []);

      // Para mostrar el periodo de tiempo
   const [mostrarPeriodo, setMostrarComponente] = useState(false);
  function mostrar() {
    setMostrarComponente(!mostrarPeriodo);
  }
    
  return (
    <div className={styles.ganttContainer} id="gantt-container">
      <h2> Diagrama de Gantt</h2>
   <Settings >
      <div>
      <button  className={styles.btn} onClick={mostrar}>Establecer Período</button>
      {mostrarPeriodo ? <TimeRange timeRange={timeRange} setTimeRange={setTimeRange} />: null}
    </div>
        {/* <AddTask setTasks={setTasks} /> */}
        {/* <AddTaskDuration tasks={tasks} setTaskDurations={setTaskDurations} /> */}
        
      </Settings>
      <Grid>
        <Tasks
          tasks={tasks}
          setTasks={setTasks}
          setTaskDurations={setTaskDurations}
        />
        <TimeTable
          timeRange={timeRange}
          tasks={tasks}
          taskDurations={taskDurations}
          setTaskDurations={setTaskDurations}
        />
      </Grid>
   
    </div>
  );
}
