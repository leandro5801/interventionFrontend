import { useState } from "react";
import styles from "../styles/Home.module.css";
import path from "path";
import data from '../procesos.json'

export default function Form(props) {
    const array = props.objectData;

  const [areaProcesos, setAreaProcesos] = useState("");
  const [intervencion, setIntervencion] = useState("");
  const [consultor, setConsultor] = useState("");
  const [trabajador, setTrabajador] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes enviar los datos a una ruta API de Next.js para procesarlos
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formGrid}>
        <div>
          <label htmlFor="area-procesos">Área de Procesos:</label>
          <select
            className={styles.select}
            id="area-procesos"
            value={areaProcesos}
            onChange={(event) => setAreaProcesos(event.target.value)}
          >
            <option value="" disabled hidden>
              Selecciona una opción
            </option>

            <option value="produccion">Producción</option>
          </select>
        </div>

        <div>
          <label htmlFor="intervencion">Intervención:</label>
          <input
            className={styles.input}
            type="text"
            id="intervencion"
            value={intervencion}
            onChange={(event) => setIntervencion(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="consultor">Consultor:</label>
          <input
            className={styles.input}
            type="text"
            id="consultor"
            value={consultor}
            onChange={(event) => setConsultor(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="trabajador">Trabajador:</label>
          <input
            className={styles.input}
            type="text"
            id="trabajador"
            value={trabajador}
            onChange={(event) => setTrabajador(event.target.value)}
          />
        </div>
      </div>

      <button className={styles.btn} type="submit">
        Crear Intervención
      </button>
    </form>
  );
}

//Cargar json
export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), "../procesos.json");
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);

  return {
    props: { objectData },
  };
}
