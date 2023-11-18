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
  clientes,
  onCancel,
  onSave,
}) {
  const [name, setName] = useState(project ? project.nombre_proyecto : "");
  const [objetivo, setObjetivo] = useState(project ? project.objetivo : "");
  const [cliente, setCliente] = useState(project ? project.cliente : "");
  const [consultores, setConsultores] = useState(
    project ? project.consultores : []
  );

  const consultoresOptions =
    consultoress &&
    consultoress.map((item) => ({
      value: item.name,
      label: item.name,
    }));
    const clientesOptions =
    clientes &&
    clientes.map((item) => ({
      value: item.id_cliente,
      label: item.nombre_cliente,
    }));
  const handleConsultoresChange = (newValue) => {
    const consultoresNuevos = newValue.map((consultor) => {
      const consultorNew = consultoress.find((c) => c.name === consultor.value);
      return { ...consultorNew };
    });

    setConsultores(consultoresNuevos);
  };
  const defaultValues = {
    consultores: consultores,
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

  const handleConfirm = (data) => {
    const updatedRow = {
      id: project ? project.id : projects.length + 1,
      name: data.name,
      objetivos: data.objetivo,
      cliente: data.cliente,
      consultores: data.consultores,
    };

    setProjects(project ? updatedRow : (prevData) => [...prevData, updatedRow]);

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
                  value={consultores.map((item) => ({
                    value: item.name,
                    label: item.name,
                  }))}
                  onChange={(selectedOption) => {
                    const consultoresNuevos = selectedOption.map(
                      (consultor) => {
                        const consultorNew = consultoress.find(
                          (c) => c.name === consultor.value
                        );
                        return { ...consultorNew };
                      }
                    );
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
            <Input
              className={`${styles.inputForm}  ${
                errors.cliente ? "is-invalid" : ""
              }`}
              type="text"
              id="cliente"
              {...register("cliente")}
              value={cliente}
              onChange={(event) => setCliente(event.target.value)}
              placeholder="Cliente"
            />
            <div className={styles.error}>{errors.cliente?.message}</div>
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
