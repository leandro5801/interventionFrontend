import styles from "../../styles/Home.module.css";
import Select from "react-select";

import { useState, useEffect } from "react";

//validaciones
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormik } from "formik";
import { validationSchema } from "../../validations/validationR";

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

  // form validation rules
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, setValue, handleSubmit, reset, formState } =
    useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    const updatedRow = {
      id: recomendation ? recomendation.id : recomendations.length + 1,
      idIntervention: selectedIntervention.id,
      name: data.name,
      description: data.description,
      consultor: data.consultor,
      follow: follow,
      classification: data.classification,
    };
    setTableRData(
      recomendation ? updatedRow : (prevData) => [...prevData, updatedRow]
    );
    setTableRData(
      recomendation ? updatedRow : (prevData) => [...prevData, updatedRow]
    );
    onSave();
    if (!recomendation) {
      setRecomendations([...recomendations, updatedRow]);
    }

    // Aquí puedes enviar los datos a una ruta API de Next.js para procesarlos
  }

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formGrid}>
        <h2 className={styles.formTitle}>Recomendación</h2>
        <div></div>
        <div className={styles.fullRow}>
          <label htmlFor="name">Recomendación:</label>
          <input
            value={name}
            className={`${styles.input}  ${errors.name ? "is-invalid" : ""}`}
            type="text"
            id="name"
            {...register("name")}
            onChange={(event) => setName(event.target.value)}
          />
          <div className={styles.error}>{errors.name?.message}</div>
        </div>
        <div className={styles.fullRow}>
          <label htmlFor="description">Descripción:</label>
          <input
            value={description}
            className={`${styles.input}  ${
              errors.description ? "is-invalid" : ""
            }`}
            type="text"
            id="description"
            {...register("description")}
            onChange={(event) => setDescription(event.target.value)}
          />
          <div className={styles.error}>{errors.description?.message}</div>
        </div>

        <div className={styles.halfRow}>
          <label htmlFor="consultor">Consultor:</label>
          <Select
            value={consultor}
            id="consultor"
            {...register("consultor")}
            className={`${styles.selectForm}  ${
              errors.consultor ? "is-invalid" : ""
            }`}
            onChange={(selectedOption) => {
              handleConsultorChange(selectedOption);
              setValue("consultor", selectedOption.label);
            }}
            options={consultoresOptions}
            placeholder="Seleccione..."
          />
          <div className={styles.error}>{errors.consultor?.message}</div>
        </div>
        <div className={styles.halfRow}>
          <label htmlFor="classification">Clasificación:</label>
          <Select
            value={classification}
            id="classification"
            {...register("classification")}
            className={`${styles.selectForm}  ${
              errors.classification ? "is-invalid" : ""
            }`}
            onChange={(selectedOption) => {
              handleClassificationChange(selectedOption);
              setValue("classification", selectedOption.label);
            }}
            options={classificationsOptions}
            placeholder="Seleccione..."
          />
          <div className={styles.error}>{errors.classification?.message}</div>
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
        <button className={styles.btn} type="button" onClick={() => reset()}>
          Reset
        </button>
      </div>
    </form>
  );
}
