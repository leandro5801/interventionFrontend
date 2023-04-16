import styles from '../../styles/Home.module.css'

export default function Grid({ children }) {
  return (
    <div id="gantt-grid-container" className={styles.ganttGridContainer}>
      {children}

    </div>
  );
}
