import styles from "../../styles/Home.module.css";
import { customStyles } from "../../styles/SelectFilterStyles";
import Select from "react-select";

import axios from "axios";
import { useState } from "react";

//validaciones
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../validations/validacionCargarDatosRecomendacion";

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

export default function RecomendationCargarForm({
  recomendations,
  filtredRecomendations,
  setRecomendations,
  onSave,
  onCancel,
  interventions,
  classifications,
  projects,
  consultores,
  consultor,
  nombreConsultor,
  nombreClasificacion,
  isFollow,
}) {
  const [intervention, setIntervention] = useState("");
  const [project, setProject] = useState("");

  const validarNombresIguales = (nombre_recomendacion) => {
    const nombre = recomendations.find(
      (i) =>
        nombre_recomendacion.toLowerCase() ===
        i.nombre_recomendacion.toLowerCase()
    );
    const nombreRepetido = nombre ? true : false;
    return nombreRepetido;
  };

  // form validation rules
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState,
    setError,
  } = useForm(formOptions);
  const { errors } = formState;

  //para el sms de confirmacion
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});

  function onSubmit(data) {
    const nombreRepetido = validarNombresIguales(data.name);
    if (nombreRepetido) {
      setError("name", {
        type: "manual",
        message: "El nombre de la recomendación ya existe",
      });
    } else {
      setOpen(true);
      setFormData(data);
    }
  }

  const [errorAxios, setErrorAxios] = useState(null);
  async function createRecomendacion(updatedRow) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/recomendacion",
        updatedRow
      );
      if (response.status === 201) {
        // Actualiza el estado para añadir la nueva empresa al frontend
        setRecomendations([...filtredRecomendations, response.data]);
      } else {
        throw new Error("Error al crear la recomendacion");
      }
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un problema al crear la recomendacion. Por favor, inténtalo de nuevo."
      );
    }
  }
  // Filtro de intervenciones cargadas
  //const [interventionFilter, setInterventionFilter] = useState(null);

  const handleConfirm = (data) => {
    const updatedRow = {
      // id_recomendacion: recomendations.length + 1,
      id_intervencion: parseInt(data.intervention),
      nombre_recomendacion: data.name,
    };

    onSave();

    createRecomendacion(updatedRow);

    // Aquí puedes enviar los datos a una ruta API de Next.js para procesarlos
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInterventionChange = (newValue) => {
    setIntervention({ label: newValue.label, value: parseInt(newValue.value) });
  };
  const handleProjectsChange = (newValue) => {
    setProject({ label: newValue.label, value: parseInt(newValue.value) });
  };

  const projectOptions =
    projects &&
    projects.map((item) => ({
      value: item.id_proyecto,
      label: item.nombre_proyecto,
    }));

  const interventionsOptions =
    interventions &&
    interventions
      .filter((item) =>
        project && project.value ? item.id_proyecto === +project.value : false
      )
      .map((item) => ({
        value: item.id_intervencion,
        label: item.nombre_intervencion,
      }));

  return (
    <>
      <DialogTitle>Cargar Recomendaciones</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputGroup}>
          <div className={styles.paddingSelect}>
            <InputLabel>Proyecto*</InputLabel>
            <Select
              styles={customStyles}
              id="proyecto"
              {...register("proyecto")}
              //defaultValue={project}
              className={`${styles.selectForm}  ${
                errors.proyecto ? "is-invalid" : ""
              }`}
              value={project}
              onChange={(selectedOption) => {
                handleProjectsChange(selectedOption);
                setValue("proyecto", selectedOption.value);
                setValue("intervention", "");
                setIntervention("");
              }}
              options={projectOptions}
              placeholder="Proyecto"
            />
            <div className={styles.error}>{errors.proyecto?.message}</div>
          </div>
          <div className={styles.paddingSelect}>
            <InputLabel>Intervención</InputLabel>
            <Select
              styles={customStyles}
              id="intervention"
              {...register("intervention")}
              className={`${styles.selectForm} ${
                errors.intervention ? "is-invalid" : ""
              }`}
              value={intervention}
              onChange={(selectedOption) => {
                handleInterventionChange(selectedOption);
                setValue("intervention", selectedOption.value);
              }}
              options={interventionsOptions}
              placeholder="Seleccione la intervención"
            />
            <div className={styles.error}>{errors.intervention?.message}</div>
          </div>
        </div>

        <div className={styles.inputGroup}>
          {/* <div>
              <Select
                styles={customStyles}
                id="consultor"
                {...register("consultor")}
                className={`${styles.selectFormRec}  ${
                  errors.consultor ? "is-invalid" : ""
                }`}
                onChange={(selectedOption) => {
                  handleConsultorChange(selectedOption);
                  setValue("consultor", selectedOption.value);
                }}
                options={consultoresOptions}
                placeholder="Consultor"
              />
              <div className={styles.error}>{errors.consultor?.message}</div>
            </div> */}
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
