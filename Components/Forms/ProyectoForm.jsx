import styles from "../../styles/Home.module.css";
import { customStyles } from "../../styles/SelectStyles";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import axios from "axios";
import { useState } from "react";

//validaciones
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import { validationSchema } from "../../validations/validacionProyecto";

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

const animatedComponents = makeAnimated();
export default function ProyectoForm({
  setProjects,
  projects,
  project,
  consultoress,
  clientess,
  nombreConsultor,
  nombreCliente,
  onCancel,
  onSave,
}) {
  const [name, setName] = useState(project ? project.nombre_proyecto : "");
  const [objetivo, setObjetivo] = useState(project ? project.objetivos : "");
  const [cliente, setCliente] = useState(
    project
      ? {
          label: nombreCliente(project.id_cliente),
          value: project.id_cliente,
        }
      : ""
  );
  const [consultoresID, setConsultoresID] = useState(
    project ? project.consultores_asignados_id : []
  );
  const [consultores, setConsultores] = useState(
    project ? project.consultores_asignados_id : []
  );

  const consultoresOptions =
    consultoress &&
    consultoress.map((item) => ({
      value: item.id_consultor,
      label: item.nombre_consultor,
    }));
  const clientesOptions =
    clientess &&
    clientess.map((item) => ({
      value: item.id_cliente,
      label: item.nombre_cliente,
    }));

  const consultoresIniciales = consultores.map((id) =>
    consultoresOptions.find((option) => option.value === id)
  );
  const handleConsultoresChange = (newValue) => {
    const consultoresNuevos = newValue.map((consultor) => {
      const consultorNew = consultoress.find(
        (c) => c.id_consultor === parseInt(consultor.value)
      );
      return { ...consultorNew };
    });

    setConsultores(consultoresNuevos);
  };
  const handleConsultoresIDChange = (newValue) => {
    const consultoresNuevos = newValue.map((consultor) => {
      const consultorNew = consultoress.find(
        (c) => c.id_consultor === consultor.value
      );
      return consultorNew.id_consultor;
    });
    
    setConsultoresID(consultoresNuevos);
  };
  const defaultValues = {
    consultores: consultores,
    cliente: cliente,
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
    setType(project ? "editar" : "crear");
  }

  const [error, setError] = useState(null);
  async function createProyecto(updatedRow) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/proyecto",
        updatedRow
      );
      if (response.status === 201) {
        // Actualiza el estado para añadir la nueva empresa al frontend
        setProjects([...projects, response.data]);
      } else {
        throw new Error("Error al crear el proyecto");
      }
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un problema al crear el proyecto. Por favor, inténtalo de nuevo."
      );
    }
  }
  async function editProyecto(id_proyecto, proyectoData) {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/proyecto/${id_proyecto}`,
        proyectoData
      );
      if (response.status === 200) {
        // Actualiza el estado para reflejar los cambios en el frontend
        setProjects(
          projects.map((proyecto) =>
            proyecto.id_proyecto === id_proyecto ? response.data : proyecto
          )
        );
      } else {
        throw new Error("Error al editar el proyecto");
      }
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un problema al editar el proyecto. Por favor, inténtalo de nuevo."
      );
    }
  }

  const handleConfirm = (data) => {
    
    const updatedRow = {
      // id_proyecto: project ? project.id : projects.length + 1,
      id_cliente: parseInt(data.cliente.value),
      nombre_proyecto: data.name,
      objetivos: data.objetivo,
      consultores_asignados_id: data.consultores,
    };
    project
      ? editProyecto(project.id_proyecto, updatedRow)
      : createProyecto(updatedRow);

    onSave();
    //Aquí puedes enviar los datos a una ruta API de Next.js para procesarlos
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const formatOptionLabel = ({ label }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ marginRight: 8 }}>{label}</div>
    </div>
  );
  return (
    <>
      <DialogTitle>Proyecto</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              placeholder="Nombre del proyecto"
            />
            <div className={styles.error}>{errors.name?.message}</div>
          </div>
          <div>
            <Input
              className={`${styles.inputForm}  ${
                errors.objetivo ? "is-invalid" : ""
              }`}
              type="text"
              id="objetivo"
              {...register("objetivo")}
              value={objetivo}
              onChange={(event) => setObjetivo(event.target.value)}
              placeholder="Objetivo"
            />
            <div className={styles.error}>{errors.objetivo?.message}</div>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <div>
            <Controller
              name="consultores"
              control={control}
              
              render={({ field }) => (
                <Select
                  styles={customStyles}
                  id="consultores"
                  className={`${styles.selectFormRec}  ${
                    errors.consultores ? "is-invalid" : ""
                  }`}
                  defaultValue={consultoresIniciales} 
                  // value={consultores.map((item) => ({
                  //   value: item,
                  //   label: item.nombre_consultor,
                  // }))}

                  onChange={(selectedOption) => {
                    const consultoresNuevos = selectedOption.map(
                      (consultor) => {
                        const consultorNew = consultoress.find(
                          (c) => c.id_consultor === consultor.value
                        );
                        return consultorNew.id_consultor;
                      }
                    );
                    handleConsultoresIDChange(selectedOption);
                    handleConsultoresChange(selectedOption);
                    setValue("consultores", consultoresNuevos);
                    field.onChange(consultoresNuevos);
                  }}
                  isMulti
                  components={animatedComponents}
                  closeMenuOnSelect={false}
                  options={consultoresOptions}
                  maxMenuHeight={120}
                  placeholder="Consultores"
                />
              )}
            />
            {errors.consultores && (
              <div className={styles.error}>Seleccione los consultores.</div>
            )}
          </div>
          <div>
            <Controller
              name="cliente"
              control={control}
              render={({ field }) => (
                <Select
                  styles={customStyles}
                  id="cliente"
                  {...field}
                  className={`${styles.selectFormRec}  ${
                    errors.cliente ? "is-invalid" : ""
                  }`}
                  onChange={(selectedOption) => {
                    setCliente(parseInt(selectedOption.value));
                    field.onChange(selectedOption);
                  }}
                  options={clientesOptions}
                  maxMenuHeight={120}
                  placeholder="cliente"
                />
              )}
            />
            {errors.cliente && (
              <div className={styles.error}>Seleccione un cliente.</div>
            )}
          </div>
        </div>

        <DialogActions>
          <Button type="submit">Aceptar</Button>

          <Button onClick={onCancel}>Cancelar</Button>
        </DialogActions>
        <Dialog open={open} onClose={handleClose} className="my-custom-dialog">
          <DialogTitle>
            {type === "crear" ? "Confirmar creación" : "Confirmar modificación"}
          </DialogTitle>
          <DialogContent>
            <p>
              {type === "crear"
                ? "¿Está seguro de crear este proyecto?"
                : "¿Está seguro de modificar el proyecto?"}
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
