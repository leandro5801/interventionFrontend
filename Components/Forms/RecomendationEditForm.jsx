import styles from "../../styles/Home.module.css";
import { customStyles } from "../../styles/SelectFilterStyles";
import Select from "react-select";

import axios from "axios";
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
  filteredRecomendations,
  recomendations,
  setTableRData,
  setRecomendations,
  recomendation,
  onCancel,
  onSave,
  classifications,
  consultores,
  consultor,
  nombreConsultor,
  nombreClasificacion,
  isFollow,
}) {
  //intervention ? intervention.name : null
  const [name, setName] = useState(
    recomendation ? recomendation.nombre_recomendacion : ""
  );
  const [description, setDescription] = useState(
    recomendation ? recomendation.descripcion_recomendacion : ""
  );
  // const [consultor, setConsultor] = useState(
  //   recomendation
  //     ? {
  //         label: nombreConsultor(recomendation.id_consultor),
  //         value: recomendation.id_consultor,
  //       }
  //     : null
  // );
  const [fecha, setFecha] = useState(
    recomendation ? recomendation.fecha_recomendacion : ""
  );
  const [follow, setFollow] = useState(
    recomendation ? (recomendation.seguimiento === true ? "Sí" : "No") : ""
  );

  const [classification, setClassification] = useState(
    recomendation
      ? {
          label: nombreClasificacion(recomendation.id_clasificacion),
          value: recomendation.id_clasificacion,
        }
      : null
  );

  const defaultValues = {
    // consultor: consultor,
    classification: classification,
  };
  const validarNombresIguales = (nombre_recomendacion, id_original) => {
    const nombre = recomendations.find(
      (i) =>
        i.id_recomendacion !== id_original &&
        nombre_recomendacion.toLowerCase() ===
          i.nombre_recomendacion.toLowerCase()
    );
    const nombreRepetido = nombre ? true : false;
    return nombreRepetido;
  };
  // form validation rules
  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues,
  };

  // get functions to build form with useForm() hook
  const {
    register,
    control,
    setValue,
    handleSubmit,
    reset,
    formState,
    setError,
  } = useForm(formOptions);
  const { errors } = formState;

  //para el sms de confirmacion
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [type, setType] = useState("crear");

  function onSubmit(data) {
    const nombreRepetido = validarNombresIguales(
      data.name,
      recomendation ? recomendation.id_recomendacion : null
    );
    if (nombreRepetido) {
      setError("name", {
        type: "manual",
        message: "El nombre de la recomendación ya existe",
      });
    } else {
      setOpen(true);
      setFormData(data);
      setType(recomendation ? "editar" : "crear");
    }
  }

  const [errorAxios, setErrorAxios] = useState(null);
  async function editRecomendacion(id_recomendacion, recomendacionData) {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/recomendacion/${id_recomendacion}`,
        recomendacionData
      );
      if (response.status === 200) {
        // Actualiza el estado para reflejar los cambios en el frontend
        setRecomendations(
          recomendations.map((recomendacion) =>
            recomendacion.id_recomendacion === id_recomendacion
              ? response.data
              : recomendacion
          )
        );
      } else {
        throw new Error("Error al editar la recomendacion");
      }
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un problema al editar la recomendacion. Por favor, inténtalo de nuevo."
      );
    }
  }

  const handleConfirm = (data) => {
    const updatedRow = {
      id_intervencion: recomendation.id_intervencion,
      nombre_recomendacion: data.name,
      // id_consultor: parseInt(data.consultor.value),
      id_consultor: consultor.id_consultor,
      id_clasificacion: parseInt(data.classification.value),
      descripcion_recomendacion: data.description,
      fecha_recomendacion: data.fecha,
      seguimiento: follow === "Sí" ? true : false,
    };
    editRecomendacion(recomendation.id_recomendacion, updatedRow);
    onSave();

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClassificationChange = (newValue) => {
    setClassification({ label: newValue.value, value: newValue.value });
  };
  // const handleConsultorChange = (newValue) => {
  //   setConsultor({ label: newValue.value, value: newValue.value });
  // };

  const classificationsOptions =
    classifications &&
    classifications.map((item) => ({
      value: item.id_clasificacion,
      label: item.nombre_clasificacion,
    }));
  // const consultoresOptions =
  //   consultores &&
  //   consultores.map((item) => ({
  //     value: item.name,
  //     label: item.name,
  //   }));

  return (
    <>
      {" "}
      <DialogTitle>Recomendación</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className={styles.inputGroup}>
            <div>
            <InputLabel>Recomendación*</InputLabel>
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
            <InputLabel>Descripción*</InputLabel>
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
              <InputLabel id="demo-simple-select-standard-label">
                Fecha*
              </InputLabel>
              <Input
                type="date"
                id="fecha"
                label="Fecha"
                {...register("fecha")}
                className={`${styles.inputForm}  ${
                  errors.fecha ? "is-invalid" : ""
                }`}
                value={fecha}
                onChange={(event) => setFecha(event.target.value)}
              />
              <div className={styles.error}>{errors.fecha?.message}</div>
            </div>
            <div>
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
          </div>
          <div className={styles.inputGroup}>
            {/* <div>
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
            </div> */}

            <div>
            <InputLabel>Clasificación</InputLabel>
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
