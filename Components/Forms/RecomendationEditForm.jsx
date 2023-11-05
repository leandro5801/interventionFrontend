import styles from "../../styles/Home.module.css";
import { customStyles } from "../../styles/SelectStyles";
import Select from "react-select";

import { useState } from "react";

//validaciones
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import { validationSchema } from "../../validations/validationR";

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

export default function RecomendationForm({
  recomendations,
  setTableRData,
  setRecomendations,
  recomendation,
  onCancel,
  onSave,
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

  const defaultValues = {
    consultor: consultor,
    classification: classification,
  };

  // form validation rules
  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues,
  };

  // get functions to build form with useForm() hook
  const { register, control, setValue, handleSubmit, reset, formState } =
    useForm(formOptions);
  const { errors } = formState;

  //para el sms de confirmacion
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [type, setType] = useState("crear");

  function onSubmit(data) {
    // event.preventDefault();
    setOpen(true);
    setFormData(data);
    setType(recomendation ? "editar" : "crear");
  }

  const handleConfirm = (data) => {
    const updatedRow = {
      id: recomendation ? recomendation.id : recomendations.length + 1,
      idIntervention: recomendation.idIntervention,
      name: data.name,
      description: data.description,
      consultor: data.consultor.value,
      follow: follow,
      classification: classification.value,
    };
    setTableRData(
      recomendation ? updatedRow : (prevData) => [...prevData, updatedRow]
    );
    onSave();
    if (!recomendation) {
      setRecomendations([...recomendations, updatedRow]);
    }
    //Aquí puedes enviar los datos a una ruta API de Next.js para procesarlos
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    <>
      {" "}
      <DialogTitle>Recomendación</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className={styles.inputGroup}>
            <div>

              <Input
                className={`${styles.inputForm}  ${
                  errors.name ? "is-invalid" : ""
                }`}
                type="text"
                id="name"
                {...register("name")}
                value={name}
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
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Descripción"
              />
              <div className={styles.error}>{errors.description?.message}</div>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div>
              <Controller
                name="consultor"
                control={control}
                render={({ field }) => (
                  <Select
                    styles={customStyles}
                    id="consultor"
                    {...field}
                    className={`${styles.selectFormRec}  ${
                      errors.consultor ? "is-invalid" : ""
                    }`}
                    onChange={(selectedOption) => {
                      handleConsultorChange(selectedOption);
                      setValue("consultor", selectedOption);
                      field.onChange(selectedOption);
                    }}
                    options={consultoresOptions}
                    placeholder="Seleccione..."
                  />
                )}
              />

              <div className={styles.error}>{errors.consultor?.message}</div>
            </div>

            <div>
              <Controller
                name="classification"
                control={control}
                render={({ field }) => (
                  <Select
                    styles={customStyles}
                    id="classification"
                    {...field}
                    className={`${styles.selectFormRec}  ${
                      errors.classification ? "is-invalid" : ""
                    }`}
                    onChange={(selectedOption) => {
                      handleClassificationChange(selectedOption);
                      setValue("classification", selectedOption);
                      field.onChange(selectedOption);
                    }}
                    options={classificationsOptions}
                    placeholder="Seleccione..."
                  />
                )}
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
          <InputLabel >
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
          <DialogActions>
            <Button type="submit">Aceptar</Button>

            <Button onClick={onCancel}>Cancelar</Button>
          </DialogActions>
        </div>

        <Dialog open={open} onClose={handleClose} className="my-custom-dialog">
          <DialogTitle>
            {type === "crear" ? "Confirmar creación" : "Confirmar modificación"}
          </DialogTitle>
          <DialogContent>
            <p>
              {type === "crear"
                ? "¿Está seguro de crear esta recomendación?"
                : "¿Está seguro de modificar esta recomendación?"}
            </p>
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
