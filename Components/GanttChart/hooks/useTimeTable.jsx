// useTimeTableLogic.js
import { useMemo } from "react";
import {
  monthDiff,
  getDaysInMonth,
  getDayOfWeek,
  createFormattedDateFromStr,
  dayDiff,
} from "../../../helpers/dateFunctions";
import { months } from "../../../constants";

export const useTimeTableLogic = ({
  timeRange,
  interventions,
  selectedUeb,
  selectedStructure,
  selectedArea,
}) => {
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
    [timeRange.fromSelectYear, timeRange.fromSelectMonth]
  );

  const endMonth = useMemo(
    () => new Date(parseInt(timeRange.toSelectYear), timeRange.toSelectMonth),
    [timeRange.toSelectYear, timeRange.toSelectMonth]
  );

  const numMonths = useMemo(
    () => monthDiff(startMonth, endMonth) + 1,
    [startMonth, endMonth]
  );

  const { monthRows, dayRows, weekRows } = useMemo(() => {
    let month = new Date(startMonth);
    const monthRows = [];
    const dayRows = [];
    const weekRows = [];

    for (let i = 0; i < numMonths; i++) {
      monthRows.push({
        key: i,
        month: `${months[month.getMonth()]} ${month.getFullYear()}`,
      });

      const numDays = getDaysInMonth(month.getFullYear(), month.getMonth() + 1);
      const currYear = month.getFullYear();
      const currMonth = month.getMonth() + 1;

      const days = Array.from({ length: numDays }, (_, j) => j + 1);
      const weeks = days.map((j) =>
        getDayOfWeek(currYear, currMonth - 1, j - 1)
      );

      dayRows.push({ key: i, days });
      weekRows.push({ key: i, weeks });

      month.setMonth(month.getMonth() + 1);
    }

    return { monthRows, dayRows, weekRows };
  }, [numMonths, startMonth]);

  const taskRows = useMemo(() => {
    if (!interventions) return [];

    return interventions.map((task) => {
      let mnth = new Date(startMonth);
      const taskData = [];

      for (let i = 0; i < numMonths; i++) {
        const curYear = mnth.getFullYear();
        const curMonth = mnth.getMonth() + 1;
        const numDays = getDaysInMonth(curYear, curMonth);

        const days = Array.from({ length: numDays }, (_, j) => {
          const formattedDate = createFormattedDateFromStr(
            curYear,
            curMonth,
            j + 1
          );
          return {
            key: `${task.id_intervencion}-${j + 1}`,
            date: formattedDate,
            periods: task.periodos.filter(
              (periodo) =>
                periodo.start_date <= formattedDate &&
                periodo.end_date >= formattedDate
            ),
          };
        });

        taskData.push({ key: `${task.id_intervencion}-${i}`, days });
        mnth.setMonth(mnth.getMonth() + 1);
      }

      return { id: task.id_intervencion, data: taskData };
    });
  }, [interventions, numMonths, startMonth]);

  return {
    ganttTimePeriod,
    ganttTimePeriodCell,
    taskDuration,
    numMonths,
    monthRows,
    dayRows,
    weekRows,
    taskRows,
  };
};
