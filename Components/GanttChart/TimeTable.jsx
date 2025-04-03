import { useEffect, useMemo, useState } from "react";
import {
  monthDiff,
  getDaysInMonth,
  getDayOfWeek,
  createFormattedDateFromStr,
  dayDiff,
} from "../../helpers/dateFunctions";
import { months } from "../../constants";
import { nanoid } from "nanoid";
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
  const ganttTimePeriod = useMemo(
    () => ({
      display: "grid",
      gridAutoFlow: "column",
      gridAutoColumns: "minmax(30px, 1fr)",
      outline: "0.5px solid var(--color-outline)",
      textAlign: "center",
      height: "var(--cell-height)",
    }),
    []
  );
  const ganttTimePeriodCell = useMemo(
    () => ({
      position: "relative",
      outline: "0.5px solid var(--color-outline)",
      marginTop: "0.5px",
    }),
    []
  );
  const ganttTimePeriodSpan = useMemo(() => ({ margin: "auto" }), []);

  const taskDuration = useMemo(
    () => ({
      position: "absolute",
      height: "calc(var(--cell-height) - 1px)",
      zIndex: "1",
      background:
        "linear-gradient(90deg, var(--color-primary-light) 0%, var(--color-primary-dark) 100%)",
      borderRadius: "var(--border-radius)",
      boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.05)",
      cursor: "move",
    }),
    []
  );

  const startMonth = useMemo(
    () =>
      new Date(parseInt(timeRange.fromSelectYear), timeRange.fromSelectMonth),
    [timeRange]
  );

  const endMonth = useMemo(
    () => new Date(parseInt(timeRange.toSelectYear), timeRange.toSelectMonth),
    [timeRange]
  );

  const numMonths = useMemo(
    () => monthDiff(startMonth, endMonth) + 1,
    [startMonth, endMonth]
  );
  let month = useMemo(() => new Date(startMonth), []);

  // Wrap monthRows in useMemo
  const monthRows = useMemo(() => {
    let rows = [];
    let month = new Date(startMonth);
    for (let i = 0; i < numMonths; i++) {
      rows.push(
        <div
          key={`-${i}-${nanoid()}`}
          style={{ ...ganttTimePeriod, outline: "none" }}
        >
          <span style={ganttTimePeriodSpan}>
            {months[month.getMonth()] + " " + month.getFullYear()}
          </span>
        </div>
      );
      month.setMonth(month.getMonth() + 1);
    }
    return rows;
  }, [numMonths, startMonth]);

  // Wrap dayRows in useMemo
  const dayRows = useMemo(() => {
    let rows = [];
    let month = new Date(startMonth);
    for (let i = 0; i < numMonths; i++) {
      const numDays = getDaysInMonth(month.getFullYear(), month.getMonth() + 1);
      const currYear = month.getFullYear();
      const currMonth = month.getMonth() + 1;
      let dayRow = [];

      for (let j = 1; j <= numDays; j++) {
        const formattedDate = createFormattedDateFromStr(
          currYear,
          currMonth,
          j
        );

        dayRow.push(
          <div
            key={`+${j}-${formattedDate}`}
            style={{ ...ganttTimePeriod, outline: "none" }}
          >
            <span style={ganttTimePeriodSpan}>{j}</span>
          </div>
        );
      }
      rows.push(
        <div
          key={`+${i}-${nanoid()}`}
          style={{ ...ganttTimePeriod, outline: "none" }}
        >
          {dayRow}
        </div>
      );
      month.setMonth(month.getMonth() + 1);
    }
    return rows;
  }, [numMonths]);

  // Wrap weekRows in useMemo
  const weekRows = useMemo(() => {
    let rows = [];
    let month = new Date(startMonth);
    for (let i = 0; i < numMonths; i++) {
      const numDays = getDaysInMonth(month.getFullYear(), month.getMonth() + 1);
      const currYear = month.getFullYear();
      const currMonth = month.getMonth() + 1;
      let weekRow = [];
      for (let j = 1; j <= numDays; j++) {
        const formattedDate = createFormattedDateFromStr(
          currYear,
          currMonth,
          j
        );
        weekRow.push(
          <div
            key={`-${i}-${j}-${formattedDate}-week`}
            style={{ ...ganttTimePeriod, outline: "none" }}
          >
            <span style={{ ...ganttTimePeriodSpan, color: "#3E455Z" }}>
              {getDayOfWeek(currYear, currMonth - 1, j - 1)}
            </span>
          </div>
        );
      }
      rows.push(
        <div
          key={`${i}+-${nanoid()}`}
          style={{ ...ganttTimePeriod, outline: "none" }}
        >
          {weekRow}
        </div>
      );
      month.setMonth(month.getMonth() + 1);
    }
    return rows;
  }, [numMonths]);

  const taskR = useMemo(() => {
    let taskRows = [];
    if (interventions) {
      interventions.forEach((task) => {
        let mnth = new Date(startMonth);
        for (let i = 0; i < numMonths; i++) {
          const curYear = mnth.getFullYear();
          const curMonth = mnth.getMonth() + 1;
          const numDays = getDaysInMonth(curYear, curMonth);
          let taskRow = [];

          for (let j = 1; j <= numDays; j++) {
            const formattedDate = createFormattedDateFromStr(
              curYear,
              curMonth,
              j
            );
            taskRow.push(
              <div
                key={`${
                  task.id_intervencion
                }-${month.getFullYear()}-${formattedDate}-${j}-${i}`}
                style={{
                  ...ganttTimePeriodCell,
                }}
                data-task={task?.id_intervencion}
                data-date={formattedDate}
              >
                {task.periodos.map((periodo) => {
                  if (
                    periodo?.start_date <= formattedDate &&
                    periodo?.end_date >= formattedDate
                  ) {
                    let taskWidth =
                      ((dayDiff(periodo.start_date, periodo.end_date) + 1) *
                        100) /
                      numDays;
                    taskWidth = Math.min(taskWidth, 100);
                    taskWidth = Math.max(taskWidth, 100);
                    return (
                      <div
                        key={`${task.id_intervencion}-${formattedDate}-${periodo.start_date}-${periodo.end_date}`}
                        style={{
                          ...taskDuration,
                          width: `${taskWidth}%`,
                        }}
                      ></div>
                    );
                  }
                  return null;
                })}
              </div>
            );
          }
          taskRows.push(
            <div
              key={`${task.id_intervencion}${task.periodos[0].start_date}${
                task.periodos[0].end_date
              }${nanoid()}`}
              style={ganttTimePeriod}
            >
              {taskRow}
            </div>
          );
          mnth.setMonth(mnth.getMonth() + 1);
        }
      });
      return taskRows;
    }
  }, [interventions, numMonths]);

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
          zIndex: "10",
          top: "0",
        }}
      >
        {taskR}
      </div>
    </div>
  );
}
