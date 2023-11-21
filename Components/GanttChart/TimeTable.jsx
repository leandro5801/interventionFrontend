import { useState } from "react";
import {
  monthDiff,
  getDaysInMonth,
  getDayOfWeek,
  createFormattedDateFromStr,
  createFormattedDateFromDate,
  dayDiff,
} from "../../helpers/dateFunctions";
import { months } from "../../constants";

import styles from "../../styles/Home.module.css";

export default function TimeTable({
  timeRange,
  interventions,
  setInterventions,
  selectedUeb,
  selectedStructure,
  selectedArea,
  selectedConsultor,
  selectedProcess,
}) {


  // for dynamic css styling
  const ganttTimePeriod = {
    display: "grid",
    gridAutoFlow: "column",
    gridAutoColumns: "minmax(30px, 1fr)",
    outline: "0.5px solid var(--color-outline)",
    textAlign: "center",
    height: "var(--cell-height)",
  };

  const ganttTimePeriodSpan = {
    margin: "auto",
  };

  const ganttTimePeriodCell = {
    position: "relative",
    outline: "0.5px solid var(--color-outline)",
    marginTop: "0.5px",
  };

  const taskDuration = {
    position: "absolute",
    height: "calc(var(--cell-height) - 1px)",
    zIndex: "1",
    background:
      "linear-gradient(90deg, var(--color-primary-light) 0%, var(--color-primary-dark) 100%)",
    borderRadius: "var(--border-radius)",
    boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.05)",
    cursor: "move",
  };

  // para el filtrado
  // let filteredTasks = [];

  // if (interventions) {
  //   filteredTasks = interventions.filter(
  //     (task) =>
  //       (!selectedUeb || task.ueb === selectedUeb) &&
  //       (!selectedStructure || task.structure === selectedStructure) &&
  //       (!selectedArea || task.area === selectedArea)&&
  //       (!selectedConsultor || task.consultorIntervencion === selectedConsultor)
  //   );
  // }

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
      <div key={i} style={{ ...ganttTimePeriod, outline: "none" }}>
        <span style={ganttTimePeriodSpan}>
          {months[month.getMonth()] + " " + month.getFullYear()}
        </span>
      </div>
    );
    // create day and week rows
    const numDays = getDaysInMonth(month.getFullYear(), month.getMonth() + 1);
    const currYear = month.getFullYear();
    const currMonth = month.getMonth() + 1;
    for (let j = 1; j <= numDays; j++) {
      dayRow.push(
        <div key={j} style={{ ...ganttTimePeriod, outline: "none" }}>
          <span style={ganttTimePeriodSpan}>{j}</span>
        </div>
      );
      weekRow.push(
        <div key={j} style={{ ...ganttTimePeriod, outline: "none" }}>
          <span style={{ ...ganttTimePeriodSpan, color: "#3E455B" }}>
            {getDayOfWeek(currYear, currMonth - 1, j - 1)}
          </span>
        </div>
      );
    }
    dayRows.push(
      <div key={i} style={{ ...ganttTimePeriod, outline: "none" }}>
        {dayRow}
      </div>
    );
    weekRows.push(
      <div key={i} style={{ ...ganttTimePeriod, outline: "none" }}>
        {weekRow}
      </div>
    );
    dayRow = [];
    weekRow = [];
    month.setMonth(month.getMonth() + 1);
  }
  // create task rows
  if (interventions) {
    interventions.map((task) => {
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
              key={`${task.id_intervencion}-${j}`}
              style={{
                ...ganttTimePeriodCell,
                backgroundColor:
                  dayOfTheWeek === "S" ? "var(--color-tertiary)" : "#fff",
              }}
              data-task={task?.id_intervencion}
              data-date={formattedDate}
            >
              {interventions.map((el, i) => {
                if (el?.id_intervencion === task?.id_intervencion && el?.start_date === formattedDate) {
                  return (
                    <div
                      key={`${i}-${el?.id_intervencion}`}
                      tabIndex="0"
                      style={{
                        ...taskDuration,
                        width: `calc(${dayDiff(
                          el?.start_date,
                          el?.end_date
                        )} * 100% - 1px)`,
                      }}
                    ></div>
                  );
                }
              })}
            </div>
          );
        }

        taskRows.push(
          <div key={`${i}-${task?.id_intervencion}`} style={ganttTimePeriod}>
            {taskRow}
          </div>
        );

        taskRow = [];
        mnth.setMonth(mnth.getMonth() + 1);
      }
    });
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
          gridColumn: "1/-1",
          display: "grid",
          gridTemplateColumns: `repeat(${numMonths}, 1fr)`,
          paddingLeft: "0.5px",
          position: "sticky",
          zIndex:"10",
          top:"0",
          
  // top: "0",
  // z-index: "10",
        }}
      >
        {taskRows}
      </div>
    </div>
  );
}
