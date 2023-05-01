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
  classifications,
  consultores,
}) {
  //intervention ? intervention.name : null
  const [name, setName] = useState(recomendation ? recomendation.name : "");
  const [description, setDescription] = useState(
    recomendation ? recomendation.description : ""
  );
  const [consultor, setConsultor] = useState(
    recomendation
      ? {
          label: recomendation.consultor,
          value: recomendation.consultor,
        }
      : null
  );
  const [follow, setFollow] = useState(
    recomendation ? recomendation.follow : ""
  );
  const [classification, setClassification] = useState(
    recomendation
      ? {
          label: recomendation.classification,
          value: recomendation.classification,
        }
      : null
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    // Crea un objeto con los datos actualizados de la fila
    const updatedRow = {
      id: recomendation ? recomendation.id : recomendations.length + 1,
      idIntervention: selectedIntervention.id,
      name,
      description,
      consultor: consultor.value,
      follow,
      classification: classification.value,
    };
    setTableRData(
      recomendation ? updatedRow : (prevData) => [...prevData, updatedRow]
    );

    onSave();
    if (!recomendation) {
      setRecomendations([...recomendations, updatedRow]);
    }

    // Aquí puedes enviar los datos a una ruta API de Next.js para procesarlos
  };
  const handleClassificationChange = (newValue) => {
    setClassification({ label: newValue.value, value: newValue.value });
  };
  const handleConsultorChange = (newValue) => {
    setConsultor({ label: newValue.value, value: newValue.value });
  };

  const classificationsOptions =
    classifications &&
    classifications.map((item) => ({
      value: item.name,
      label: item.name,
    }));
  const consultoresOptions =
    consultores &&
    consultores.map((item) => ({
      value: item.name,
      label: item.name,
    }));

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formGrid}>
        <h2 className={styles.formTitle}>Recomendación</h2>
        <div></div>
        <div className={styles.fullRow}>
          <label htmlFor="name">Nombre :</label>
          <input
            className={styles.input}
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className={styles.fullRow}>
          <label htmlFor="description">Descripción:</label>
          <input
            className={styles.input}
            type="text"
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className={styles.halfRow}>
          <label htmlFor="consultor">Consultor:</label>
          <Select
            value={consultor}
            onChange={handleConsultorChange}
            options={consultoresOptions}
            placeholder="Seleccione..."
          />
        </div>
        <div className={styles.halfRow}>
          <label htmlFor="classification">Clasificación:</label>
          <Select
            value={classification}
            onChange={handleClassificationChange}
            options={classificationsOptions}
            placeholder="Seleccione..."
          />
        </div>
        
        <div className={styles.halfRow}>
          <label htmlFor="follow">Seguimiento:</label>
          <label className={styles.label}>
            <input
              className={styles.input}
              type="radio"
              name="follow"
              value="Sí"
              checked={follow === "Sí"}
              onChange={(event) => setFollow(event.target.value)}
            />
            Sí
          </label>
          <label className={styles.label}>
            <input
              className={styles.input}
              type="radio"
              name="follow"
              value="No"
              checked={follow === "No"}
              onChange={(event) => setFollow(event.target.value)}
            />
            No
          </label>
        </div>
      </div>
      <div className={styles.formButtons}>
        <button className={styles.btn} type="submit">
          Aceptar
        </button>
        <button className={styles.btn} type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
