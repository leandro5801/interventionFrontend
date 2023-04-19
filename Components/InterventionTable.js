import styles from "../styles/Home.module.css";

import { client } from "../utils/fetchWrapper";

function InterventionTable({ filteredTasks, tableVisible, setTableVisible }) {
  return (
    <div className={styles.divTable}>
      <h2>Intervenciones</h2>
      {tableVisible && (
        <table className={styles.table} >
          <thead>
            <tr>
              <th className={styles.spacing}>Intervención</th>
              <th className={styles.spacing}>Descripción</th>
              <th className={styles.spacing}>Proceso</th>
              <th className={styles.spacing}>UEB</th>
              <th className={styles.spacing}>Estructura</th>
              <th className={styles.spacing}>Área</th>
              <th className={styles.spacing}>Consultor</th>
              <th className={styles.spacing}>Trabajador</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks &&
              filteredTasks.map((tsk, i) => (
                <tr key={tsk.id} className={styles.trStyle}>
                  <td className={styles.tdStyle}>{tsk.name}</td>
                  <td className={styles.tdStyle}>{tsk.description}</td>
                  <td className={styles.tdStyle}>{tsk.process}</td>
                  <td className={styles.tdStyle}>{tsk.ueb}</td>
                  <td className={styles.tdStyle}>{tsk.structure}</td>
                  <td className={styles.tdStyle}>{tsk.area}</td>
                  <td className={styles.tdStyle}>{tsk.consultor}</td>
                  <td className={styles.tdStyle}>{tsk.worker}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default InterventionTable;
