import styles from "../../styles/Home.module.css";
import { customStyles } from "../../styles/SelectStyles";
import Select from "react-select";

import { useState } from "react";

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
  Input,
  InputLabel,
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
    <>
      <DialogTitle>Recomendación</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
       
            <div className={styles.paddingSelect}>
              <Select
                styles={customStyles}
                id="intervention"
                {...register("intervention")}
                className={`${styles.selectFormRecInt} ${
                  errors.intervention ? "is-invalid" : ""
                }`}
                onChange={(selectedOption) => {
                  handleInterventionChange(selectedOption);
                  setValue("intervention", selectedOption.label);
                }}
                options={interventionsOptions}
                placeholder="Seleccione la intervención"
              />
              <div className={styles.error}>{errors.intervention?.message}</div>
            </div>
            <div className={styles.inputGroup}>
              <div>
                <Input
                  className={`${styles.inputForm}  ${
                    errors.name ? "is-invalid" : ""
                  }`}
                  type="text"
                  id="name"
                  {...register("name")}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Nombre de la recomendación"
                />
                <div className={styles.error}>{errors.name?.message}</div>
              </div>
              <div>
                <Input
                  className={`${styles.inputForm}  ${
                    errors.description ? "is-invalid" : ""
                  }`}
                  type="text"
                  id="description"
                  {...register("description")}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Descripción"
                />
                <div className={styles.error}>
                  {errors.description?.message}
                </div>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div>
                <Select
                  styles={customStyles}
                  id="consultor"
                  {...register("consultor")}
                  className={`${styles.selectFormRec}  ${
                    errors.consultor ? "is-invalid" : ""
                  }`}
                  onChange={(selectedOption) => {
                    handleConsultorChange(selectedOption);
                    setValue("consultor", selectedOption.label);
                  }}
                  options={consultoresOptions}
                  placeholder="Consultor"
                />
                <div className={styles.error}>{errors.consultor?.message}</div>
              </div>

              <div>
                <Select
                  styles={customStyles}
                  id="classification"
                  {...register("classification")}
                  className={`${styles.selectFormRec}  ${
                    errors.classification ? "is-invalid" : ""
                  }`}
                  onChange={(selectedOption) => {
                    handleClassificationChange(selectedOption);
                    setValue("classification", selectedOption.label);
                  }}
                  options={classificationsOptions}
                  placeholder="Clasificación"
                />
                <div className={styles.error}>
                  {errors.classification?.message}
                </div>
              </div>
            </div>
            <InputLabel>¿Se le ha dado seguimiento?</InputLabel>
            <div className={styles.inputGroup}>
              
              <InputLabel>
                Sí{" "}
                <input
                  className={styles.input}
                  type="radio"
                  name="follow"
                  value="Sí"
                  {...register("follow")}
                  checked={follow === "Sí"}
                  onChange={(event) => setFollow(event.target.value)}
                />
              </InputLabel>
              <InputLabel>
                No{" "}
                <input
                  className={styles.input}
                  type="radio"
                  name="follow"
                  value="No"
                  {...register("follow")}
                  checked={follow === "No"}
                  onChange={(event) => setFollow(event.target.value)}
                />
              </InputLabel>
             
            </div>
           {errors.follow && (
                <div className="invalid-feedback">{errors.follow.message}</div>
              )}
        </div>

        <DialogActions>
          <Button type="submit">Aceptar</Button>

          <Button onClick={onCancel}>Cancelar</Button>
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
    </>
  );
}
