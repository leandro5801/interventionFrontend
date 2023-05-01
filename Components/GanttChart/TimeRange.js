import { months } from "../../constants";

import styles from "../../styles/Home.module.css";

export default function TimeRange({ timeRange, setTimeRange }) {
  // add date selector values
  let monthsOptions = [];
  for (let i = 0; i < months.length; i++) {
    monthsOptions.push(
      <option key={i} value={i}>
        {months[i]}
      </option>
    );
  }

  const yearsOptions = [];
  for (let i = 2018; i <= 2028; i++) {
    yearsOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  function onChange(e) {
    const { value, id } = e.target;
    if (id === "from-select-month") {
      setTimeRange((prevState) => {
        return { ...prevState, fromSelectMonth: value };
      });
    }
    if (id === "from-select-year") {
      setTimeRange((prevState) => {
        return { ...prevState, fromSelectYear: value };
      });
    }
    if (id === "to-select-month") {
      setTimeRange((prevState) => {
        return { ...prevState, toSelectMonth: value };
      });
    }
    if (id === "to-select-year") {
      setTimeRange((prevState) => {
        return { ...prevState, toSelectYear: value };
      });
    }
  }

  return (
    <div className={styles.timeRangeContainer} id="time-range__container">
      <div className={styles.timeRange} id="time-range">
        <legend style={{ margin: "4px" }}>Desde</legend>
        <select
          className={styles.selectTimeRange}
          id="from-select-month"
          name="from-select-month"
          value={timeRange.fromSelectMonth}
          onChange={onChange}
        >
          {monthsOptions}
        </select>
        <select
          className={styles.selectTimeRange}
          id="from-select-year"
          name="from-select-year"
          value={timeRange.fromSelectYear}
          onChange={onChange}
          style={{ marginLeft: "5px" }}
        >
          {yearsOptions}
        </select>

        <legend style={{ margin: "4px" }}>hasta</legend>
        <select
          className={styles.selectTimeRange}
          id="to-select-month"
          name="to-select-month"
          value={timeRange.toSelectMonth}
          onChange={onChange}
        >
          {monthsOptions}
        </select>
        <select
          className={styles.selectTimeRange}
          id="to-select-year"
          name="to-select-year"
          value={timeRange.toSelectYear}
          onChange={onChange}
          style={{ marginLeft: "5px" }}
        >
          {yearsOptions}
        </select>
      </div>

    </div>
  );
}
