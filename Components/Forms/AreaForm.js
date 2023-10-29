import styles from "../../styles/Home.module.css";
import { customStyles } from "../../styles/SelectStyles";
import Select from "react-select";

import { useState } from "react";

//validaciones
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import { validationSchema } from "../../validations/validacionArea";

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

export default function AreaForm({
  setAreas,
  areas,
  area,
  empresas,
  uebs,
  direcciones,
  onCancel,
  onSave,
}) {
  const [name, setName] = useState(area ? area.name : "");
  const [empresa, setEmpresa] = useState(
    area
      ? {
          label: area.empresa,
          value: area.empresa,
        }
      : ""
  );
  const [ueb, setueb] = useState(
    area
      ? {
          label: area.ueb,
          value: area.ueb,
        }
      : ""
  );
   const [direccion, setDireccion] = useState(
    area
      ? {
          label: area.direccion,
          value: area.direccion,
        }
      : ""
  );

  const empresasOptions =
    empresas &&
    empresas.map((item) => ({
      value: item.name,
      label: item.name,
    }));
    const uebsOptions =
    uebs &&
    uebs.map((item) => ({
      value: item.name,
      label: item.name,
    }));
    const direccionesOptions =
    direcciones &&
    direcciones.map((item) => ({
      value: item.name,
      label: item.name,
    }));
  const handleEmpresaChange = (newValue) => {
    setEmpresa({ label: newValue.value, value: newValue.value });
  };
  const handleUebChange = (newValue) => {
    setueb({ label: newValue.value, value: newValue.value });
  };
  const handleDireccionChange = (newValue) => {
    setDireccion({ label: newValue.value, value: newValue.value });
  };

  const defaultValues = {
    empresa: empresa,
    ueb: ueb,
    direccion: direccion,
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
    setType(area ? "editar" : "crear");
  }

  const handleConfirm = (data) => {
    const updatedRow = {
      id: area ? area.id : areas.length + 1,
      name: data.name,
      empresa: data.empresa.value,
      ueb: data.ueb.value,
      direccion: data.direccion.value
    };

    setAreas(
      area ? updatedRow : (prevData) => [...prevData, updatedRow]
    );

    onSave();
    //Aquí puedes enviar los datos a una ruta API de Next.js para procesarlos
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DialogTitle>Área</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputGroup}>
          <div>
            <Controller
              name="empresa"
              control={control}
              render={({ field }) => (
                <Select
                  styles={customStyles}
                  id="empresa"
                  {...field}
                  className={`${styles.selectFormRec}  ${
                    errors.empresa ? "is-invalid" : ""
                  }`}
                  onChange={(selectedOption) => {
                    handleEmpresaChange(selectedOption);
                    setValue("empresa", selectedOption);
                    field.onChange(selectedOption);
                  }}
                  options={empresasOptions}
                  maxMenuHeight={120}
                  placeholder="Empresa"
                />
              )}
            />
            {errors.empresa && (
              <div className={styles.error}>Seleccione una empresa.</div>
            )}
          </div>
          <div>
            <Controller
              name="ueb"
              control={control}
              render={({ field }) => (
                <Select
                  styles={customStyles}
                  id="ueb"
                  {...field}
                  className={`${styles.selectFormRec}  ${
                    errors.ueb ? "is-invalid" : ""
                  }`}
                  onChange={(selectedOption) => {
                    handleUebChange(selectedOption);
                    setValue("ueb", selectedOption);
                    field.onChange(selectedOption);
                  }}
                  options={uebsOptions}
                  maxMenuHeight={120}
                  placeholder="Ueb"
                />
              )}
            />
            {errors.ueb && (
              <div className={styles.error}>Seleccione una UEB.</div>
            )}
          </div>
          
        </div>
        <div className={styles.inputGroup}>
        <div>
            <Controller
              name="direccion"
              control={control}
              render={({ field }) => (
                <Select
                  styles={customStyles}
                  id="direccion"
                  {...field}
                  className={`${styles.selectFormRec}  ${
                    errors.direccion ? "is-invalid" : ""
                  }`}
                  onChange={(selectedOption) => {
                    handleDireccionChange(selectedOption);
                    setValue("direccion", selectedOption);
                    field.onChange(selectedOption);
                  }}
                  options={direccionesOptions}
                  maxMenuHeight={120}
                  placeholder="Dirección"
                />
              )}
            />
            {errors.direccion && (
              <div className={styles.error}>Seleccione un área.</div>
            )}
          </div>
        <div >
            <Input
              className={`${styles.inputForm}  ${
                errors.name ? "is-invalid" : ""
              }`}
              type="text"
              id="name"
              {...register("name")}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Nombre del Área"
            />
            <div className={styles.error}>{errors.name?.message}</div>
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
                ? "¿Está seguro de crear el área?"
                : "¿Está seguro de modificar el área?"}
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
