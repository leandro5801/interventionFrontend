// import { useState } from "react";
import styles from "../styles/Home.module.css";
import path from "path";
import Select from "react-select";

import { client } from "../utils/fetchWrapper";
import { useState, useEffect } from "react";

export default function Form(props) {
  const [process, setProcess] = useState(null);
  useEffect(() => {
    client("procesos.json").then(
      (procesos) => {
        setProcess(procesos?.process);
      },
      (error) => {
        console.error("Error: ", error);
      }
    );
  }, []);

  const [ueb, setUeb] = useState(null);
  useEffect(() => {
    client("list_UEBs.json").then(
      (ueb) => {
        setUeb(ueb);
      },
      (error) => {
        console.error("Error: ", error);
      }
    );
  }, []);
  const array = props.objectData;

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
          <label htmlFor="ueb">UEB:</label>
          <Select
            options={
              ueb &&
              ueb.map((sup) => ({ label: sup.nombre, value: sup.codigo }))
            }  placeholder="Seleccione..."
          />
        </div>
        <div>
          <label htmlFor="area-procesos">Proceso:</label>
          <Select
            options={
              process &&
              process.map((sup) => ({ label: sup.label, value: sup.name }))
            }  placeholder="Seleccione..."
          />
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
