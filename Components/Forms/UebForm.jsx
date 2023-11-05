import styles from "../../styles/Home.module.css";
import { customStyles } from "../../styles/SelectStyles";
import Select from "react-select";
import data from "../../public/structure.json";

import { useState } from "react";

//validaciones
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import { validationSchema } from "../../validations/validacionUeb";

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

export default function UebForm({
  setUebs,
  uebs,
  ueb,
  empresas,
  onCancel,
  onSave,
}) {
  //para retornar el nombre de la empresa y no el id
  const nombreEmpresa = (empresaId) => {
    const empresa = empresas.find((e) => e.id === empresaId);
    const name = empresa ? empresa.name : "no se encontro el nombre";
    return name;
  };

  const [name, setName] = useState(ueb ? ueb.name : "");
  const [empresaId, setEmpresaId] = useState(
    ueb
      ? ueb.empresaId
      : ""
  );

  const [empresa, setEmpresa] = useState(
    ueb
      ? {
          label: nombreEmpresa(ueb.empresaId),
          value: nombreEmpresa(ueb.empresaId),
        }
      : ""
  );
  const empresasOptions =
    empresas &&
    empresas.map((item) => ({
      value: item.id,
      label: item.name,
    }));

  const defaultValues = {
    empresa: empresa,
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
    setType(ueb ? "editar" : "crear");
  }


  const handleConfirm = (data) => {
    const nombre = nombreEmpresa(parseInt(data.empresa.value));
    
    const updatedRow = {
      id: ueb ? ueb.id : uebs.length + 1,
      name: data.name,
      empresaId: parseInt(data.empresa.value),
    };
    setUebs(ueb ? updatedRow : (prevData) => [...prevData, updatedRow]);
    onSave();
    //Aquí puedes enviar los datos a una ruta API de Next.js para procesarlos
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DialogTitle>UEB</DialogTitle>
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
                  
                  className={`${styles.selectForm}  ${
                    errors.empresa ? "is-invalid" : ""
                  }`}
                  onChange={(selectedOption) => {
                    setEmpresaId(parseInt(selectedOption.value));
                    // setValue("empresa", selectedOption.label);
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
            <Input
              className={`${styles.inputForm}  ${
                errors.name ? "is-invalid" : ""
              }`}
              type="text"
              id="name"
              {...register("name")}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Nombre de la ueb"
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
                ? "¿Está seguro de crear la ueb?"
                : "¿Está seguro de modificar la ueb?"}
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