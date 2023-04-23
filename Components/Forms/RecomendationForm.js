import styles from "../../styles/Home.module.css";
import Select from "react-select";

import { useState, useEffect } from "react";

export default function RecomendationForm({
  recomendations,
  setTableRData,
  setRecomendations,
  recomendation,
  onCancel,
  onSave,
  selectedIntervention,
}) {
  //intervention ? intervention.name : null
  const [name, setName] = useState(recomendation ? recomendation.name : "");
  const [description, setDescription] = useState(
    recomendation ? recomendation.description : ""
  );
  const [consultor, setConsultor] = useState(
    recomendation ? recomendation.consultor : ""
  );
  const [follow, setFollow] = useState(
    recomendation ? recomendation.follow : ""
  );
  const [classification, setClassification] = useState(
    recomendation ? recomendation.classification : ""
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    // Crea un objeto con los datos actualizados de la fila
    const updatedRow = {
      id: recomendation ? recomendation.id : recomendations.length + 1,
      idIntervention: selectedIntervention.id,
      name,
      description,
      consultor,
      follow,
      classification,
    };
    setTableRData(recomendation ?
      updatedRow : (prevData) => [...prevData, updatedRow]);

    onSave();
    if (!recomendation) {
      setRecomendations([...recomendations, updatedRow]);
    }

    // Aquí puedes enviar los datos a una ruta API de Next.js para procesarlos
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formGrid}>
        <h2 className={styles.formTitle}>Recomendación</h2>
        <div></div>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            className={styles.input}
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <input
            className={styles.input}
            type="text"
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
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
          <label htmlFor="follow">Seguimiento:</label>
          <input
            className={styles.input}
            type="text"
            id="follow"
            value={follow}
            onChange={(event) => setFollow(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="classification">Clasificación:</label>
          <input
            className={styles.input}
            type="text"
            id="classification"
            value={classification}
            onChange={(event) => setClassification(event.target.value)}
          />
        </div>
      </div>

      <button className={styles.btn} type="submit">
        Aceptar
      </button>
      <button className={styles.btn} type="button" onClick={onCancel}>
        Cancelar
      </button>
    </form>
  );
}
