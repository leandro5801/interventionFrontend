import React from "react";
import styles from "../styles/Home.module.css";


function Content() {
  return (
    <div className={styles.contenetcontainer}>
      {/* Tabla de intervenciones */}

      <div className={styles.contentwrapper}>
        <div>
          <h2>Intervenciones</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.spacing}>Área de proceso</th>
                <th className={styles.spacing}>Intervención</th>
                <th className={styles.spacing}>Consultor</th>
                <th className={styles.spacing}>Trabajador</th>
              </tr>
            </thead>
            <tbody>
              {/* Aquí puedes agregar las filas de la tabla */}
              <tr className={styles.trStyle}>
                <td>area1</td>
                <td>intervencion1</td>
                <td>consultor1</td>
                <td>trabajador1</td>
              </tr>
              <tr className={styles.trStyle}>
                <td>area2</td>
                <td>intervencion2</td>
                <td>consultor2</td>
                <td>trabajador2</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Fin de la tabla  */}
      </div>


      {/* Diagrama de Gantt  */}
      <div className={styles.contentwrapper}>
        <h2> Diagrama de Gantt</h2>
      </div>
    </div>
  );
}

export default Content;
