import styles from "../../styles/Home.module.css";
import { customStyles } from "../../styles/SelectFilterStyles";
import Select from "react-select";
import data from "../../public/structure.json";

import axios from "axios";
import { useMemo, useState } from "react";

// validaciones
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import { validationSchema } from "../../validations/validacionCargaDatosIntervencion";

// sms de confirmacion
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Alert,
  AlertTitle,
  InputLabel,
} from "@mui/material";

export default function InterventionCargarDatosForm({
  setInterventions,
  interventions,
  filteredInterventions,
  intervention,
  onCancel,
  onSave,
  consultores,
  consultor,
  trabajadores,
  direcciones,
  areas,
  projects,
  empresas,
  uebs,
  nombreEmpresa,
  nombreUeb,
  nombreTrabajador,
  nombreArea,
  nombreDireccion,
  nombreConsultor,
  nombreProyecto,
  areaPorId,
  direccionPorId,
  uebPorId,
}) {
  const [proyecto, setProyecto] = useState(
    intervention
      ? {
          label: nombreProyecto(intervention.id_proyecto),
          value: intervention.id_proyecto,
        }
      : ""
  );
  const [loading, setLoading] = useState(false); // Estado de carga
  const [openDialogAdvertencia, setOpenDialogAdvertencia] = useState(false); // Estado del dialog de advertencia

  const proyectosOptions = useMemo(
    () =>
      projects
        .filter((project) => project.cargar_proyecto)
        .map((item) => ({
          value: item.id_proyecto,
          label: item.nombre_proyecto,
        })),
    [projects]
  );

  // form validation rules
  const formOptions = {
    resolver: yupResolver(validationSchema),
  };

  const validarNombresIguales = (idProject_selected) => {
    return interventions.some(
      (item) => item.id_proyecto === idProject_selected
    );
  };

  const { register, control, setValue, handleSubmit, formState, setError } =
    useForm(formOptions);
  const { errors } = formState;

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});

  function onSubmit(data) {
    const nombreRepetido = validarNombresIguales(data.proyecto.value);
    if (nombreRepetido) {
      setError("name", {
        type: "manual",
        message: "Ya se ha cargado las intervenciones de este proyecto",
      });
      setOpenDialogAdvertencia(true); // Abre el dialog de advertencia
    } else {
      setOpen(true);
      setFormData(data);
    }
  }

  async function chargeIntervencion(updatedRow) {
    setLoading(true); // Inicia la carga
    try {
      const response = await axios.post(
        "http://localhost:3000/api/intervencion/intervencion",
        updatedRow
      );
      console.log(response.data);

      if (response.status === 201) {
        setInterventions(response.data);
      } else {
        throw new Error("Error al crear la intervención");
      }
    } catch (error) {
      console.log(error);

      setOpenDialogAdvertencia(true);
    } finally {
      setLoading(false); // Finaliza la carga
    }
  }

  const handleConfirm = (data) => {
    const updatedRow = {
      nombre_proyecto: data.proyecto.label,
      id_proyecto: Number(data.proyecto.value),
    };

    chargeIntervencion(updatedRow);
    onSave();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /*  const handleCloseDialogAdvertencia = () => {
    setOpenDialogAdvertencia(false); // Cierra el dialog de advertencia
  }; */

  return (
    <div style={{ height: 230, width: 250 }}>
      <DialogTitle>Cargar</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <div className={styles.inputGroup}>
              <InputLabel>Proyecto*</InputLabel>
            </div>
            <Controller
              name="proyecto"
              control={control}
              render={({ field }) => (
                <Select
                  styles={customStyles}
                  id="proyecto"
                  {...field}
                  className={`${styles.selectForm} ${
                    errors.proyecto ? "is-invalid" : ""
                  }`}
                  onChange={(selectedOption) => {
                    setProyecto(selectedOption);
                    setValue("proyecto", selectedOption);
                    field.onChange(selectedOption);
                  }}
                  options={proyectosOptions}
                  placeholder="Seleccione..."
                />
              )}
            />
            {errors.proyecto && (
              <div className={styles.error}>Seleccione un proyecto.</div>
            )}
          </div>

          <div className={styles.error}>{errors.intervention?.message}</div>
        </div>
        <div className={styles.inputGroup} style={{ marginTop: 20 }}>
          <DialogActions>
            <Button type="submit" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Aceptar"}
            </Button>
            <Button onClick={onCancel} disabled={loading}>
              Cancelar
            </Button>
          </DialogActions>
        </div>
        <Dialog open={open} onClose={handleClose} className="my-custom-dialog">
          <DialogTitle>{"Confirmar la carga"}</DialogTitle>
          <DialogContent>
            <p>{"¿Está seguro de cargar las intervenciones?"}</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleConfirm(formData)} disabled={loading}>
              {loading ? (
                <CircularProgress size={24} color="primary" />
              ) : (
                "Aceptar"
              )}
            </Button>
            <Button onClick={handleClose} disabled={loading}>
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>

        {/*  <Dialog
          open={openDialogAdvertencia}
          onClose={handleCloseDialogAdvertencia}
        >
          <Alert severity="warning">
            <AlertTitle>Advertencia</AlertTitle>
            Hubo un problema al cargar las intervenciones. Por favor, inténtalo
            de nuevo."
            <div className={styles.botonAlert}>
              <Button onClick={handleCloseDialogAdvertencia}>Aceptar</Button>
            </div>
          </Alert>
        </Dialog> */}
      </form>
    </div>
  );
}
