import styles from "../../styles/Home.module.css";
import Select from "react-select";

import { useState, useEffect } from "react";

export default function CreateRecomendationForm({
  recomendations,
  setRecomendations,
  onSave,
  onCancel,
  interventions,
  classifications,
  consultores,
}) {
  const [intervention, setIntervention] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [consultor, setConsultor] = useState(null);
  const [follow, setFollow] = useState("");
  const [classification, setClassification] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Crea un objeto con los datos actualizados de la fila
    const updatedRow = {
      id: recomendations.length + 1,
      idIntervention: intervention.value,
      name,
      description,
      consultor: consultor.value,
      follow,
      classification: classification.value,
    };

    onSave();
    
      setRecomendations([...recomendations, updatedRow]);


    // Aquí puedes enviar los datos a una ruta API de Next.js para procesarlos
  };
  const handleInterventionChange = (newValue) => {
    setIntervention({ label: newValue.value, value: newValue.value });
  };
  const handleClassificationChange = (newValue) => {
    setClassification({ label: newValue.value, value: newValue.value });
  };
  const handleConsultorChange = (newValue) => {
    setConsultor({ label: newValue.label, value: newValue.value });
  };

  const interventionsOptions =
  interventions &&
  interventions.map((item) => ({
    value: item.id,
    label: item.name,
  }));

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
        <div>
          <label htmlFor="intervention">Intervención:</label>
          <Select
            onChange={handleInterventionChange}
            options={interventionsOptions}
            placeholder="Seleccione..."
          />
        </div>
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
          <Select
            value={consultor}
            onChange={handleConsultorChange}
            options={consultoresOptions}
            placeholder="Seleccione..."
          />
        </div>

        <div>
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
        <div>
          <label htmlFor="classification">Clasificación:</label>
          <Select
            value={classification}
            onChange={handleClassificationChange}
            options={classificationsOptions}
            placeholder="Seleccione..."
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
