import styles from "../../styles/Home.module.css";
import Select from "react-select";

import { useState} from "react";

//validaciones
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../validations/validationCR";

//sms de confirmacion
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

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

  // form validation rules
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, setValue, handleSubmit, reset, formState } =
    useForm(formOptions);
  const { errors } = formState;

  //para el sms de confirmacion
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});

  function onSubmit(data) {
    // event.preventDefault();
    setOpen(true);
    setFormData(data);
  }

  const handleConfirm = (data) => {
    const updatedRow = {
      id: recomendations.length + 1,
      idIntervention: intervention.value,
      name: data.name,
      description: data.description,
      consultor: data.consultor,
      follow: follow,
      classification: data.classification,
    };
    onSave();

    setRecomendations([...recomendations, updatedRow]);

    // Aquí puedes enviar los datos a una ruta API de Next.js para procesarlos
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formGrid}>
        <h2 className={styles.formTitle}>Recomendación</h2>
        <div></div>
        <div className={styles.fullRow}>
          <label htmlFor="intervention">Intervención:</label>
          <Select
            id="intervention"
            {...register("intervention")}
            className={`${errors.intervention ? "is-invalid" : ""}`}
            onChange={(selectedOption) => {
              handleInterventionChange(selectedOption);
              setValue("intervention", selectedOption.label);
            }}
            options={interventionsOptions}
            placeholder="Seleccione..."
          />
          <div className={styles.error}>{errors.intervention?.message}</div>
        </div>
        <div className={styles.fullRow}>
          <label htmlFor="name">Recomendación:</label>
          <input
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
              {...register("follow")}
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
              {...register("follow")}
              checked={follow === "No"}
              onChange={(event) => setFollow(event.target.value)}
            />
            No
          </label>
          {errors.follow && (
            <div className="invalid-feedback">{errors.follow.message}</div>
          )}
        </div>
        
      </div>
      <DialogActions>
          <Button  type="submit">
            Aceptar
          </Button>

          <Button  onClick={onCancel}>
            Cancelar
          </Button>
          </DialogActions>

      <Dialog open={open} onClose={handleClose} className="my-custom-dialog">
          <DialogTitle>Confirmar creación</DialogTitle>
          <DialogContent>
            <p>¿Está seguro de crear esta recomendación?</p>
          </DialogContent>
          <DialogActions>
          <Button onClick={() => handleConfirm(formData)}>Aceptar</Button>
            <Button onClick={handleClose}>Cancelar</Button>
           
          </DialogActions>
        </Dialog>
    </form>
  );
}
